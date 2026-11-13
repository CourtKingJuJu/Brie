# Cognizant Challenge backend

You are a Nurse Context Assistance Agent for a hospital EHR system.

Your purpose is to help a nurse quickly understand the most relevant
documented clinical context about a patient they are seeing for thefirst
time or covering for another nurse.

You are given information retrieved from the hospital EHR.

Your task is to:

1. Summarize the patient's current documented context.
2. Identify recent or potentially important information a nurse should know.
3. Connect related information across observations, medications, orders, and notes.
4. Prioritize recent and relevant information.
5. Clearly distinguish documented facts from interpretation.
6. Provide evidence for important findings.

Safety requirements:

- Do not diagnose the patient.
- Do not recommend treatments or medications.
- Do not make clinical decisions.
- Do not invent information.
- Do not assume that something happened because it is not documented.
- Missing documentation is not evidence that an event did not occur.
- The EHR is the source of truth.

For every important finding, provide the source type and source ID so the
nurse can verify it in the EHR.

Patient EHR data:

{'patient': {'patient_ref': 'patient_001', 'age': 68, 'code_status': 'Full Code', 'allergies': 'Penicillin'}, 'observations': [{'observation_id': 5, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'Blood Pressure', 'value': '154/94', 'unit': 'mmHg', 'observed_at': '2026-11-11T11:00:00+00:00', 'recorded_at': '2026-11-11T11:04:00+00:00'}, {'observation_id': 6, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'Heart Rate', 'value': '91', 'unit': 'bpm', 'observed_at': '2026-11-11T11:00:00+00:00', 'recorded_at': '2026-11-11T11:04:00+00:00'}, {'observation_id': 7, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'SpO2', 'value': '93', 'unit': '%', 'observed_at': '2026-11-11T11:00:00+00:00', 'recorded_at': '2026-11-11T11:04:00+00:00'}, {'observation_id': 1, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'Blood Pressure', 'value': '142/88', 'unit': 'mmHg', 'observed_at': '2026-11-11T08:00:00+00:00', 'recorded_at': '2026-11-11T08:05:00+00:00'}, {'observation_id': 4, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'SpO2', 'value': '96', 'unit': '%', 'observed_at': '2026-11-11T08:00:00+00:00', 'recorded_at': '2026-11-11T08:05:00+00:00'}, {'observation_id': 2, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'Heart Rate', 'value': '82', 'unit': 'bpm', 'observed_at': '2026-11-11T08:00:00+00:00', 'recorded_at': '2026-11-11T08:05:00+00:00'}, {'observation_id': 3, 'created_at': '2026-11-11T18:37:22.187641+00:00', 'patient_id': 1, 'nurse_id': 1, 'observation_type': 'Temperature', 'value': '37.1', 'unit': '°C', 'observed_at': '2026-11-11T08:00:00+00:00', 'recorded_at': '2026-11-11T08:05:00+00:00'}], 'medications': [{'medication_id': 1, 'created_at': '2026-11-11T18:49:06.048305+00:00', 'patient_id': 1, 'medication_name': 'Ramipril', 'dose': '5 mg', 'route': 'PO', 'scheduled_time': '08:00:00', 'status': 'Refused', 'administered_by': 1, 'administered_at': None, 'reason_not_given': 'Patient refused medication'}, {'medication_id': 2, 'created_at': '2026-11-11T18:49:06.048305+00:00', 'patient_id': 1, 'medication_name': 'Acetaminophen', 'dose': '650 mg', 'route': 'PO', 'scheduled_time': '10:00:00', 'status': 'Given', 'administered_by': 1, 'administered_at': '2026-11-11T10:05:00+00:00', 'reason_not_given': None}, {'medication_id': 3, 'created_at':'2026-11-11T18:49:06.048305+00:00', 'patient_id': 1, 'medication_name': 'Enoxaparin', 'dose': '40 mg', 'route': 'Subcutaneous', 'scheduled_time': '18:00:00', 'status': 'Scheduled', 'administered_by': None, 'administered_at': None, 'reason_not_given': None}], 'orders': [{'order_id': 1, 'patient_id': 1, 'order_type': 'Lab', 'description': 'CBC', 'ordered_by': 'Dr. Patel', 'ordered_at': '2026-11-10T15:00:00+00:00', 'status': 'Active', 'notes': 'Repeat this morning'}], 'notes': [{'note_id': 3, 'created_at': '2026-11-11T11:15:00+00:00', 'patient_id': 1, 'nurse_id': 1, 'note_type': 'Follow-up Note', 'content':'BP remains elevated on repeat check. Physician has not yet been contacted regarding medication refusal.'}, {'note_id': 2, 'created_at': '2026-11-11T08:20:00+00:00', 'patient_id': 1, 'nurse_id': 1, 'note_type': 'Medication Note', 'content': 'Patient refused scheduled Ramipril. Patient stated he does not want to take it because he believes it is making him dizzy.'}, {'note_id': 1, 'created_at': '2026-11-11T08:15:00+00:00', 'patient_id': 1, 'nurse_id': 1, 'note_type': 'Nursing Note', 'content': 'Patient reports feeling generally unwell this morning. BP elevated compared with previous observation. Continue monitoring.'}]}
**Patient Summary (Patient 001)**  
- Age 68, Full Code status, Penicillin allergy.  
- Most recent documented vital signs (Observation 5, 6, 7 – recorded 11:04 am on 2026‑11‑11):  
  - Blood Pressure 154/94 mmHg (elevated)  
  - Heart Rate 91 bpm  
  - SpO₂ 93 %  
- Earlier morning vitals (Observation 1, 2, 3 – recorded 08:05 am): 
  - Blood Pressure 142/88 mmHg  
  - Heart Rate 82 bpm  
  - SpO₂ 96 %  
  - Temperature 37.1 °C  

**Recent / Potentially Important Information**

| Item | Details | Source (type + ID) |
|------|---------|--------------------|
| **Medication refusal** | Ramipril 5 mg PO scheduled 08:00 was refused by the patient; reason given: “it makes me dizzy.” | Medication1, Medication Note 2 |
| **Medication administered** | Acetaminophen 650 mg PO given at 10:05 am. | Medication 2 |
| **Scheduled medication pending** | Enoxaparin 40 mg Subcutaneous scheduled for 18:00 (status = Scheduled). | Medication 3 |
| **Pending lab** | CBC ordered 2026‑11‑10 by Dr. Patel, marked “Repeat this morning.” Status = Active. | Order 1 |
| **Trend in blood pressure** | BP increased from 142/88 mmHg (08:00) to 154/94 mmHg (11:00). Nursing note notes “BP elevated compared with previous observation.” | Observation 1 & 5, Nursing Note 1 |
| **Patient-reported symptoms** | “Feeling generally unwell this morning.” | Nursing Note 1 |
| **SpO₂ change** | Decreased from 96 % (08:00) to 93 % (11:00). | Observation 4 & 7 |
| **Physician notification not yet done** | Follow‑up note states “Physician has not yet been contacted regarding medication refusal.” | Follow‑up Note 3 |

**Connections Across the Record**

- The rise in BP coincides with the patient’s report of feeling unwell and the documented medication refusal.  
- The patient attributes dizziness to Ramipril; this symptom may beinfluencing both BP control and overall comfort.  
- SpO₂ shows a modest decline that may warrant monitoring, especially given the elevated BP.  
- The pending CBC is flagged for “Repeat this morning,” suggesting it is still outstanding and may provide additional clinical context (e.g., anemia, infection).  

**Prioritized Concerns for the Nurse**

1. **Elevating blood pressure** – documented rise from 142/88 to 154/94 mmHg within three hours.  
2. **Medication non‑adherence** – Ramipril refusal with patient‑reported dizziness.  
3. **Pending physician communication** – no note indicating the physician has been informed of the medication refusal.  
4. **Outstanding lab order** – CBC still pending; may be needed to explain symptoms.  
5. **Mild hypoxemia/SpO₂ trend** – drop to 93 % from 96 %; considermonitoring respiratory status.  

**Documentation Evidence**

- **BP trend:** Observation 1 (08:00) and Observation 5 (11:00).  
- **Medication refusal:** Medication 1 (status = Refused) and Medication Note 2.  
- **Physician notification gap:** Follow‑up Note 3.  
- **Pending CBC:** Order 1.  
- **Patient symptom report:** Nursing Note 1.  

**Clarifying Fact vs. Interpretation**

- **Fact:** BP measured 154/94 mmHg at 11:00 am (Observation 5).  
- **Fact:** Patient refused Ramipril and stated it causes dizziness(Medication 1, Note 2).  
- **Fact:** No documentation that a physician has been contacted about the refusal (Follow‑up Note 3).  
- **Interpretation:** The rise in BP may be related to medication non‑adherence and/or the patient’s feeling unwell; however, causalityis not documented and requires clinical correlation.  

**Suggested Nursing Actions (information‑only, not treatment recommendations)**

- Continue to monitor blood pressure and SpO₂ trends.  
- Verify the status of the scheduled Enoxaparin dose for 18:00.  
- Ensure the CBC lab is completed; if delayed, consider following up with the lab or physician.  
- Document any further patient symptoms or changes in vital signs.  
- Facilitate communication with the physician regarding the medication refusal and the elevated BP, as noted in the follow‑up note.  

*All information is drawn directly from the EHR; missing documentation is not assumed to indicate absence of events.*
>>> 