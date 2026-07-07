import { useState, useEffect, FormEvent } from "react";
import {
  Zap,
  CheckCircle2,
  Clock,
  Database,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Users,
  Gauge,
  Layers,
  ArrowRightCircle,
  HelpCircle,
  Code2,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SimulatedEvent {
  id: string;
  label: string;
  time: string;
  detail: string;
  status: "success" | "pending" | "processing" | "failed";
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  message: string;
  submittedAt: string;
  status: "new" | "replied" | "nurturing" | "converted";
  timeline: SimulatedEvent[];
}

interface Blueprint {
  businessType: string;
  recommendedWebsiteElements: string[];
  crmSetupNotes: string;
  automationSteps: {
    trigger: string;
    action: string;
    timing: string;
  }[];
  estimatedConversionLift: string;
}

export default function App() {
  // Leads Database State (live synced from server)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  // Consulting Lead Form State (Visitor requests a real consultation call)
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultBusiness, setConsultBusiness] = useState("");
  const [consultType, setConsultType] = useState("Local Agency");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState(false);

  // CRM Simulation Playground Lead State (User tests lead automation rules)
  const [simName, setSimName] = useState("");
  const [simEmail, setSimEmail] = useState("");
  const [simPhone, setSimPhone] = useState("");
  const [simBizName, setSimBizName] = useState("");
  const [simBizType, setSimBizType] = useState("HVAC Repair");
  const [simMessage, setSimMessage] = useState("");
  const [simulating, setSimulating] = useState<string | null>(null); // holds leadId currently running simulation
  const [activeSimProgress, setActiveSimProgress] = useState<number>(0);

  // Selected lead context for timeline visualizer
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Gemini Blueprint Strategy Creator states
  const [blueprintBizType, setBlueprintBizType] = useState("");
  const [blueprintChallenges, setBlueprintChallenges] = useState("");
  const [blueprintGoal, setBlueprintGoal] = useState("");
  const [blueprintLoading, setBlueprintLoading] = useState(false);
  const [blueprintResult, setBlueprintResult] = useState<Blueprint | null>(null);
  const [blueprintError, setBlueprintError] = useState<string | null>(null);

  // Core ROI Slider / Calculator states
  const [calculatorLeads, setCalculatorLeads] = useState<number>(45);
  const [calculatorLeadValue, setCalculatorLeadValue] = useState<number>(1500);
  const [calculatorSpeed, setCalculatorSpeed] = useState<string>("4hours"); // "2mins" | "15mins" | "4hours" | "24hours"

  // Load leads database from backend on mount
  const fetchLeads = async (selectLatest = false) => {
    try {
      setLeadsLoading(true);
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        if (data.length > 0) {
          if (selectLatest) {
            setSelectedLead(data[0]);
          } else if (!selectedLead) {
            setSelectedLead(data[0]);
          } else {
            // keep selection synced
            const updatedSelected = data.find((l: Lead) => l.id === selectedLead.id);
            if (updatedSelected) {
              setSelectedLead(updatedSelected);
            } else {
              setSelectedLead(data[0]);
            }
          }
        }
      }
    } catch (e) {
      console.error("Error loading leads:", e);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Submit Lead to Backend & trigger UI animation
  const handleSubmitLead = async (e: FormEvent, isSimulator: boolean) => {
    e.preventDefault();
    
    const payload = isSimulator ? {
      name: simName || "Demo Lead",
      email: simEmail || "customer@demoplace.com",
      phone: simPhone || "555-9000",
      businessName: simBizName || "Demo Contracting Inc.",
      businessType: simBizType,
      message: simMessage || "Need emergency service callback please."
    } : {
      name: consultName,
      email: consultEmail,
      phone: consultPhone,
      businessName: consultBusiness,
      businessType: consultType,
      message: consultMessage
    };

    if (isSimulator) {
      setSimulating("submitting");
    } else {
      setConsultSubmitting(true);
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newlyCreated: Lead = await res.json();
        
        if (isSimulator) {
          // Reset form
          setSimName("");
          setSimEmail("");
          setSimPhone("");
          setSimBizName("");
          setSimMessage("");
          
          // Refresh leads list
          await fetchLeads();
          setSelectedLead(newlyCreated);
          
          // Trigger timeline simulation animation
          runTimelineSimulation(newlyCreated.id);
        } else {
          setConsultSuccess(true);
          setConsultName("");
          setConsultEmail("");
          setConsultPhone("");
          setConsultBusiness("");
          setConsultMessage("");
          await fetchLeads(true);
        }
      }
    } catch (err) {
      console.error("Inquiry submission failure:", err);
    } finally {
      setConsultSubmitting(false);
    }
  };

  // Run lead automation chronological ticks
  const runTimelineSimulation = (leadId: string) => {
    setSimulating(leadId);
    setActiveSimProgress(1);
    
    const interval = setInterval(() => {
      setActiveSimProgress(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setSimulating(null);
          return 4;
        }
        return prev + 1;
      });
    }, 1800);
  };

  // Reset demo lead database
  const handleResetLeads = async () => {
    try {
      const res = await fetch("/api/leads/reset", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        if (data.leads.length > 0) {
          setSelectedLead(data.leads[0]);
        }
      }
    } catch (err) {
      console.error("Failed to reset database", err);
    }
  };

  // Dynamic Blueprint strategy caller (Gemini)
  const handleGenerateBlueprint = async (e: FormEvent) => {
    e.preventDefault();
    if (!blueprintBizType.trim()) return;

    setBlueprintLoading(true);
    setBlueprintError(null);
    setBlueprintResult(null);

    try {
      const res = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: blueprintBizType,
          currentChallenges: blueprintChallenges,
          primaryGoal: blueprintGoal
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.error && data.fallback) {
          setBlueprintResult(data.fallback);
          setBlueprintError(data.error);
        } else {
          setBlueprintResult(data);
        }
      } else {
        throw new Error("Invalid server answer status");
      }
    } catch (err) {
      console.error("Failed to fetch custom plan:", err);
      setBlueprintError("Could not connect to generator. Displaying an optimal starter configuration instead.");
      setBlueprintResult({
        businessType: blueprintBizType || "Service Enterprise",
        recommendedWebsiteElements: [
          "Floating 'Schedule Live' prominent CTA on hero image",
          "One-click text reservation button in mobile layout",
          "Automated instant-quote qualification estimator"
        ],
        crmSetupNotes: "Deploy basic HubSpot contact pipeline with custom tags suited for fast consultation outreach.",
        automationSteps: [
          {
            trigger: "Lead captures on landing page",
            action: "System schedules instantaneous personalized intro mail containing direct calendar link.",
            timing: "Immediate"
          },
          {
            trigger: "Lead does not book within 20 minutes",
            action: "Send secondary text reminder alerting that calendar slots are filling quickly.",
            timing: "20 minutes"
          }
        ],
        estimatedConversionLift: "Reclaim up to 70% of lost leads normally captured and neglected during busy service work shifts."
      });
    } finally {
      setBlueprintLoading(false);
    }
  };

  // ROI Calculator Arithmetic
  const speedRates: Record<string, { rate: number; speedLabel: string }> = {
    "2mins": { rate: 0.35, speedLabel: "Responsive (< 2 Mins)" },
    "15mins": { rate: 0.18, speedLabel: "Delayed (< 15 Mins)" },
    "4hours": { rate: 0.06, speedLabel: "Typical Speed (3 - 5 Hours)" },
    "24hours": { rate: 0.02, speedLabel: "Slow Outreach (1 Day+)" }
  };

  const getCalculatorResults = () => {
    const totalPipeline = calculatorLeads * calculatorLeadValue;
    const currentRate = speedRates[calculatorSpeed].rate;
    const currentClosedCount = Math.round(calculatorLeads * currentRate);
    const currentClosedRevenue = currentClosedCount * calculatorLeadValue;

    // Optimized response rate: 38%
    const optimizedClosedCount = Math.round(calculatorLeads * 0.38);
    const optimizedClosedRevenue = optimizedClosedCount * calculatorLeadValue;

    const liftRevenue = Math.max(0, optimizedClosedRevenue - currentClosedRevenue);
    const liftPercentage = Math.round(((optimizedClosedCount - currentClosedCount) / Math.max(1, currentClosedCount)) * 100);

    return {
      totalPipeline,
      currentClosedCount,
      currentClosedRevenue,
      optimizedClosedCount,
      optimizedClosedRevenue,
      liftRevenue,
      liftPercentage,
      currentRatePercent: Math.round(currentRate * 100)
    };
  };

  const roi = getCalculatorResults();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans flex flex-col selection:bg-indigo-900 selection:text-indigo-200">
      
      {/* Upper Status Bar & Elegant Nav */}
      <nav id="header-nav" className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-500/20">
              <Zap className="h-5 w-5 animate-pulse text-indigo-400" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-white hover:opacity-95 transition-opacity">WebAutomation</span>
              <span className="text-indigo-400 font-medium text-sm ml-1.5 block sm:inline-block border-l sm:border-l border-white/10 sm:pl-2">Consulting</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hidden md:flex items-center space-x-2 text-xs py-1.5 px-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>CRM & AUTOMATION SERVICES ACTIVE</span>
            </span>
            <a
              href="#crm-sandbox"
              className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Demo Sandbox
            </a>
            <a
              href="#quote-form"
              className="bg-white text-black hover:bg-slate-250 font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all shadow-sm"
            >
              Get Free Blueprint
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

        {/* Hero Section */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Small Business Strategy</span>
            </div>
            
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              We Build Fast <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Websites</span> & Automate Your <span className="text-indigo-400">Lead Follow-Up</span>
            </h1>
            
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
              Stop losing customers to late replies. We design lightning-fast local business websites, configure basic CRM systems (HubSpot/Brevo), and program zero-friction text & email follow-up flows that operate 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#blueprint-generator"
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-500/20 group text-base"
              >
                <span>Try AI Blueprint Creator</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#crm-sandbox"
                className="bg-transparent text-white border border-white/10 hover:border-white/20 hover:bg-white/5 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all text-base"
              >
                <span>Simulate Demo CRM</span>
                <Play className="h-4 w-4 fill-current text-indigo-400 animate-pulse" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              <div>
                <span className="block text-3xl font-extrabold text-white">Less than 2m</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Recommended Response Time</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-indigo-400">Up to 3x</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Increase in Booked Work</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-white">100%</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Hands-off Automation Setup</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#161618] p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-10 mt-[-20px] mr-[-20px]"></div>
            
            <h3 className="font-sans font-bold text-lg text-white mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <span>The Industry Challenge</span>
            </h3>

            <div className="space-y-4">
              <div className="bg-[#0A0A0B] p-4 rounded-xl border border-rose-500/10 hover:border-rose-500/20 transition-all relative shadow-sm">
                <span className="absolute -top-2 right-4 text-xs font-semibold bg-rose-500/10 text-rose-450 border border-rose-500/20 px-2.5 py-0.5 rounded-full font-mono">
                  Losing Money
                </span>
                <h4 className="font-semibold text-sm text-white">The Typical Slow Reply</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Visitor fills a contacts form. Email alerts sit in inbox. Owner is busy on-site, serving code, or asleep. Lead sits unread for hours. Cold customer departs to hire key competitor.
                </p>
                <div className="mt-3 flex items-center space-x-2 text-rose-400 text-xs font-semibold">
                  <span>Result: 2% - 5% Conversion Limit</span>
                </div>
              </div>

              <div className="bg-[#0A0A0B] p-4 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-all relative shadow-sm font-sans">
                <span className="absolute -top-2 right-4 text-xs font-semibold bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                  Our Setup
                </span>
                <h4 className="font-semibold text-sm text-white">Velocity Flow Automations</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Form maps directly to CRM (HubSpot/Brevo). Within seconds, prospect receives optimized welcome template + calendar reservation token. Auto-nurture keeps them engaged.
                </p>
                <div className="mt-3 flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Result: 35%+ Conversion Rate (Zero Effort)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic ROI Growth Calculator */}
        <section id="roi-calculator" className="bg-[#161618] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold tracking-wide uppercase mb-3 font-mono">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Instant ROI Estimator</span>
            </div>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white">
              See How Much Revenue You Are Leaving On The Table
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 font-light">
              Slow response times kill marketing campaigns. Use our calculator to see the conversion lift our websites and automations deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Control Sliders */}
            <div className="lg:col-span-7 space-y-6 bg-[#0A0A0B] p-6 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <label className="text-sm font-semibold text-slate-305">Estimated Inbound Leads per Month</label>
                  <span className="text-indigo-400 font-bold">{calculatorLeads} Leads</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={calculatorLeads}
                  onChange={(e) => setCalculatorLeads(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-605"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>5 leads</span>
                  <span>150 leads</span>
                  <span>300 leads</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <label className="text-sm font-semibold text-slate-305">Average Lead / Job Value</label>
                  <span className="text-indigo-400 font-bold">${calculatorLeadValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="15000"
                  step="100"
                  value={calculatorLeadValue}
                  onChange={(e) => setCalculatorLeadValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-605"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>$100</span>
                  <span>$7,500</span>
                  <span>$15,000</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-305 block">Your Current Lead Response Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(speedRates).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setCalculatorSpeed(key)}
                      type="button"
                      className={`p-3 rounded-lg text-center border text-xs font-semibold transition-all ${
                        calculatorSpeed === key
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-[#161618] border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {value.speedLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Result Output */}
            <div className="lg:col-span-5 bg-[#0A0A0B] text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30 mt-[-30px] mr-[-30px]"></div>
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold font-mono">Estimated Pipeline Potential</span>
                  <div className="text-3xl font-extrabold text-white mt-1">${roi.totalPipeline.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Current Closed (at {roi.currentRatePercent}%)</span>
                    <span className="text-base font-bold text-rose-450 mt-1 block">{roi.currentClosedCount} sales / ${roi.currentClosedRevenue.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-xs text-indigo-400 block">Automated Closed (38%)</span>
                    <span className="text-base font-bold text-emerald-400 mt-1 block">{roi.optimizedClosedCount} sales / ${roi.optimizedClosedRevenue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-xs text-slate-400 block">Recoverable Lost Revenue</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-extrabold text-emerald-450">+${roi.liftRevenue.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">/ month saved</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-light">
                    By addressing speed-to-lead and creating calendar automations, this business can experience up to a <strong className="text-indigo-400">{roi.liftPercentage || 0}% Closed Lead conversion lift</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Ready to claim this revenue?</span>
                <a
                  href="#blueprint-generator"
                  className="text-xs text-indigo-400 font-bold flex items-center space-x-1 group hover:text-indigo-300"
                >
                  <span>Build my system</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic AI Blueprint Strategy Generator powered by Gemini */}
        <section id="blueprint-generator">
          <div className="bg-gradient-to-br from-[#161618] to-[#0A0A0B] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/5 relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-3xl opacity-10 mt-[-50px] mr-[-50px]"></div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold tracking-wide uppercase font-mono">
                  <Sparkles className="h-4 w-4" />
                  <span>Interactive AI Blueprint Creator</span>
                </div>
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
                  Get a Free CRM & Conversion Roadmap
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-light">
                  Enter your business info below. Our server-side Gemini system will analyze your parameters and generate a personalized landing-page strategy and speed-to-lead CRM workflow designed for your operations.
                </p>
              </div>

              <form onSubmit={handleGenerateBlueprint} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-[#0A0A0B]/60 p-4 sm:p-6 rounded-2xl border border-white/5">
                <div className="space-y-1.5 col-span-1">
                  <label className="text-xs font-bold text-slate-400 block uppercase tracking-wide font-mono">Business Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., HVAC Technician, Dental Clinic, Yoga Studio"
                    value={blueprintBizType}
                    onChange={(e) => setBlueprintBizType(e.target.value)}
                    className="w-full bg-[#161618] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-xs font-bold text-slate-400 block uppercase tracking-wide font-mono">Main Headache (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Missing calls while in attic, slow booking"
                    value={blueprintChallenges}
                    onChange={(e) => setBlueprintChallenges(e.target.value)}
                    className="w-full bg-[#161618] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-xs font-bold text-slate-400 block uppercase tracking-wide font-mono">Primary Automation Goal</label>
                  <select
                    value={blueprintGoal}
                    onChange={(e) => setBlueprintGoal(e.target.value)}
                    className="w-full bg-[#161618] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium font-sans"
                  >
                    <option value="Autoschedule client calls on my Google Calendar">Auto Bookings</option>
                    <option value="Send custom quote instantly when a website lead comes in">Instantly Quote Leads</option>
                    <option value="Automatically solicit reviews on Google maps from recent jobs">Get Google Reviews</option>
                    <option value="General speed-to-lead nurturing and persistent follow up">Stop Leads Dropping</option>
                  </select>
                </div>

                <div className="col-span-1 md:col-span-3 pt-2">
                  <button
                    type="submit"
                    disabled={blueprintLoading}
                    className="w-full bg-indigo-600 text-white hover:bg-slate-900 font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    {blueprintLoading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span>Sifting business layout variables...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        <span>Generate Custom CRM & Automation Roadmap</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Display AI Strategy Output */}
              <AnimatePresence mode="wait">
                {blueprintResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0E0E10] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-md animate-fade-in"
                  >
                    {blueprintError && (
                      <div className="p-3 bg-indigo-950/40 border border-indigo-900/10 rounded-lg text-xs text-indigo-300 flex items-center space-x-2">
                        <span className="font-bold">Notice:</span>
                        <span>{blueprintError}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-4">
                      <div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block font-mono"> Bespoke Growth Blueprint for:</span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">{blueprintResult.businessType}</h3>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl shrink-0">
                        <span className="text-xxs uppercase tracking-wider text-emerald-400 font-bold block font-mono">Estimated Conversion Uplift</span>
                        <span className="text-xl sm:text-2xl font-black text-emerald-400 leading-tight block mt-0.5">{blueprintResult.estimatedConversionLift}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Web Optimization elements */}
                      <div className="lg:col-span-6 space-y-4 font-sans">
                        <h4 className="font-bold text-sm uppercase tracking-wide text-indigo-400 flex items-center space-x-2">
                          <Code2 className="h-5 w-5 text-indigo-400" />
                          <span>1. High-Converting Web Elements</span>
                        </h4>
                        <div className="space-y-2">
                          {blueprintResult.recommendedWebsiteElements?.map((elem, i) => (
                            <div key={i} className="flex items-start space-x-3 bg-[#161618] border border-white/5 p-3 rounded-xl hover:border-indigo-500/20 transition-all">
                              <span className="bg-indigo-600/20 text-indigo-200 border border-indigo-600/30 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-sm font-light text-slate-350 mt-0.5">{elem}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-[#161618] p-4 rounded-2xl border border-white/5 mt-6">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2 font-mono">
                            <Database className="h-4 w-4 text-slate-500" />
                            <span>Recommended CRM configuration</span>
                          </h5>
                          <p className="text-xs text-slate-400 leading-relaxed font-light">
                            {blueprintResult.crmSetupNotes}
                          </p>
                        </div>
                      </div>

                      {/* Automation flow */}
                      <div className="lg:col-span-6 space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wide text-indigo-400 flex items-center space-x-2 font-sans">
                          <Zap className="h-5 w-5 text-indigo-400" />
                          <span>2. Proposed Speed-To-Lead Automation Sequence</span>
                        </h4>
                        <div className="space-y-4 relative border-l border-white/10 pl-4 ml-3">
                          {blueprintResult.automationSteps?.map((step, i) => (
                            <div key={i} className="relative space-y-1">
                              <div className="absolute -left-[25px] top-1.5 h-4 w-4 rounded-full bg-indigo-500 border-4 border-[#0E0E10] shrink-0"></div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">{step.timing}</span>
                                <span className="text-[10px] bg-[#161618] text-slate-400 py-0.5 px-2 rounded-full border border-white/5 font-mono">Rule {i + 1}</span>
                              </div>
                              <h5 className="font-bold text-sm text-white font-sans">{step.trigger}</h5>
                              <p className="text-xs text-slate-350 leading-relaxed font-light font-sans">{step.action}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-400 text-center sm:text-left font-light">
                        Like this blueprint? We configure and deploy this exact stack for your business.
                      </div>
                      <a
                        href="#quote-form"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-xs"
                      >
                        Implement This Blueprint Now
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CRM Pipeline Simulator Sandbox */}
        <section id="crm-sandbox" className="space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold tracking-wide uppercase mb-3 font-mono">
              <Database className="h-3.5 w-3.5" />
              <span>Interactive Simulator Sandbox</span>
            </div>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white">
              Live Testing Ground: Try Our Lead Auto-Responder!
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 font-light">
              Test how the automation sequence fires under actual conditions. Feel free to input a mock client contact below to see the lead instantly populate in our simulation CRM and go through chronological webhook trigger tests!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Simulator Form Entry inside the grid */}
            <div className="lg:col-span-5 bg-[#161618] rounded-2xl border border-white/5 p-6 shadow-2xl self-start space-y-6">
              <div className="pb-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-bold text-white text-sm uppercase tracking-wide">1. Submit Sandbox Lead</span>
                <span className="text-xs text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full font-bold font-mono">Try It Live</span>
              </div>

              <form onSubmit={(e) => handleSubmitLead(e, true)} className="space-y-4 font-sans">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase font-mono">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Arthur Dent"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase font-mono">Industry</label>
                    <select
                      value={simBizType}
                      onChange={(e) => setSimBizType(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                    >
                      <option value="HVAC Repair">HVAC / Trades</option>
                      <option value="Dentist Clinic">Dentist Clinic</option>
                      <option value="Legal Practice">Legal Practice</option>
                      <option value="Boutique Gym">Boutique Gym</option>
                      <option value="Catering Service">Catering Service</option>
                      <option value="General Builder">Builder / Roofing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block uppercase font-mono">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., testcustomer@earth.com"
                    value={simEmail}
                    onChange={(e) => setSimEmail(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-505 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase font-mono">Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g., 555-4000"
                      value={simPhone}
                      onChange={(e) => setSimPhone(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-505 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase font-mono">Company / Shop</label>
                    <input
                      type="text"
                      placeholder="e.g., Dent Repairs"
                      value={simBizName}
                      onChange={(e) => setSimBizName(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-505 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block uppercase font-mono">User Message / Quote Request</label>
                  <textarea
                    rows={2}
                    placeholder="e.g., My rooftop unit is making a loud squealing noise. Need someone tomorrow afternoon to repair..."
                    value={simMessage}
                    onChange={(e) => setSimMessage(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-505 transition-all placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={simulating !== null}
                  className="w-full bg-indigo-650 text-white hover:bg-[#161618] border border-white/5 font-semibold py-2 px-4 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center space-x-2 disabled:bg-slate-800 disabled:text-slate-500 cursor-pointer"
                >
                  <Zap className="h-4 w-4" />
                  <span>Submit Form & Run Sandbox Auto-Responder</span>
                </button>
              </form>
            </div>

            {/* Simulated Live CRM Inbox */}
            <div className="lg:col-span-7 bg-[#161618] text-white rounded-2xl border border-white/5 shadow-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[480px]" id="crm-inbox-simulator">
              
              {/* Inbox Leads Column */}
              <div className="md:col-span-5 flex flex-col border-r border-white/5 pr-0 md:pr-4 h-full">
                <div className="pb-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-1 font-mono">
                    <Users className="h-3.5 w-3.5 text-indigo-450" />
                    <span>Pipeline Leads</span>
                  </span>
                  <button
                    onClick={handleResetLeads}
                    className="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                    title="Reload default leads"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span className="font-mono">Reset</span>
                  </button>
                </div>

                {leadsLoading ? (
                  <div className="flex-grow flex items-center justify-center py-10">
                    <RefreshCw className="h-5 w-5 animate-spin text-indigo-500" />
                  </div>
                ) : (
                  <div className="flex-grow overflow-y-auto space-y-2 mt-3 max-h-[380px] pr-1">
                    {leads.map((lead) => {
                      const isSim = simulating === lead.id;
                      const isSelected = selectedLead?.id === lead.id;
                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-3 rounded-lg cursor-pointer transition-all border text-left ${
                            isSelected
                              ? "bg-[#0A0A0B] border-indigo-500/50"
                              : "bg-[#0E0E10] border-white/5 hover:bg-white/5 hover:border-white/10"
                          } relative`}
                        >
                          {isSim && (
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate pr-2">{lead.name}</span>
                            <span className="text-[9px] text-slate-500 shrink-0 font-mono">
                              {new Date(lead.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          <div className="font-mono text-[9px] text-slate-400 truncate mt-0.5">{lead.businessName}</div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-indigo-400 font-medium font-sans">{lead.businessType}</span>
                            <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold font-mono ${
                              lead.status === "new" ? "bg-rose-500/10 text-rose-400" :
                              lead.status === "replied" ? "bg-teal-500/10 text-teal-400" :
                              "bg-[#161618] text-slate-400 border border-white/5"
                            }`}>
                              {isSim ? "Processing" : lead.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Lead Sandbox details and automation simulation timeline */}
              <div className="md:col-span-7 flex flex-col justify-between h-full bg-[#0A0A0B] p-4 rounded-xl border border-white/5 font-mono">
                {selectedLead ? (
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="pb-3 border-b border-white/5 flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white overflow-hidden truncate max-w-[200px]">{selectedLead.name}</h4>
                          <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">{selectedLead.email}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-indigo-400 bg-indigo-950/40 border border-indigo-900/10 px-2 py-0.5 rounded">CRM Sandbox Node</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-3">
                        <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Inbound Customer Message:</span>
                        <p className="text-[11px] text-slate-400 line-clamp-3 bg-white/[0.02] p-2 rounded leading-normal border border-white/5 font-light italic">
                          "{selectedLead.message}"
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Chronological Automation Webhook Log:</span>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {selectedLead.timeline?.map((evt, i) => {
                          const isLeadSimulating = simulating === selectedLead.id;
                          // If current lead is running through simulation, show sequential milestones
                          const isShowing = !isLeadSimulating || (isLeadSimulating && i < activeSimProgress);
                          const isSimCurrent = isLeadSimulating && i === activeSimProgress - 1;

                          return (
                            <div
                              key={evt.id}
                              className={`p-2 rounded text-xs transition-all border ${
                                isShowing
                                  ? isSimCurrent
                                    ? "bg-indigo-950/20 border-indigo-500/20 text-white"
                                    : "bg-white/[0.01] border-white/5 text-slate-300"
                                  : "opacity-15 bg-transparent border-transparent text-slate-600"
                              } flex items-start space-x-2.5`}
                            >
                              <div className="mt-1">
                                {isShowing && !isSimCurrent ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                ) : isShowing && isSimCurrent ? (
                                  <RefreshCw className="h-3.5 w-3.5 text-indigo-550 animate-spin shrink-0" />
                                ) : (
                                  <div className="h-3.5 w-3.5 rounded-full bg-[#161618] border border-white/10 shrink-0" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <strong className="text-[11px] font-medium text-slate-200">{evt.label}</strong>
                                  <span className="text-[8px] bg-[#161618] border border-white/5 text-slate-500 px-1 py-0.5 rounded font-mono shrink-0">{evt.time} delay</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5 leading-normal shrink-0 overflow-hidden truncate">
                                  {evt.detail}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-2">
                    <Database className="h-8 w-8 text-neutral-800" />
                    <span className="text-xs font-mono">No simulation node selected. Click on a contact inside the list.</span>
                  </div>
                )}

                {/* Automation highlight indicator footer */}
                <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500 flex items-center justify-between mt-3 bg-[#0A0A0B]">
                  <span>Engine: Node v20 + Express Webhooks</span>
                  <span className="text-emerald-500 flex items-center space-x-1 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>AUTOMATIONS FULLY CONFIGURED</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Consulting Business Capabilities & Services section */}
        <section id="services-breakdown" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-sans font-bold text-3xl text-white">
              Complete Digital Setup for Modern Small Businesses
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              We handle the implementation from start to finish. You focus on serving clients; we keep your appointment schedule fully loaded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#161618] p-6 rounded-2xl border border-white/5 shadow-2xl space-y-4">
              <div className="bg-indigo-500/10 text-indigo-400 p-3.5 rounded-xl inline-block">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Speed-Optimized Website Setup</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                We build blazingly fast, mobile-friendly landing pages and local service sites. No bloated page builders. Just clean code tailored to capture phone numbers, emails, and service requests instantly.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 font-light font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Google Lighthouse Performance Score 95+</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Interactive floating high-fidelity CTAs</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#161618] p-6 rounded-2xl border border-white/5 shadow-2xl space-y-4">
              <div className="bg-indigo-500/10 text-indigo-400 p-3.5 rounded-xl inline-block">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-white">CRM Platform Deployment</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                We onboard your team to friendly, affordable CRM platforms like HubSpot Free, Brevo, or ActiveCampaign. Stop storing business client contacts in messy SMS history, notebooks, or scattered folders.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 font-light font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Visual pipeline mapping for service stages</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Automated standard field categorization</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#161618] p-6 rounded-2xl border border-white/5 shadow-2xl space-y-4">
              <div className="bg-indigo-500/10 text-indigo-400 p-3.5 rounded-xl inline-block">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Speed-To-Lead Automation</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                We implement automated webhooks, custom API connections, and communication loops. Create immediate text & email confirmation drips when a customer files a form, and automate task assignment for staff.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 font-light font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Twilio auto-SMS lookup reminders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Cal.com, Calendly or HubSpot booking loops</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Submission Node (Consultation Form) */}
        <section id="quote-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <div className="lg:col-span-12">
            <div className="bg-[#161618] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Branding Left panel */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold tracking-wide uppercase font-mono">
                      <Mail className="h-3.5 w-3.5" />
                      <span>Request consultation</span>
                    </div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white">
                      Let's Automate Your Marketing Operations
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
                      Ready to upgrade your website, organize your inquiries, and close jobs instantly? Send us your project parameters and book a 15-minute quick strategy call.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-3 text-slate-300">
                      <div className="p-2 bg-[#0A0A0B] border border-white/5 rounded-lg">
                        <Users className="h-4.5 w-4.5 text-indigo-400" />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-500 font-medium font-mono">Operations Leader</span>
                        <span className="text-sm font-semibold text-white">Benjamin Batya</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-300">
                      <div className="p-2 bg-[#0A0A0B] border border-white/5 rounded-lg">
                        <Mail className="h-4.5 w-4.5 text-indigo-400" />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-500 font-medium font-mono">Email Inquiry</span>
                        <span className="text-sm font-semibold text-white">benjaminbatya@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Form Panel */}
                <div className="lg:col-span-7 bg-[#0A0A0B] p-6 sm:p-8 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-white text-base mb-4 uppercase tracking-wider font-sans">
                    2. Get Started - Book Inquiry
                  </h4>

                  <AnimatePresence mode="wait">
                    {consultSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#0E0E10] border border-emerald-500/20 p-6 rounded-xl text-center space-y-4"
                      >
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full h-12 w-12 flex items-center justify-center mx-auto text-emerald-400">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-white">Consultation Request Pushed to Live CRM Node!</h4>
                        <p className="text-sm text-slate-400 leading-normal font-light">
                          Your request was successfully saved. Scroll up to the **Interactive Simulator Inbox Sandbox** to see your company name and watch the chronological lead-responder engine process your webhook timeline!
                        </p>
                        <button
                          onClick={() => setConsultSuccess(false)}
                          className="bg-indigo-600 hover:bg-slate-900 border border-white/5 text-white font-medium px-4 py-2 rounded-lg text-xs cursor-pointer"
                        >
                          Submit Another Call Request
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={(e) => handleSubmitLead(e, false)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Your Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rachel Cooper"
                              value={consultName}
                              onChange={(e) => setConsultName(e.target.value)}
                              className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all font-medium"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Business Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. rachel@cooperdental.com"
                              value={consultEmail}
                              onChange={(e) => setConsultEmail(e.target.value)}
                              className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Phone Number (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. 555-0144"
                              value={consultPhone}
                              onChange={(e) => setConsultPhone(e.target.value)}
                              className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Company Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Cooper Dental Care"
                              value={consultBusiness}
                              onChange={(e) => setConsultBusiness(e.target.value)}
                              className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Select Business Category</label>
                          <select
                            value={consultType}
                            onChange={(e) => setConsultType(e.target.value)}
                            className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all cursor-pointer font-medium"
                          >
                            <option value="Medical / Dental Clinic">Medical / Dental Clinic</option>
                            <option value="Home Services Trades">Home Services (HVAC, Plumbing, Roofing)</option>
                            <option value="Professional Practice">Professional Practice (Legal, Accounting)</option>
                            <option value="Local Agency">Local Creative / Marketing Agency</option>
                            <option value="Local Storefront">Brick & Mortar Merchant / Retail</option>
                            <option value="Other Service Enterprise">Other Small Service Enterprise</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-405 uppercase tracking-wider font-mono">Project Scope & Operational Pain</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly state your challenges (e.g., current website is outdated and slow, losing phone call leads, wanting automated booking options)."
                            value={consultMessage}
                            onChange={(e) => setConsultMessage(e.target.value)}
                            className="w-full bg-[#161618] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-505 transition-all placeholder:text-slate-600 font-light"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={consultSubmitting}
                          className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:bg-[#161618] disabled:text-slate-500 cursor-pointer font-sans"
                        >
                          {consultSubmitting ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>Pushed database nodes...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4" />
                              <span>Submit Request & Run Pipeline Demonstration</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Structured Clean Footer */}
      <footer className="bg-[#0A0A0B] text-slate-500 border-t border-white/5 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div className="flex items-center space-x-3 text-white">
              <Zap className="h-5 w-5 text-indigo-400" />
              <span className="font-sans font-bold text-lg tracking-tight">Web & Lead Automation Consulting</span>
            </div>
            <div className="text-xs text-slate-600 text-center sm:text-right font-mono">
              Operational Delivery by Benjamin Batya • Available Nationwide
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-550 gap-4">
            <div>
              &copy; {new Date().getFullYear()} Web & Automation Consulting Studio. Built on modern React + Tailwind components.
            </div>
            <div className="flex space-x-6">
              <a href="#roi-calculator" className="hover:text-slate-300 transition-colors">ROI Estimator</a>
              <a href="#crm-sandbox" className="hover:text-slate-300 transition-colors">Sandbox Playground</a>
              <a href="#blueprint-generator" className="hover:text-slate-300 transition-colors font-sans">AI Plan Creator</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
