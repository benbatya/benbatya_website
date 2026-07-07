import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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

// In-memory lead tracking
let leads: Lead[] = [
  {
    id: "lead-1",
    name: "Sarah Jenkins",
    email: "sarah@mainstreetbakery.com",
    phone: "555-0123",
    businessName: "Main Street Bakery & Catering",
    businessType: "Local Bakery",
    message: "We need a website, our current page is just a Facebook group. We struggle to organize catering inquiries.",
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    status: "replied",
    timeline: [
      { id: "e1", label: "Lead Captured", time: "0s", detail: "Form submitted on landing page.", status: "success" },
      { id: "e2", label: "Database Sync", time: "2s", detail: "Contact created in CRM database (Demo)", status: "success" },
      { id: "e3", label: "Instant Auto-Email", time: "5s", detail: "Personalized intro + scheduling link sent.", status: "success" },
      { id: "e4", label: "SMS Team Alert", time: "15s", detail: "SMS dispatched to Owner notifying of new Local Bakery lead.", status: "success" },
    ]
  },
  {
    id: "lead-2",
    name: "Jose Rodriguez",
    email: "jose@rodriguez-hvac.com",
    phone: "555-0199",
    businessName: "Rodriguez Heating & AC",
    businessType: "HVAC Services",
    message: "Want to capture service calls instantly. Leads call in while we are on jobs and we lose them to competitors.",
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 24 hours ago
    status: "new",
    timeline: [
      { id: "e1", label: "Lead Captured", time: "0s", detail: "Emergency callout form submitted.", status: "success" },
      { id: "e2", label: "Database Sync", time: "2s", detail: "Contact created, marked as High Priority HVAC lead.", status: "success" },
      { id: "e3", label: "Instant CRM Callback Attempt", time: "10s", detail: "Triggered active ring to dispatcher.", status: "success" },
      { id: "e4", label: "SMS Backup Auto-Reply", time: "1m", detail: "SMS sent to lead: 'Received! Our tech Jose is looking at your request now.'", status: "success" },
    ]
  }
];

// Initialize Gemini SDK lazily
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // If key is empty or default, we will return null to fallback gracefully
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });
};

const app = express();
app.use(express.json());

// API: Get Leads List
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// API: Submit a New Lead (Contact Form with simulator response logic)
app.post("/api/leads", (req, res) => {
  const { name, email, phone, businessName, businessType, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name,
    email,
    phone: phone || "No phone provided",
    businessName: businessName || "Not specified",
    businessType: businessType || "Consulting Goal",
    message: message || "Interested in Website & Automation services.",
    submittedAt: new Date().toISOString(),
    status: "new",
    timeline: [
      {
        id: "e1",
        label: "Lead Captured",
        time: "0s",
        detail: "Form submitted by client on high-performance website.",
        status: "success",
      },
      {
        id: "e2",
        label: "CRM Database Sync",
        time: "1s",
        detail: "Lead parsed and pushed to CRM pipeline sandbox.",
        status: "success",
      },
      {
        id: "e3",
        label: "Instant Email Follow-up",
        time: "5s",
        detail: `Sent professional roadmap pitch to ${email} with calendar booking widget.`,
        status: "success",
      },
      {
        id: "e4",
        label: "Lead SMS Routing",
        time: "10s",
        detail: `Sent SMS alert to lead and consultant: "New ${businessType || "Consulting"} inquiry from ${name}".`,
        status: "success",
      }
    ],
  };

  leads.unshift(newLead);
  res.status(201).json(newLead);
});

// API: Reset lead list to defaults
app.post("/api/leads/reset", (req, res) => {
  leads = [
    {
      id: "lead-1",
      name: "Sarah Jenkins",
      email: "sarah@mainstreetbakery.com",
      phone: "555-0123",
      businessName: "Main Street Bakery & Catering",
      businessType: "Local Bakery",
      message: "We need a website, our current page is just a Facebook group. We struggle to organize catering inquiries.",
      submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      status: "replied",
      timeline: [
        { id: "e1", label: "Lead Captured", time: "0s", detail: "Form submitted on landing page.", status: "success" },
        { id: "e2", label: "Database Sync", time: "2s", detail: "Contact created in CRM database.", status: "success" },
        { id: "e3", label: "Instant Auto-Email", time: "5s", detail: "Personalized intro + scheduling link sent.", status: "success" },
        { id: "e4", label: "SMS Team Alert", time: "15s", detail: "SMS dispatched to Owner notifying of catering lead.", status: "success" },
      ]
    },
    {
      id: "lead-2",
      name: "Jose Rodriguez",
      email: "jose@rodriguez-hvac.com",
      phone: "555-0199",
      businessName: "Rodriguez Heating & AC",
      businessType: "HVAC Services",
      message: "Want to capture service calls instantly. Leads call in while we are on jobs and we lose them to competitors.",
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: "new",
      timeline: [
        { id: "e1", label: "Lead Captured", time: "0s", detail: "Emergency callout form submitted.", status: "success" },
        { id: "e2", label: "Database Sync", time: "2s", detail: "Contact created, marked as High Priority HVAC lead.", status: "success" },
        { id: "e3", label: "Instant CRM Callback Attempt", time: "10s", detail: "Triggered active ring to dispatcher.", status: "success" },
        { id: "e4", label: "SMS Backup Auto-Reply", time: "1m", detail: "SMS sent to lead: 'Received! Our tech Jose is looking at your request now.'", status: "success" },
      ]
    }
  ];
  res.json({ success: true, leads });
});

// API: Generate Customized Small Business Website & CRM Blueprint using Gemini
app.post("/api/generate-blueprint", async (req, res) => {
  const { businessType, currentChallenges, primaryGoal } = req.body;

  if (!businessType) {
    return res.status(400).json({ error: "Business type is required to generate a custom blueprint." });
  }

  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback blueprint if Gemini API key isn't provided or fails initialization
    console.log("Gemini API key is not configured or default. Running fallback generator.");
    
    // Provide a neat, stylized blueprint structure corresponding to their business type
    const mockBlueprints: Record<string, any> = {
      default: {
        businessType: businessType || "Service-Based Business",
        recommendedWebsiteElements: [
          "Interactive intake form capturing key qualification details",
          "One-click calendar scheduling widget synced to mobile alerts",
          "Automated FAQ drop-down to pre-qualify and filter inquiries"
        ],
        crmSetupNotes: "Deploy a nimble CRM tracking pipeline customized with automated stages for captures, followups, and proposal dispatch.",
        automationSteps: [
          {
            trigger: "Prospect submits form on the landing page",
            action: "Instant capture in CRM + Immediate dispatch of bespoke introduction email containing direct calendar invite link.",
            timing: "Immediate (0-5 seconds)"
          },
          {
            trigger: "No appointment booked after 15 minutes",
            action: "Friendly automated SMS check-in: 'Hi [Name], did you have any questions about scheduling? Here is our link.'",
            timing: "15 minutes"
          },
          {
            trigger: "Prospect schedules appointment",
            action: "System updates CRM stage automatically to 'Discovery Appt Metric' & turns off downstream nurturing drips.",
            timing: "Real-time"
          }
        ],
        estimatedConversionLift: "Up to 150% boost by preventing cold follow-ups and reducing human delay from hours to milliseconds."
      }
    };

    const resolved = mockBlueprints.default;
    resolved.businessType = businessType;
    if (primaryGoal) {
      resolved.crmSetupNotes = `HubSpot or Brevo pipeline optimized explicitly to achieve your target: "${primaryGoal}".`;
    }
    
    // Simulate generation latency to make the UI response natural
    await new Promise((resolve) => setTimeout(resolve, 800));
    return res.json(resolved);
  }

  try {
    const prompt = `You are an expert CRM architect and website conversion optimization consultant for small businesses.
Your goal is to design a high-converting, fully automated Lead Flow, Website Layout, and CRM follow-up blueprint for a customer running a small business.

Details of their business:
- Business Type: ${businessType}
- Current Operational Challenges: ${currentChallenges || "Struggling with slow speed-to-lead, disorganized inquiries, and losing prospects to follow-up delays."}
- Primary Business Goal: ${primaryGoal || "Get more qualified bookings automatically and free up hours spent on manual communication."}

You MUST output your response in JSON format. Do not include markdown code block formatting except the pure valid JSON string.
The JSON object must have exactly this TypeScript schema:
{
  "businessType": string,
  "recommendedWebsiteElements": string[], // Choose exactly 3 high-impact specific UI features this business needs on their landing page to convert visitors.
  "crmSetupNotes": string, // Bulletproof summary of how which CRM (HubSpot or Brevo or ActiveCampaign) suits them best and how to configure it.
  "automationSteps": Array<{
    "trigger": string, // Action initiating the automation
    "action": string, // The system response
    "timing": string // When this triggers (e.g., Immediate, 10 mins later, 1 day wait)
  }>, // Exactly 3-4 steps mapping out a pristine "Speed-to-Lead" responder sequence.
  "estimatedConversionLift": string // Inspiring data-driven metric showing why immediate follow-up changes the game for ${businessType}.
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessType: { type: Type.STRING },
            recommendedWebsiteElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            crmSetupNotes: { type: Type.STRING },
            automationSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trigger: { type: Type.STRING },
                  action: { type: Type.STRING },
                  timing: { type: Type.STRING }
                },
                required: ["trigger", "action", "timing"]
              }
            },
            estimatedConversionLift: { type: Type.STRING }
          },
          required: [
            "businessType",
            "recommendedWebsiteElements",
            "crmSetupNotes",
            "automationSteps",
            "estimatedConversionLift"
          ]
        },
        temperature: 0.8
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from Gemini API");
    }

    const data = JSON.parse(text.trim());
    res.json(data);

  } catch (error) {
    console.error("Gemini blueprint generation failed:", error);
    res.status(500).json({
      error: "Failed to generate dynamic plan due to an API error. Rendering professional fallback blueprint.",
      fallback: {
        businessType: businessType,
        recommendedWebsiteElements: [
          "Instant floating Booking Button in a prominent location",
          "Automated Lead qualification form replacing slow quote emails",
          "Client review banner stating actual job times & response speeds"
        ],
        crmSetupNotes: "Implement a lightweight customer tracker synced to an automated scheduling calendar like Cal.com or HubSpot.",
        automationSteps: [
          {
            trigger: "Inquiry submitted on the website",
            action: "Instant welcome email containing dynamic scheduling link sent directly.",
            timing: "Immediate"
          },
          {
            trigger: "Lead does not book within 30 minutes",
            action: "Friendly SMS check-in sent automatically to encourage booking.",
            timing: "30 minutes"
          }
        ],
        estimatedConversionLift: "Recover up to 60% of leads commonly lost to competitor fast responses."
      }
    });
  }
});

async function startServer() {
  const PORT = 3000;

  // Serve static dist folders in prod, or use Vite in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Web & Automation consulting server running on http://localhost:${PORT}`);
  });
}

startServer();
