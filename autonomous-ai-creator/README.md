# Autonomous AI Creator Platform

A production-quality web application and autonomous agent orchestration framework that turns high-level user goals into fully planned, executed, tested, and verified deliverables.

---

## 🌟 Key Features

1. **Autonomous Planning Engine**: Converts goals into multi-step execution graphs with dependency mapping.
2. **9 Specialized AI Agents**:
   - **Planner Agent**: Decomposes user goals into ordered task trees.
   - **Research Agent**: Performs web searches, extracts competitive intelligence.
   - **Developer Agent**: Generates full-stack frontend & backend code.
   - **Designer Agent**: Produces UI/UX wireframes and Tailwind design tokens.
   - **Writer Agent**: Drafts marketing copy, technical specs, and READMEs.
   - **Data Agent**: Analyzes CSV/JSON datasets, designs DB schemas.
   - **Testing Agent**: Runs automated linting, prop validation, and error checks.
   - **Reviewer Agent**: Audits outputs against quality and security criteria.
   - **Manager Agent**: Central supervisor orchestrating states and tools.
3. **Interactive Human-in-the-Loop**: Approval modals pause execution before destructive or high-impact actions (deployments, deletions, external publish).
4. **Error Recovery & Auto-Retry**: Automatically detects synthetic runtime bugs, analyzes root causes, applies patches, and retries.
5. **Real-Time Execution Interface**: SSE-streamed progress bar, live agent badges, activity tickers, and live terminal log stream.
6. **Visual Task Graph**: Dependency tree visualizer with node inspector.
7. **Visual Workflow Builder**: Interactive drag-and-drop agent pipeline builder.
8. **Provider Abstraction**: Intelligent local Mock AI Provider out-of-the-box, plus drop-in support for Google Gemini, OpenAI, and Anthropic.

---

## 🚀 Quick Start (Run Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Platform (Single Command)
Starts both the Express orchestration backend (`http://localhost:3001`) and the Vite React frontend (`http://localhost:5173`):

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## ⚙️ Connecting Real AI Providers

By default, the platform uses an **Intelligent Mock AI Provider** so you can test all autonomous workflows without API keys.

To connect real AI APIs:
1. Open the **Settings** tab in the UI sidebar.
2. Select your provider (**Google Gemini**, **OpenAI**, or **Anthropic**).
3. Enter your API Key and click **Save Configuration**.

Alternatively, set them in `.env`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```
