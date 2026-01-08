"use client";

import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  FileText,
  Hash,
  ArrowDownToLine,
  DollarSign,
  Monitor,
  Play,
  Square,
  CheckCircle,
  Clock,
  Copy,
  ChevronDown,
  User,
  Stethoscope,
  Calendar,
  AlertCircle,
  Clipboard,
} from "lucide-react";

// Mock patient data
const patients = [
  { id: "P001", name: "James Wilson", dob: "05/12/1968", mrn: "MRN-8834", procedure: "ACL Reconstruction", laterality: "Left" },
  { id: "P002", name: "Sarah Martinez", dob: "09/23/1975", mrn: "MRN-7721", procedure: "Total Knee Replacement", laterality: "Right" },
  { id: "P003", name: "Robert Thompson", dob: "02/14/1982", mrn: "MRN-9956", procedure: "Rotator Cuff Repair", laterality: "Right" },
];

// Mock generated content
const mockNote = `OPERATIVE NOTE

PATIENT: James Wilson
MRN: MRN-8834
DATE OF SURGERY: 01/08/2026
SURGEON: Dr. Michael Chen, MD

PREOPERATIVE DIAGNOSIS:
Left ACL tear

POSTOPERATIVE DIAGNOSIS:
Left ACL tear

PROCEDURE PERFORMED:
Left knee arthroscopic ACL reconstruction with BTB autograft

ANESTHESIA:
General with femoral nerve block

IMPLANTS:
- BTB graft, autologous
- Interference screws: Smith & Nephew 9mm x 25mm (femoral), 9mm x 30mm (tibial)

FINDINGS:
1. Complete ACL tear with no residual stump
2. Intact medial and lateral meniscus
3. Grade I chondromalacia of medial femoral condyle
4. No loose bodies

PROCEDURE DETAILS:
The patient was brought to the operating room and placed supine on the operating table. After adequate general anesthesia was obtained, a femoral nerve block was placed by anesthesia. The left lower extremity was prepped and draped in the usual sterile fashion. A tourniquet was applied to the left thigh and inflated to 300 mmHg.

Standard anterolateral and anteromedial portals were established. Diagnostic arthroscopy was performed confirming the above findings. The ACL stump was debrided. A 10mm BTB autograft was harvested through a 6cm incision over the patellar tendon. The graft was prepared on the back table.

Femoral and tibial tunnels were drilled using standard techniques. The graft was passed and secured with interference screws as noted above. Range of motion was tested with stable fixation noted. The knee was irrigated and closed in layers.

ESTIMATED BLOOD LOSS: 50 mL
TOURNIQUET TIME: 78 minutes
SPECIMENS: None
DRAINS: None

The patient tolerated the procedure well and was transferred to PACU in stable condition.

Electronically signed by:
Dr. Michael Chen, MD`;

const mockCodes = [
  { code: "29888", description: "Arthroscopically aided ACL repair/augmentation", type: "CPT", modifier: "LT" },
  { code: "27427", description: "Ligamentous reconstruction, knee", type: "CPT", modifier: "LT" },
  { code: "S81.511A", description: "Sprain of anterior cruciate ligament of left knee, initial encounter", type: "ICD-10" },
  { code: "M23.611", description: "Other spontaneous disruption of anterior cruciate ligament of left knee", type: "ICD-10" },
];

const mockOrders = [
  { type: "PT", description: "Physical therapy evaluation and treatment, ACL protocol", frequency: "3x/week x 12 weeks" },
  { type: "Imaging", description: "MRI left knee without contrast", timing: "6 weeks post-op" },
  { type: "DME", description: "Hinged knee brace, locked in extension", duration: "2 weeks" },
  { type: "Rx", description: "Oxycodone 5mg #30, Aspirin 325mg #30", instructions: "As directed" },
];

export default function MiraHealth() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState("note");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate live transcription
  useEffect(() => {
    if (isRecording) {
      const phrases = [
        "Patient is a 57 year old male...",
        "presenting for left ACL reconstruction...",
        "using BTB autograft technique...",
        "Preoperative diagnosis confirmed on MRI...",
        "Standard portals established...",
        "Graft prepared and passed through tunnels...",
        "Fixation achieved with interference screws...",
        "Good stability on examination...",
      ];
      let index = 0;
      const interval = setInterval(() => {
        if (index < phrases.length) {
          setTranscript((t) => t + (t ? " " : "") + phrases[index]);
          index++;
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const tabs = [
    { id: "note", label: "Note", icon: FileText },
    { id: "codes", label: "Codes", icon: Hash },
    { id: "orders", label: "Orders", icon: ArrowDownToLine },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "emr", label: "EMR", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">Mira Health</span>
          </div>
          <nav className="flex items-center gap-6">
            <button className="text-sm text-gray-600 hover:text-gray-900">Product</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Live Demo</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Orthopedics</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Security</button>
            <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Patient Selector */}
        <div className="mb-6">
          <div className="relative inline-block">
            <button
              onClick={() => setShowPatientDropdown(!showPatientDropdown)}
              className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">{selectedPatient.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedPatient.mrn} | {selectedPatient.procedure} ({selectedPatient.laterality})
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-400 ml-2" />
            </button>

            {showPatientDropdown && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {patients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowPatientDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedPatient.id === patient.id ? "bg-indigo-50" : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{patient.name}</p>
                      <p className="text-xs text-gray-500">
                        {patient.mrn} | {patient.procedure}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voice Recording Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700">Voice</span>
            {isRecording && (
              <span className="flex items-center gap-1 text-xs text-red-500">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Recording
              </span>
            )}
          </div>

          {/* Waveform Display */}
          <div className="h-16 bg-gray-50 rounded-lg mb-4 flex items-center justify-center px-4">
            {isRecording ? (
              <div className="flex items-center gap-1 h-full">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="waveform-bar w-1 bg-indigo-400 rounded-full"
                    style={{
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1 h-full opacity-30">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gray-300 rounded-full"
                    style={{ height: "30%" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Diagnosis Tags */}
          {(isRecording || hasGenerated) && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                <span className="w-2 h-2 border-2 border-blue-500 rounded-full"></span>
                Dx: ACL tear (Left)
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm flex items-center gap-1">
                <Clipboard size={12} />
                Laterality: L
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-1">
                <CheckCircle size={12} />
                Implant: BTB graft
              </span>
            </div>
          )}

          {/* Live Caption */}
          {transcript && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[60px]">
              <p className="text-sm text-gray-600">{transcript}</p>
              {isRecording && <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-1"></span>}
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" id="no-store" defaultChecked className="rounded" />
              <label htmlFor="no-store">Do not store audio</label>
              <span className="ml-4">{formatTime(recordingTime)}</span>
            </div>

            {!isRecording ? (
              <button
                onClick={() => {
                  setIsRecording(true);
                  setTranscript("");
                  setHasGenerated(false);
                }}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Play size={16} />
                Start
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-6 py-2.5 bg-red-600 text-white rounded-full font-medium flex items-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Square size={16} />
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Generating note, codes, and orders...</p>
          </div>
        )}

        {/* Generated Content Tabs */}
        {hasGenerated && !isGenerating && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Note Tab */}
              {activeTab === "note" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Operative Note</h3>
                    <button
                      onClick={() => copyToClipboard(mockNote, "note")}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {copiedItem === "note" ? (
                        <>
                          <CheckCircle size={14} className="text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy Note
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{mockNote}</pre>
                  </div>
                </div>
              )}

              {/* Codes Tab */}
              {activeTab === "codes" && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">CPT & ICD-10 Codes</h3>
                  <div className="space-y-3">
                    {mockCodes.map((code, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              code.type === "CPT"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {code.type}
                          </span>
                          <div>
                            <p className="font-mono font-medium text-gray-800">
                              {code.code}
                              {code.modifier && (
                                <span className="text-indigo-600 ml-1">-{code.modifier}</span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500">{code.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(code.code, code.code)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {copiedItem === code.code ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Generated Orders</h3>
                  <div className="space-y-3">
                    {mockOrders.map((order, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                            {order.type}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">{order.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.frequency || order.timing || order.duration || order.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Billing Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Charges</p>
                        <p className="text-2xl font-semibold text-gray-800">$8,450.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expected Reimbursement</p>
                        <p className="text-2xl font-semibold text-green-600">$6,760.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">29888-LT</span>
                      <span className="font-medium">$4,200.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">27427-LT</span>
                      <span className="font-medium">$3,500.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Facility Fee</span>
                      <span className="font-medium">$750.00</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Submit Claim
                  </button>
                </div>
              )}

              {/* EMR Tab */}
              {activeTab === "emr" && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Push to EMR</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-800 font-medium">Agent-driven push coming soon</p>
                      <p className="text-amber-700 text-sm">
                        Automated push-to-EMR that clicks through legacy systems is in private beta.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                      <Monitor size={18} />
                      Open in Greenway EHR
                    </button>
                    <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Copy size={18} />
                      Copy All to Clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Suggest Actions Button (when not recorded yet) */}
        {!hasGenerated && !isRecording && !isGenerating && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-gray-500 mb-4">Speak to see live captions...</p>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Suggest actions & EMR tasks
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
