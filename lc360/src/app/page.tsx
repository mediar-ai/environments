"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Clock,
  CheckSquare,
  Square,
  User,
  Grid3X3,
  List,
  Calendar,
  Settings,
  Printer,
  Mail,
  MoreHorizontal,
  X,
  Save,
  ChevronRight,
  AlertCircle,
  Check,
  Upload,
  Image,
} from "lucide-react";

// Mock survey data matching the screenshot
const surveys = [
  { id: "163006", policy: "2390236023", division: "Large Property Risk Engin...", companyName: "Prasek Inc.", clientLocation: "Prasek Inc.", surveyType: "Service Visit", status: "Needs Assessment", riskConsultant: "", locationStreet: "171 Brockley Dr", location: "CA", locationCity: "Hamilton", address: "171 Brockley Dr, Hamilton, CA 95012", yearBuilt: "1998", sqft: "12,500", stories: "2", construction: "Masonry Non-Combustible" },
  { id: "162923", policy: "ASPP2346", division: "Large Property Risk Engin...", companyName: "BASF Corporation", clientLocation: "BASF Corporate Offic...", surveyType: "New Business", status: "Needs Assessment", riskConsultant: "", locationStreet: "218 09 Farmingdale Place", location: "AU", locationCity: "Southampton", address: "218 09 Farmingdale Place, Southampton, AU 94501", yearBuilt: "2005", sqft: "45,000", stories: "3", construction: "Fire Resistive" },
  { id: "163025", policy: "ASPP2346", division: "Large Property Risk Engin...", companyName: "BASF Corporation", clientLocation: "BASF Corporation C...", surveyType: "1005 UW Survey", status: "Needs Assessment", riskConsultant: "", locationStreet: "707 Garth Avenue", location: "CA", locationCity: "San Luis Obispo", address: "707 Garth Avenue, San Luis Obispo, CA 93401", yearBuilt: "1987", sqft: "8,200", stories: "1", construction: "Wood Frame" },
  { id: "162633", policy: "CL454933...", division: "Commercial Lines", companyName: "Six Flags Entertainment C...", clientLocation: "Six Flags America MD...", surveyType: "1005 UW Survey", status: "Recommendation Review", riskConsultant: "Northwestern Insp...", locationStreet: "13710 Central Avenue", location: "US", locationCity: "Mitchellville", address: "13710 Central Avenue, Mitchellville, MD 20721", yearBuilt: "1974", sqft: "125,000", stories: "2", construction: "Masonry Non-Combustible" },
  { id: "162623", policy: "CL44453...", division: "Commercial Lines", companyName: "Valley Auto Parts", clientLocation: "Main Warehouse", surveyType: "1005 UW Survey", status: "In Progress", riskConsultant: "Jane Smith", locationStreet: "4521 Industrial Blvd", location: "CA", locationCity: "San Luis Obispo", address: "4521 Industrial Blvd, San Luis Obispo, CA 93401", yearBuilt: "1992", sqft: "15,800", stories: "1", construction: "Metal Building" },
  { id: "162621", policy: "CL454932...", division: "Commercial Lines", companyName: "Pacific Coast Brewing", clientLocation: "Production Facility", surveyType: "1005 UW Survey", status: "Assigned", riskConsultant: "Larry Chen", locationStreet: "892 Brewery Lane", location: "CA", locationCity: "Paso Robles", address: "892 Brewery Lane, Paso Robles, CA 93446", yearBuilt: "2001", sqft: "22,400", stories: "1", construction: "Masonry Non-Combustible" },
  { id: "162619", policy: "CL45454...", division: "Commercial Lines", companyName: "Central Coast Medical", clientLocation: "Urgent Care Center", surveyType: "1005 UW Survey", status: "Assigned", riskConsultant: "Jane Smith", locationStreet: "1205 Health Center Dr", location: "CA", locationCity: "Arroyo Grande", address: "1205 Health Center Dr, Arroyo Grande, CA 93420", yearBuilt: "2015", sqft: "6,500", stories: "1", construction: "Fire Resistive" },
  { id: "162019", policy: "CL454533...", division: "Commercial Lines", companyName: "Sunrise Senior Living", clientLocation: "Main Campus", surveyType: "1005 UW Survey", status: "Needs Assessment", riskConsultant: "", locationStreet: "3400 Sunset Ridge", location: "CA", locationCity: "Morro Bay", address: "3400 Sunset Ridge, Morro Bay, CA 93442", yearBuilt: "1988", sqft: "48,000", stories: "2", construction: "Wood Frame" },
  { id: "147024", policy: "2390239023", division: "Large Property Risk Engin...", companyName: "Tech Solutions Inc", clientLocation: "HQ Office", surveyType: "1005 UW Survey", status: "Completed", riskConsultant: "Jane Smith", locationStreet: "555 Innovation Way", location: "CA", locationCity: "San Luis Obispo", address: "555 Innovation Way, San Luis Obispo, CA 93405", yearBuilt: "2018", sqft: "18,200", stories: "2", construction: "Fire Resistive" },
  { id: "160071", policy: "5277869AP", division: "Commercial Lines", companyName: "Coastal Fitness Center", clientLocation: "Main Gym", surveyType: "1005 UW Survey", status: "Needs Assignment", riskConsultant: "", locationStreet: "3680 Julie Ct", location: "CA", locationCity: "Pismo Beach", address: "3680 Julie Ct, Pismo Beach, CA 93449", yearBuilt: "2008", sqft: "12,000", stories: "1", construction: "Masonry Non-Combustible" },
];

const navItems = [
  { label: "SURVEYS", active: true },
  { label: "ORDER", hasDropdown: true },
  { label: "CLM", hasDropdown: true },
  { label: "ADMIN", hasDropdown: true },
  { label: "MARKETING" },
  { label: "TRAINING" },
  { label: "TIME" },
  { label: "HR REPORTS" },
];

// Survey types available for new surveys
const surveyTypes = [
  "1005 UW Survey",
  "Service Visit",
  "New Business",
  "Recommendation Review",
  "Loss Control Survey",
  "Risk Assessment",
];

// 1005 UW Survey form sections
const buildingFeaturesSections = [
  {
    title: "Fire Protection",
    items: [
      { id: "fire_extinguishers", label: "Fire extinguishers present and serviced", defaultValue: true },
      { id: "sprinkler_system", label: "Automatic sprinkler system installed", defaultValue: true },
      { id: "fire_alarm", label: "Fire alarm system operational", defaultValue: true },
      { id: "smoke_detectors", label: "Smoke detectors installed throughout", defaultValue: true },
      { id: "fire_exits", label: "Fire exits properly marked and accessible", defaultValue: true },
      { id: "fire_dept_connection", label: "Fire department connection present", defaultValue: true },
      { id: "standpipe_system", label: "Standpipe system installed", defaultValue: false },
      { id: "fire_pump", label: "Fire pump present", defaultValue: false },
      { id: "kitchen_suppression", label: "Kitchen hood suppression system (if applicable)", defaultValue: true },
    ],
  },
  {
    title: "Electrical Systems",
    items: [
      { id: "circuit_breakers", label: "Circuit breakers present (not fuses)", defaultValue: true },
      { id: "electrical_panel", label: "Electrical panel accessible and labeled", defaultValue: true },
      { id: "gfci_outlets", label: "GFCI outlets in wet areas", defaultValue: true },
      { id: "no_knob_tube", label: "No knob and tube wiring observed", defaultValue: true },
      { id: "no_aluminum_wiring", label: "No aluminum branch wiring", defaultValue: true },
      { id: "surge_protection", label: "Surge protection installed", defaultValue: true },
      { id: "emergency_lighting", label: "Emergency lighting present", defaultValue: true },
      { id: "exit_signs", label: "Illuminated exit signs functional", defaultValue: true },
    ],
  },
  {
    title: "Building Structure",
    items: [
      { id: "roof_condition", label: "Roof in good condition", defaultValue: true },
      { id: "foundation_sound", label: "Foundation appears sound", defaultValue: true },
      { id: "no_structural_damage", label: "No visible structural damage", defaultValue: true },
      { id: "exterior_maintained", label: "Exterior walls properly maintained", defaultValue: true },
      { id: "windows_intact", label: "Windows intact and secure", defaultValue: true },
      { id: "doors_functional", label: "Doors functional with proper hardware", defaultValue: true },
      { id: "parking_lot_condition", label: "Parking lot in acceptable condition", defaultValue: true },
      { id: "ada_compliant", label: "ADA accessibility features present", defaultValue: true },
    ],
  },
  {
    title: "HVAC & Plumbing",
    items: [
      { id: "hvac_maintained", label: "HVAC system properly maintained", defaultValue: true },
      { id: "water_heater", label: "Water heater properly installed", defaultValue: true },
      { id: "no_leaks", label: "No visible plumbing leaks", defaultValue: true },
      { id: "backflow_preventer", label: "Backflow preventer installed", defaultValue: true },
      { id: "water_shutoff", label: "Main water shut-off accessible", defaultValue: true },
      { id: "gas_shutoff", label: "Gas shut-off valve accessible (if applicable)", defaultValue: true },
    ],
  },
  {
    title: "Security & Safety",
    items: [
      { id: "security_system", label: "Security/burglar alarm system", defaultValue: true },
      { id: "exterior_lighting", label: "Adequate exterior lighting", defaultValue: true },
      { id: "fencing", label: "Perimeter fencing (if applicable)", defaultValue: false },
      { id: "security_cameras", label: "Security cameras installed", defaultValue: true },
      { id: "first_aid", label: "First aid kit available", defaultValue: true },
      { id: "safety_signs", label: "Safety signage posted", defaultValue: true },
      { id: "slip_resistant", label: "Slip-resistant flooring in wet areas", defaultValue: true },
      { id: "handrails", label: "Handrails on stairs", defaultValue: true },
    ],
  },
  {
    title: "Hazards & Storage",
    items: [
      { id: "no_combustibles", label: "No excessive combustible storage", defaultValue: true },
      { id: "chemical_storage", label: "Chemicals properly stored (if applicable)", defaultValue: true },
      { id: "flammable_cabinet", label: "Flammable liquids in approved cabinet", defaultValue: true },
      { id: "no_trip_hazards", label: "No trip hazards observed", defaultValue: true },
      { id: "housekeeping", label: "General housekeeping satisfactory", defaultValue: true },
      { id: "waste_disposal", label: "Proper waste disposal containers", defaultValue: true },
      { id: "dumpster_distance", label: "Dumpster 10+ feet from building", defaultValue: true },
    ],
  },
];

export default function LossControl360() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<typeof surveys[0] | null>(null);
  const [showForm, setShowForm] = useState(false);

  // New survey creation state
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);
  const [selectedSurveyType, setSelectedSurveyType] = useState("");
  const [isNewSurvey, setIsNewSurvey] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    propertyAddress: "",
    inspectorName: "Jane Smith",
    inspectionDate: new Date().toISOString().split('T')[0],
    yearBuilt: "",
    squareFootage: "",
    numberOfStories: "",
    constructionType: "",
    standardParagraph: "",
    buildingSketchNote: "Aerial photograph provided",
    checkboxes: {} as Record<string, boolean>,
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(
    buildingFeaturesSections.map(s => s.title)
  );

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === surveys.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(surveys.map((s) => s.id));
    }
  };

  const openSurveyForm = (survey: typeof surveys[0]) => {
    setSelectedSurvey(survey);
    setIsNewSurvey(false);

    // Initialize form with survey data
    const initialCheckboxes: Record<string, boolean> = {};
    buildingFeaturesSections.forEach(section => {
      section.items.forEach(item => {
        initialCheckboxes[item.id] = item.defaultValue;
      });
    });

    const city = survey.locationCity || "San Luis Obispo";
    const construction = survey.construction || "Masonry Non-Combustible";
    const yearBuilt = survey.yearBuilt || "1990";

    setFormData({
      propertyAddress: survey.address || `${survey.locationStreet}, ${survey.locationCity}, ${survey.location}`,
      inspectorName: "Jane Smith",
      inspectionDate: new Date().toISOString().split('T')[0],
      yearBuilt: yearBuilt,
      squareFootage: survey.sqft || "10,000",
      numberOfStories: survey.stories || "1",
      constructionType: construction,
      standardParagraph: `The property inspected is located in the city of ${city}. It has ${construction.toLowerCase()} type of construction. It was built in ${yearBuilt}. The building is currently used for commercial purposes and appears to be well-maintained. At the time of inspection, the property was occupied and operational. The surrounding area consists primarily of commercial and light industrial properties with adequate access for emergency vehicles.`,
      buildingSketchNote: "Aerial photograph provided",
      checkboxes: initialCheckboxes,
    });

    setShowForm(true);
  };

  // Open new survey creation modal
  const openNewSurveyModal = () => {
    setShowNewSurveyModal(true);
    setSelectedSurveyType("");
  };

  // Create new survey with selected type
  const createNewSurvey = () => {
    if (!selectedSurveyType) return;

    setIsNewSurvey(true);
    setSelectedSurvey(null);
    setShowNewSurveyModal(false);

    // Initialize empty form for new survey
    const initialCheckboxes: Record<string, boolean> = {};
    buildingFeaturesSections.forEach(section => {
      section.items.forEach(item => {
        // For new surveys, all checkboxes start unchecked - user must check them
        initialCheckboxes[item.id] = false;
      });
    });

    setFormData({
      propertyAddress: "", // Empty - user must copy from main page
      inspectorName: "Jane Smith",
      inspectionDate: new Date().toISOString().split('T')[0],
      yearBuilt: "", // Empty - user must get from external service
      squareFootage: "", // Empty - user must get from external service
      numberOfStories: "1",
      constructionType: "",
      standardParagraph: "", // Empty - user must paste from Google Doc template
      buildingSketchNote: "",
      checkboxes: initialCheckboxes,
    });

    setShowForm(true);
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const toggleCheckbox = (id: string) => {
    setFormData(prev => ({
      ...prev,
      checkboxes: {
        ...prev.checkboxes,
        [id]: !prev.checkboxes[id]
      }
    }));
  };

  const handleSaveForm = () => {
    // Close the modal
    setShowForm(false);
    setIsNewSurvey(false);

    // Show success toast
    setToastMessage("Survey saved successfully!");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Needs Assessment": return "bg-yellow-100 text-yellow-800";
      case "Needs Assignment": return "bg-orange-100 text-orange-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Assigned": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Recommendation Review": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col text-[13px]">
      {/* Top Header - Dark Blue */}
      <header className="bg-[#1e3a5f] text-white h-12 flex items-center px-4 justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-300 uppercase tracking-wider">UTILANT</span>
            <span className="text-lg font-semibold">LossControl360 - EDITED</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item, i) => (
              <button
                key={i}
                className={`px-3 py-2 text-sm flex items-center gap-1 rounded transition-colors ${
                  item.active ? "bg-[#2d4a6f] text-white" : "text-gray-200 hover:bg-[#2d4a6f]"
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={14} />}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-amber-200 to-amber-400 flex items-center justify-center">
              <User size={20} className="text-amber-700" />
            </div>
          </div>
          <span className="text-sm font-medium">JANE SMITH</span>
          <ChevronDown size={14} />
        </div>
      </header>

      {/* Secondary Toolbar */}
      <div className="bg-[#e8e8e8] border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
            <Clock size={14} className="text-gray-500" />
            DEFAULT VIEW
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="px-3 py-1.5 bg-[#e67e22] text-white rounded text-sm flex items-center gap-2 hover:bg-[#d35400]">
            PAST OVERDUE
            <ChevronDown size={14} />
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
            MY OPEN/RISK OVERVIEW
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
            1005 UW SURVEYS
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <button className="px-3 py-1.5 bg-[#3498db] text-white rounded text-sm flex items-center gap-2 hover:bg-[#2980b9]">
            WAITING FOR DOCS
          </button>
        </div>
      </div>

      {/* Tertiary Toolbar */}
      <div className="bg-[#f0f0f0] border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#2c3e50] text-white rounded text-sm flex items-center gap-2">
            CLEARANCE SEARCH
          </button>
          <div className="flex items-center bg-white border border-gray-300 rounded">
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <Grid3X3 size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <List size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <Calendar size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <Settings size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <Printer size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 border-r border-gray-300">
              <Mail size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100">
              <MoreHorizontal size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-48 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={openNewSurveyModal}
            className="px-3 py-1.5 bg-[#27ae60] text-white rounded text-sm hover:bg-[#229954]"
          >
            + NEW SURVEY
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse min-w-[1400px]">
          <thead className="bg-[#34495e] text-white text-left sticky top-0">
            <tr>
              <th className="p-2 w-10 border-r border-[#2c3e50]">
                <button onClick={toggleAll} className="flex items-center justify-center">
                  {selectedRows.length === surveys.length ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              </th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Survey ID</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Policy</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Division</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Company Name</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Client Location</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Survey Type</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Status</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Risk Consultant</th>
              <th className="p-2 border-r border-[#2c3e50] font-medium">Location</th>
              <th className="p-2 font-medium">City</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr
                key={survey.id}
                className={`border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                } ${selectedRows.includes(survey.id) ? "bg-blue-100" : ""}`}
                onDoubleClick={() => openSurveyForm(survey)}
              >
                <td className="p-2 border-r border-gray-200" onClick={(e) => { e.stopPropagation(); toggleRow(survey.id); }}>
                  <div className="flex items-center justify-center">
                    {selectedRows.includes(survey.id) ? (
                      <CheckSquare size={16} className="text-blue-600" />
                    ) : (
                      <Square size={16} className="text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="p-2 border-r border-gray-200 text-blue-600 hover:underline" onClick={() => openSurveyForm(survey)}>
                  {survey.id}
                </td>
                <td className="p-2 border-r border-gray-200 text-gray-700">{survey.policy}</td>
                <td className="p-2 border-r border-gray-200 text-gray-700 max-w-[180px] truncate">{survey.division}</td>
                <td className="p-2 border-r border-gray-200 text-gray-700 max-w-[180px] truncate">{survey.companyName}</td>
                <td className="p-2 border-r border-gray-200 text-gray-700 max-w-[150px] truncate">{survey.clientLocation}</td>
                <td className="p-2 border-r border-gray-200 text-gray-700">{survey.surveyType}</td>
                <td className="p-2 border-r border-gray-200">
                  <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(survey.status)}`}>
                    {survey.status}
                  </span>
                </td>
                <td className="p-2 border-r border-gray-200 text-gray-700 max-w-[140px] truncate">{survey.riskConsultant}</td>
                <td className="p-2 border-r border-gray-200 text-gray-700">{survey.location}</td>
                <td className="p-2 text-gray-700 max-w-[120px] truncate">{survey.locationCity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="bg-[#e8e8e8] border-t border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Found <strong>{surveys.length}</strong> results in <strong>.248</strong> seconds
          <span className="ml-4 text-gray-500">Double-click a row to open the survey form</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
            <Download size={14} />
            DOWNLOAD CSV
          </button>
          <button className="px-3 py-1.5 bg-[#3498db] text-white rounded text-sm flex items-center gap-2 hover:bg-[#2980b9]">
            <FileSpreadsheet size={14} />
            EXPORT
          </button>
        </div>
      </footer>

      {/* New Survey Type Selection Modal */}
      {showNewSurveyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-2xl">
            <div className="bg-[#1e3a5f] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <h2 className="text-xl font-semibold">Create New Survey</h2>
              <button
                onClick={() => setShowNewSurveyModal(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Survey Type
              </label>
              <select
                value={selectedSurveyType}
                onChange={(e) => setSelectedSurveyType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select Type --</option>
                <option value="1005 UW Survey">1005 UW Survey (Underwriter)</option>
                <option value="1010 Commercial">1010 Commercial Property</option>
                <option value="1015 Industrial">1015 Industrial Facility</option>
                <option value="1020 Retail">1020 Retail Location</option>
                <option value="1025 Restaurant">1025 Restaurant/Food Service</option>
                <option value="1030 Office">1030 Office Building</option>
              </select>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowNewSurveyModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedSurveyType) {
                      createNewSurvey();
                    }
                  }}
                  disabled={!selectedSurveyType}
                  className={`px-6 py-2 rounded font-medium ${
                    selectedSurveyType
                      ? "bg-[#27ae60] text-white hover:bg-[#229954]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Create Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#27ae60] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <Check size={20} />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 1005 UW Survey Form Modal */}
      {showForm && (selectedSurvey || isNewSurvey) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-6xl h-[90vh] rounded-lg shadow-2xl flex flex-col">
            {/* Form Header */}
            <div className="bg-[#1e3a5f] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold">{isNewSurvey ? `New ${selectedSurveyType}` : "1005 UW Survey - Underwriter Form"}</h2>
                <p className="text-sm text-gray-300">
                  {isNewSurvey 
                    ? "New Survey - Fill in all required fields" 
                    : `Survey ID: ${selectedSurvey?.id} | ${selectedSurvey?.companyName}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveForm}
                  className="flex items-center gap-2 bg-[#27ae60] hover:bg-[#229954] px-4 py-2 rounded text-sm font-medium"
                >
                  <Save size={16} />
                  Save Form
                </button>
                <button
                  onClick={() => { setShowForm(false); setIsNewSurvey(false); }}
                  className="p-2 hover:bg-[#2d4a6f] rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-5xl mx-auto space-y-6">

                {/* Section 1: Property Information */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="bg-[#34495e] text-white px-4 py-3 rounded-t-lg font-medium">
                    Section 1: Property Information
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                      <input
                        type="text"
                        value={formData.propertyAddress}
                        onChange={(e) => setFormData(prev => ({...prev, propertyAddress: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter property address"
                      />
                      <p className="text-xs text-gray-500 mt-1">Copy from main page - system does not auto-fill</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inspector Name *</label>
                      <input
                        type="text"
                        value={formData.inspectorName}
                        onChange={(e) => setFormData(prev => ({...prev, inspectorName: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Date *</label>
                      <input
                        type="date"
                        value={formData.inspectionDate}
                        onChange={(e) => setFormData(prev => ({...prev, inspectionDate: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year Built *</label>
                      <input
                        type="text"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData(prev => ({...prev, yearBuilt: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="e.g., 1992"
                      />
                      <p className="text-xs text-gray-500 mt-1">Source from external property records service</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage *</label>
                      <input
                        type="text"
                        value={formData.squareFootage}
                        onChange={(e) => setFormData(prev => ({...prev, squareFootage: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="e.g., 12,500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Stories *</label>
                      <select
                        value={formData.numberOfStories}
                        onChange={(e) => setFormData(prev => ({...prev, numberOfStories: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      >
                        <option value="1">1 Story</option>
                        <option value="2">2 Stories</option>
                        <option value="3">3 Stories</option>
                        <option value="4">4+ Stories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Construction Type *</label>
                      <select
                        value={formData.constructionType}
                        onChange={(e) => setFormData(prev => ({...prev, constructionType: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      >
                        <option value="Fire Resistive">Fire Resistive</option>
                        <option value="Masonry Non-Combustible">Masonry Non-Combustible</option>
                        <option value="Non-Combustible">Non-Combustible</option>
                        <option value="Wood Frame">Wood Frame</option>
                        <option value="Metal Building">Metal Building</option>
                        <option value="Joisted Masonry">Joisted Masonry</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Standard Description Paragraph */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="bg-[#34495e] text-white px-4 py-3 rounded-t-lg font-medium flex items-center justify-between">
                    <span>Section 2: Property Description</span>
                    <span className="text-xs bg-[#27ae60] px-2 py-1 rounded">Template Auto-Filled</span>
                  </div>
                  <div className="p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Standard Description Paragraph *</label>
                    <textarea
                      value={formData.standardParagraph}
                      onChange={(e) => setFormData(prev => ({...prev, standardParagraph: e.target.value}))}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                      placeholder="Enter property description..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Standard template with blanks filled in. Describes general property characteristics.
                    </p>
                  </div>
                </div>

                {/* Section 3: Building Features Checklist */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="bg-[#34495e] text-white px-4 py-3 rounded-t-lg font-medium flex items-center justify-between">
                    <span>Section 3: Building Features & Safety Checklist</span>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle size={14} />
                      <span>Pre-filled with standard responses - modify as needed</span>
                    </div>
                  </div>
                  <div className="p-4">
                    {buildingFeaturesSections.map((section) => (
                      <div key={section.title} className="mb-4 border border-gray-200 rounded">
                        <button
                          onClick={() => toggleSection(section.title)}
                          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 rounded-t"
                        >
                          <span className="font-medium text-gray-700">{section.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {section.items.filter(i => formData.checkboxes[i.id]).length}/{section.items.length} Yes
                            </span>
                            <ChevronRight
                              size={16}
                              className={`text-gray-400 transition-transform ${
                                expandedSections.includes(section.title) ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </button>
                        {expandedSections.includes(section.title) && (
                          <div className="p-4 grid grid-cols-2 gap-3">
                            {section.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleCheckbox(item.id)}
                              >
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                    formData.checkboxes[item.id]
                                      ? "bg-[#27ae60] border-[#27ae60] text-white"
                                      : "border-gray-300 bg-white"
                                  }`}
                                >
                                  {formData.checkboxes[item.id] && <Check size={14} />}
                                </div>
                                <span className="text-sm text-gray-700">{item.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Building Sketch */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="bg-[#34495e] text-white px-4 py-3 rounded-t-lg font-medium">
                    Section 4: Building Sketch / Aerial Photo
                  </div>
                  <div className="p-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Image size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Upload building sketch or aerial photograph</p>
                      <p className="text-xs text-gray-500 mb-4">System requires sketch for buildings 100+ sq ft</p>
                      <button className="px-4 py-2 bg-[#3498db] text-white rounded hover:bg-[#2980b9] flex items-center gap-2 mx-auto">
                        <Upload size={16} />
                        Upload Image
                      </button>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Or enter note:</label>
                      <input
                        type="text"
                        value={formData.buildingSketchNote}
                        onChange={(e) => setFormData(prev => ({...prev, buildingSketchNote: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="e.g., Aerial photograph provided"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Often &quot;aerial photograph provided&quot; is sufficient when photos are included
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    * Required fields | Form auto-saves every 30 seconds
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setShowForm(false); setIsNewSurvey(false); }}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveForm}
                      className="px-6 py-2 bg-[#27ae60] text-white rounded hover:bg-[#229954] flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save & Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
