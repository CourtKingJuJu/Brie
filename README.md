# Brie

> An agentic clinical context and handoff system designed to reduce redundant chart review while keeping nurses in control.

Brie is a multi-agent AI system built for the **Cognizant brAInstorm Challenge**. It operates within a simulated hospital EHR and helps nurses quickly understand the most relevant documented information across their assigned patients.

The system is designed around a simple principle:

**AI assists with clinical context — it does not make clinical decisions.**

---

## Overview

During a shift, nurses may need to review several patient charts quickly, including patients they are taking over from another nurse. Important information can be scattered across observations, medications, orders, and notes.

Brie addresses this by using specialized AI agents to:

- Gather documented patient context
- Identify important relationships across EHR records
- Prepare concise patient summaries
- Prioritize patients for review
- Prepare shift handoff briefings
- Provide traceable evidence back to the EHR
- Maintain strict boundaries around what AI agents are allowed to access

The **EHR remains the source of truth** and the nurse remains the decision maker.

---

## Key Features

### AI-Assisted Patient Context

The **Context Agent** reviews a patient's documented EHR information and produces:

- A concise patient summary
- Important documented context
- Evidence linking findings back to specific EHR records

### Multi-Agent Handoff

The **Handoff Agent** coordinates the shift handoff workflow.

Rather than accessing patient records directly, it:

1. Retrieves the nurse's assigned patients
2. Delegates patient-context retrieval to the Context Agent
3. Combines the resulting patient contexts
4. Generates a concise shift briefing
5. Assigns a suggested review priority
6. Returns evidence supporting the priority

### Review Prioritization

Patients are categorized as:

- **Review First** — multiple or particularly important documented items warrant earlier review
- **Procedure** — a scheduled procedure or other time-sensitive documented event is present
- **Routine** — no specific documented reason for earlier review

These are **review priorities, not clinical recommendations**.

### Evidence Traceability

AI-generated findings include references to the underlying EHR records:

```text
observation #8
medication #3
note #12
order #5
```

This allows the nurse to trace AI-generated context back to documented information.

### Security & Reliability

Brie includes an explicit security boundary between agents and the EHR.

The gateway provides:

- Agent authentication
- Agent-specific permissions
- Controlled tool access
- Resource authorization
- Input validation
- Audit logging
- Structured output validation
- Error handling and failure isolation

## Agent Responsibilities

### Handoff Agent

Responsible for the overall handoff workflow.

**Allowed tools:**

- `get_assigned_patients`
- `delegate_to_context_agent`

The Handoff Agent does **not** directly access patient EHR context.

### Context Agent

Responsible for interpreting an individual patient's documented information.

**Allowed tool:**

Allowed tool:

- `get_patient_context`

The Context Agent retrieves the patient's documented observations, medications, orders, and notes through the controlled gateway.

## Getting Started

### Prerequisites

- Node.js
- Python 3
- Supabase project
- Cohere API key

### 1. Clone the repository

```bash
git clone <repository-url>
cd System-Brie
```

### 2. Start the backend

```bash
cd backend

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file containing:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

COHERE_API_KEY=your_cohere_api_key

CONTEXT_AGENT_API_KEY=your_context_agent_key
HANDOFF_AGENT_API_KEY=your_handoff_agent_key
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend runs on:

```text
http://localhost:8000
```

### 3. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```
