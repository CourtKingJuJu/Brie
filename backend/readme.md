# Brie Backend

Backend services for **Brie**, an agentic clinical context and handoff system built for the Cognizant brAInstorm Challenge.

## Stack

- Python
- FastAPI
- Pydantic
- Cohere
- Supabase PostgreSQL

## Architecture

```text
Frontend
   │
   ▼
FastAPI Gateway
   │
   ▼
Handoff Agent
   │
   │ delegates
   ▼
Context Agent
   │
   ▼
Gateway Tools
   │
   ▼
EHR / Supabase
```

### Handoff Agent

Coordinates the shift handoff workflow.

- Retrieves assigned patients
- Delegates patient context to the Context Agent
- Generates the shift briefing
- Assigns review priorities
- Returns validated structured output

**Permissions:**

```text
get_assigned_patients
delegate_to_context_agent
```

### Context Agent

Interprets documented information for an individual patient.

- Retrieves patient context
- Generates a concise summary
- Identifies important documented context
- Provides evidence references

**Permission:**

```text
get_patient_context
```

## Gateway & Security

The gateway controls access between agents and the EHR.

- Agent authentication
- Agent-specific permissions
- Controlled tool access
- Pydantic output validation
- Audit logging
- Error handling

Each agent has its own API key.

```text
CONTEXT_AGENT_API_KEY
HANDOFF_AGENT_API_KEY
```

## Tools

Available EHR tools include:

```text
patient_tool
observations_tool
medications_tool
active_orders_tool
recent_notes_tool
patient_context_tool
assigned_patients_tool
```

Agents can only access tools explicitly granted to them.

## API

```text
GET  /
POST /api/context
POST /api/handoff
```

Example handoff request:

```json
{
  "nurse_id": 1,
  "purpose": "shift_handoff"
}
```