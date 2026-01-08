"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Save,
  Upload,
  Printer,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  FileText,
  X,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// Mock patient/note data
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
_______________________
Dr. Sarah Smith, MD`,
      },
    },
  },
};

export default function WordEditorPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.patientId as string;
  const noteId = params.noteId as string;

  const patient = patientData[patientId];
  const note = patient?.notes?.[noteId];

  const [content, setContent] = useState(note?.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleUploadToEMR = async () => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadSuccess(true);
  };

  if (!patient || !note) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">Note not found</p>
          <Link href="/" className="text-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#2b579a] flex flex-col">
      {/* Word-like title bar */}
      <div className="bg-[#2b579a] text-white px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <FileText size={18} />
          </div>
          <span className="text-sm font-medium">
            {patient.name} - {note.type} - {note.date}.docx - Microsoft Word
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-white/10 rounded">
            <span className="text-xs">_</span>
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded">
            <span className="text-xs">[]</span>
          </button>
          <Link href={`/patients/${patientId}`} className="p-1.5 hover:bg-red-500 rounded">
            <X size={14} />
          </Link>
        </div>
      </div>

      {/* Ribbon Menu */}
      <div className="bg-[#f3f3f3] border-b border-gray-300">
        {/* Tabs */}
        <div className="flex items-center px-2 pt-1 gap-1 text-xs">
          <button className="px-3 py-1 bg-white border-t border-x border-gray-300 rounded-t font-medium text-[#2b579a]">
            File
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-t text-gray-600">
            Home
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-t text-gray-600">
            Insert
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-t text-gray-600">
            Design
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-t text-gray-600">
            Layout
          </button>
          <button className="px-3 py-1 bg-green-600 text-white rounded-t font-medium ml-2">
            Greenway EMR
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white px-4 py-2 flex items-center gap-4 border-b border-gray-200">
          {/* File Operations */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="p-1.5 hover:bg-gray-100 rounded flex items-center gap-1 text-xs disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <Save size={16} />
              )}
              Save
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Undo size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Redo size={16} />
            </button>
          </div>

          {/* Font formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-4">
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>Calibri</option>
              <option>Arial</option>
              <option>Times New Roman</option>
            </select>
            <select className="text-xs border border-gray-300 rounded px-2 py-1 w-14">
              <option>11</option>
              <option>12</option>
              <option>14</option>
            </select>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Bold size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Italic size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Underline size={16} />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-4">
            <button className="p-1.5 hover:bg-gray-100 rounded bg-gray-100">
              <AlignLeft size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <AlignCenter size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <AlignRight size={16} />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-4">
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <List size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <ListOrdered size={16} />
            </button>
          </div>

          {/* EMR Actions - The key buttons for the workflow */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleUploadToEMR}
              disabled={isUploading || uploadSuccess}
              className={`px-4 py-2 text-sm font-medium rounded flex items-center gap-2 transition-colors ${
                uploadSuccess
                  ? "bg-green-600 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              } disabled:opacity-70`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Uploading...
                </>
              ) : uploadSuccess ? (
                <>
                  <CheckCircle size={16} />
                  Uploaded to EMR
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload to EMR
                </>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 bg-[#e0e0e0] p-8 overflow-auto">
        <div className="max-w-[850px] mx-auto bg-white shadow-lg min-h-[1100px] p-16">
          {uploadSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Successfully Uploaded to EMR
              </h2>
              <p className="text-gray-500 mb-6">
                The note has been uploaded and is now pending sign-off by the provider.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-6">
                <p className="text-gray-600">
                  <strong>Patient:</strong> {patient.name}
                </p>
                <p className="text-gray-600">
                  <strong>MRN:</strong> {patient.mrn}
                </p>
                <p className="text-gray-600">
                  <strong>Note Type:</strong> {note.type}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {note.date}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span className="text-amber-600 font-medium">Pending Sign-off</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/patients/${patientId}`}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Return to Patient Chart
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[900px] resize-none border-none outline-none font-mono text-sm leading-relaxed"
              placeholder="Paste your clinical note here..."
            />
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#2b579a] text-white text-xs px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Page 1 of 1</span>
          <span>{content.split(/\s+/).filter(Boolean).length} words</span>
        </div>
        <div className="flex items-center gap-4">
          <span>English (United States)</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
