import { supabase } from "../lib/supabaseClient";

/*
 * Get all patients
 */
export async function getPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("room_number", { ascending: true });

  if (error) {
    console.error("Error fetching patients:", error);
    return [];
  }

  return data;
}


/*
 * Get one patient
 */
export async function getPatient(patientId) {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("patient_id", patientId)
    .single();

  if (error) {
    console.error("Error fetching patient:", error);
    return null;
  }

  return data;
}


/*
 * Get observations for a patient
 */
export async function getPatientObservations(patientId) {
  const { data, error } = await supabase
    .from("observations")
    .select("*")
    .eq("patient_id", patientId)
    .order("observed_at", { ascending: false });

  if (error) {
    console.error("Error fetching observations:", error);
    return [];
  }

  return data;
}


/*
 * Get medications for a patient
 */
export async function getPatientMedications(patientId) {
  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("patient_id", patientId)
    .order("scheduled_time", { ascending: true });

  if (error) {
    console.error("Error fetching medications:", error);
    return [];
  }

  return data;
}


/*
 * Get orders for a patient
 */
export async function getPatientOrders(patientId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("patient_id", patientId)
    .order("ordered_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}


/*
 * Get notes for a patient
 */
export async function getPatientNotes(patientId) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return [];
  }

  return data;
}