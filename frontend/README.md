# Frontend

The nurse-facing interface for **Brie**, a simulated hospital EHR with AI-assisted clinical context and shift handoff.

## Stack

- React
- Vite
- React Router
- Supabase
- JavaScript
- CSS

## Pages

| Page | Purpose |
| --- | --- |
| Dashboard | Ward overview and assigned patients |
| Patients | Patient list |
| Patient Chart | Observations, medications, orders, and notes |
| Shift Handoff | AI-generated handoff and patient priorities |
| OR Report | Simulated operating-room workflow |
| Phone | Simulated hospital phone workflow |

## Handoff Workflow

```text
Nurse opens Handoff
        ↓
Frontend → FastAPI
        ↓
Handoff Agent
        ↓
Context Agent
        ↓
Validated handoff
        ↓
Frontend displays results
```

The frontend is responsible for presentation. Agent orchestration and EHR access are handled by the backend.

## Backend Connection

The frontend communicates with the FastAPI gateway:

```text
http://localhost:8000
```

Main AI endpoint:

```text
POST /api/handoff
```

Example:

```json
{
  "nurse_id": 1,
  "purpose": "shift_handoff"
}
```