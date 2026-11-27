import express from "express";
import cors from "cors";
import path from "path";
<<<<<<< HEAD
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
=======
// import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";


>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Initialize server-side Gemini client if an API key is configured
const geminiApiKey = process.env.GEMINI_API_KEY_1 || process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
=======

// Initialize server-side Gemini client
if (!process.env.GEMINI_API_KEY_1) {
  throw new Error("GEMINI_API_KEY_1 is missing");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_1,
});

// async function startServer() {
  // const app = express();
  // const PORT = 3000;

  app.use(express.json());
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed

  // Vishal's detailed professional resume details for context injection
  const VISHAL_RESUME_CONTEXT = `
You are the AI Assistant representative on Vishal Kumar's personal portfolio website. 
Your tone should be professional, welcoming, highly competent, and smart. Keep your answers clear, concise, and direct.

About Vishal Kumar:
- Name: Vishal Kumar
- Current Role: AI & Full-Stack Developer
- Focus Area: Building AI-powered web applications using Node.js, React, Express, and LLMs (Large Language Models).
- Key Specialties: Prompt Engineering, Agentic Workflows, Retrieval-Augmented Generation (RAG), Fine-Tuning LLMs, Vector Databases (Pinecone, ChromaDB), full-stack development, serverless APIs.
- Location: Uttar Pradesh, India (Open to Remote opportunities worldwide)
- Contact Email: vishalcse340@gmail.com
- GitHub: https://github.com/Vishalkumar79052
- LinkedIn: https://www.linkedin.com/in/vishal-kumar-79052v/
- Facebook: https://www.facebook.com/profile.php?id=100075959205667

His Stack & Core Skills:
- Frontend: React, Next.js, Redux, Tailwind CSS, TypeScript, Vite, motion animations.
- Backend: Node.js, Express, FastAPI (Python), GraphQL, REST APIs.
- Database: PostgreSQL, MongoDB, Pinecone, Redis, DynamoDB.
- AI Frameworks & Tools: Gemini API, LangChain, LlamaIndex, OpenAI API, Hugging Face.
- DevOps / Cloud: AWS Lambda, Docker, GitHub Actions, Vercel, Supabase.

His Experience Highlights:
1. AI & Full-Stack Development Projects (Jan 2025 - Present):
   - Developing AI-powered web applications using Node.js, React, and LLM APIs.
   - Building smart chatbot systems, secure document analysis endpoints, and automation workflows.
   - Exploring practical Retrieval-Augmented Generation (RAG) and prompt engineering optimization.

2. Personal Full-Stack Projects (Jul 2024 - Dec 2024):
   - Built and deployed multiple web applications focusing on frontend development, express APIs, database integration, and session validation.
   - Designed database structures utilizing MongoDB to persist session variables.
   - Practiced stateless authentication, secure JWT issuance, and structured Git repository version tracking.

4. Educational Background:
   - Bachelor of Technology (B.Tech) in Computer Science & Engineering.

Aesthetic / Custom Portfolio details:
<<<<<<< HEAD
- The website features Light & Dark mode with customizable accent palettes and an AI Copilot powered by Gemini.
=======
- He built an interactive "Vector & Semantic Projection Simulator" with custom mathematical computations on his website to demonstrate how LLMs utilize Vector Embeddings and Cosine Proximity for semantic search.
- The website features verified AWS certifications (e.g., AWS Certified Developer, AWS Certified Solutions Architect, and AWS Certified AI Practitioner).
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed

Answer any questions regarding Vishal's skills, experience, or projects. Keep answers focused. Do not hallucinate credentials he doesn't have.
`;

  // API Endpoint: AI Assistant chat route proxying to Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Convert standard messages into generative contents array structure
      const contents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

<<<<<<< HEAD
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured. Set GEMINI_API_KEY_1 or GEMINI_API_KEY in .env or .env.local.",
        });
      }

=======
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
          config: {
            systemInstruction: VISHAL_RESUME_CONTEXT,
            temperature: 0.7,
          },
        });

        return res.json({
          reply: response.text || "I'm sorry, I couldn't process that query.",
        });
      } catch (error: any) {
        console.error("Gemini Internal Error:", error);

        if (String(error).includes("503")) {
          return res.status(503).json({
            error: "Gemini is busy right now. Please try again in a few seconds.",
          });
        }

        return res.status(500).json({
          error: error.message || String(error),
        });
      }
    } catch (outerError: any) {
      console.error("Route parsing error:", outerError);
      return res.status(500).json({ error: "Internal server router issue." });
    }
  });

  // API Endpoint: Contact Form Submission Handler
  app.post("/api/forms/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      console.log(`[Form Submission - Portfolio Contact Form]:`);
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);
      console.log(`Action (Email): Forwarding to vishalcse340@gmail.com`);

      const serviceId = process.env.EMAILJS_SERVICE_ID || "service_sfy1umz";
      const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_wdr79ub";
      const publicKey = process.env.EMAILJS_PUBLIC_KEY;
      const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim() || "2096dd3a-1a4e-4e9b-8352-e80a7584161e";

      let emailJsSent = false;
      let emailJsStatus = "idle";
      let emailJsDetail = "";

      let web3FormsSent = false;
      let web3FormsStatus = "idle";
      let web3FormsDetail = "";

      // Dispatch via Web3Forms
      if (web3FormsKey) {
        try {
          const payload = {
            access_key: web3FormsKey,
            name: name,
            email: email,
            message: message,
            subject: `New Portfolio Message from ${name}`,
            from_name: "Vishal Kumar Portfolio"
          };

          const web3Response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload),
          });

          const web3Result = await web3Response.json();
          if (web3Response.ok && web3Result.success) {
            web3FormsSent = true;
            web3FormsStatus = "success";
            console.log("Web3Forms dispatch succeeded!");
          } else {
            web3FormsStatus = "failed";
            web3FormsDetail = `Web3Forms returned: ${web3Result.message || web3Response.statusText}`;
            console.error(web3FormsDetail);
          }
        } catch (err: any) {
          web3FormsStatus = "error";
          web3FormsDetail = err.message || "Failed to dispatch Web3Forms request";
          console.error("Web3Forms dispatch error:", err);
        }
      }

      // Dispatch via EmailJS
      if (publicKey && publicKey.trim().length > 0) {
        try {
          const payload = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey.trim(),
            template_params: {
              from_name: name,
              from_email: email,
              reply_to: email,
              message: message,
              to_name: "Vishal Kumar"
            }
          };

          const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (emailResponse.ok) {
            emailJsSent = true;
            emailJsStatus = "success";
            console.log("EmailJS dispatch succeeded!");
          } else {
            const errText = await emailResponse.text();
            emailJsStatus = "failed";
            emailJsDetail = `EmailJS API returned ${emailResponse.status}: ${errText}`;
            console.error(emailJsDetail);
          }
        } catch (err: any) {
          emailJsStatus = "error";
          emailJsDetail = err.message || "Failed to dispatch EmailJS API request";
          console.error("EmailJS dispatch error:", err);
        }
      } else {
        emailJsStatus = "skipped_missing_public_key";
        console.log("EmailJS Public Key not detected. Logged locally.");
      }

      res.json({
        success: true,
        message: "Message successfully submitted and processed.",
        deliveryType: "email",
        recipient: "vishalcse340@gmail.com",
        emailJs: {
          sent: emailJsSent,
          status: emailJsStatus,
          detail: emailJsDetail,
          serviceId,
          templateId
        },
        web3Forms: {
          sent: web3FormsSent,
          status: web3FormsStatus,
          detail: web3FormsDetail
        },
        autorespond: {
          fromName: "Vishal Kumar",
          subject: "Thanks for contacting me!",
          message: "Hello! Thank you for reaching out through my portfolio website. I have received your message and will review it shortly."
        },
        submission: {
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      console.error("Form processing error:", error);
      res.status(500).json({ error: error.message || "Failed to process form submission." });
    }
  });

<<<<<<< HEAD
// Start local server with Vite dev middleware (or static dist) when not running on Vercel
async function startLocalServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startLocalServer().catch((err) => {
    console.error("Failed to start local server:", err);
    process.exit(1);
  });
}
=======
  // Serve static assets or mount Vite dev middleware
  // if (process.env.NODE_ENV !== "production") {
  //   const vite = await createViteServer({
  //     server: { middlewareMode: true },
  //     appType: "spa",
  //   });
  //   app.use(vite.middlewares);
  // } else {
  //   const distPath = path.join(process.cwd(), 'dist');
  //   app.use(express.static(distPath));
  //   app.get('*', (req, res) => {
  //     res.sendFile(path.join(distPath, 'index.html'));
  //   });
  // }

  // app.listen(PORT, "0.0.0.0", () => {
  //   console.log(`Server running on port ${PORT}`);
  // });


// startServer();
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed

export default app;