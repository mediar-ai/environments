import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

// Mock patient/note data (same as in pages)
const patientData: Record<string, any> = {
  "MRN-4521": {
    name: "John Smith",
    mrn: "MRN-4521",
    dob: "03/15/1978",
    notes: {
      N001: {
        id: "N001",
        type: "Progress Note",
        date: "01/07/2026",
        provider: "Dr. Smith",
        content: `PROGRESS NOTE

Patient: John Smith
MRN: MRN-4521
Date of Service: 01/07/2026
Provider: Dr. Sarah Smith, MD

CHIEF COMPLAINT:
Follow-up for diabetes management.

HISTORY OF PRESENT ILLNESS:
47-year-old male presents for routine follow-up of Type 2 Diabetes Mellitus. Patient reports good compliance with medications including Metformin 500mg twice daily. He has been monitoring blood glucose at home with readings ranging from 130-160 mg/dL fasting. Patient denies polyuria, polydipsia, or unintentional weight loss. No episodes of hypoglycemia reported.

CURRENT MEDICATIONS:
1. Metformin 500mg - twice daily
2. Lisinopril 10mg - once daily
3. Atorvastatin 20mg - once daily at bedtime
4. Aspirin 81mg - once daily

VITAL SIGNS:
Blood Pressure: 138/88 mmHg
Heart Rate: 78 bpm
Temperature: 98.6°F
Weight: 185 lbs
Height: 5'10"
BMI: 26.5

PHYSICAL EXAMINATION:
General: Well-appearing male in no acute distress
HEENT: Normocephalic, atraumatic. Pupils equal and reactive.
Cardiovascular: Regular rate and rhythm, no murmurs
Lungs: Clear to auscultation bilaterally
Extremities: No edema, pulses intact bilaterally

ASSESSMENT AND PLAN:
1. Type 2 Diabetes Mellitus - Suboptimally controlled
   - HbA1c 7.2% (goal <7.0%)
   - Continue current Metformin dose
   - Reinforce dietary modifications
   - Recheck HbA1c in 3 months

2. Hypertension - Controlled
   - Continue Lisinopril 10mg daily
   - Home BP monitoring encouraged

3. Hyperlipidemia - On statin therapy
   - Continue Atorvastatin 20mg
   - Recent lipid panel shows LDL at goal

FOLLOW-UP:
Return in 3 months for repeat labs and evaluation.

Electronically signed by:
_______________________
Dr. Sarah Smith, MD`,
      },
      N002: {
        id: "N002",
        type: "Office Visit",
        date: "12/15/2025",
        provider: "Dr. Smith",
        content: `OFFICE VISIT NOTE

Patient: John Smith
MRN: MRN-4521
Date of Service: 12/15/2025
Provider: Dr. Sarah Smith, MD

Annual physical exam. Ordered routine labs. Flu vaccine administered.

Electronically signed by:
Dr. Sarah Smith, MD`,
      },
    },
  },
  "MRN-3892": {
    name: "Mary Johnson",
    mrn: "MRN-3892",
    dob: "07/22/1985",
    notes: {
      N004: {
        id: "N004",
        type: "New Patient",
        date: "12/28/2025",
        provider: "Dr. Smith",
        content: `NEW PATIENT VISIT

Patient: Mary Johnson
MRN: MRN-3892
Date of Service: 12/28/2025
Provider: Dr. Sarah Smith, MD

CHIEF COMPLAINT:
Establishing care, anxiety management.

HISTORY OF PRESENT ILLNESS:
40-year-old female presents to establish care. She has a history of generalized anxiety disorder, currently managed with Sertraline 50mg daily. Patient reports the medication has been effective with minimal side effects. She also has a history of migraines occurring 2-3 times monthly, treated with Sumatriptan as needed.

ASSESSMENT AND PLAN:
1. Anxiety - Well controlled on current regimen
   - Continue Sertraline 50mg daily

2. Migraines - Episodic
   - Continue Sumatriptan PRN
   - Migraine diary recommended

FOLLOW-UP:
Return in 6 months or sooner if needed.

Electronically signed by:
Dr. Sarah Smith, MD`,
      },
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ patientId: string; noteId: string }> }
) {
  const { patientId, noteId } = await params;

  const patient = patientData[patientId];
  const note = patient?.notes?.[noteId];

  if (!patient || !note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  // Parse content into paragraphs
  const lines = note.content.split("\n");
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
      paragraphs.push(new Paragraph({ text: "" }));
    } else if (line === line.toUpperCase() && line.trim().endsWith(":")) {
      // Section headers (all caps ending with colon)
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 24,
            }),
          ],
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (line.startsWith("Patient:") || line.startsWith("MRN:") || line.startsWith("Date of Service:") || line.startsWith("Provider:")) {
      // Header info
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 22,
            }),
          ],
        })
      );
    } else if (line.match(/^\d+\./)) {
      // Numbered items
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 22,
            }),
          ],
          indent: { left: 360 },
        })
      );
    } else if (line.startsWith("   -")) {
      // Sub-items
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              size: 22,
            }),
          ],
          indent: { left: 720 },
        })
      );
    } else if (line.includes("PROGRESS NOTE") || line.includes("OFFICE VISIT") || line.includes("NEW PATIENT")) {
      // Title
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 22,
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const uint8Array = new Uint8Array(buffer);

  const filename = `${patient.name} - ${note.type} - ${note.date}.docx`.replace(/\//g, "-");

  return new NextResponse(uint8Array, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
