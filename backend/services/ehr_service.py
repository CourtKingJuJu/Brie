# Responsible for actually getting the data from supabase
from supabase import create_client
from dotenv import load_dotenv
import os


load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

supabase = create_client(
    supabase_url,
    supabase_key,
)


def get_patient(patient_id: int):
    response = (
        supabase
        .table("patients")
        .select("*")
        .eq("patient_id", patient_id)
        .single()
        .execute()
    )

    return response.data


def get_recent_observations(patient_id: int):
    response = (
        supabase
        .table("observations")
        .select("*")
        .eq("patient_id", patient_id)
        .order("observed_at", desc=True)
        .execute()
    )

    return response.data


def get_medications(patient_id: int):
    response = (
        supabase
        .table("medications")
        .select("*")
        .eq("patient_id", patient_id)
        .order("scheduled_time")
        .execute()
    )

    return response.data


def get_active_orders(patient_id: int):
    response = (
        supabase
        .table("orders")
        .select("*")
        .eq("patient_id", patient_id)
        .eq("status", "Active")
        .execute()
    )

    return response.data


def get_recent_notes(patient_id: int):
    response = (
        supabase
        .table("notes")
        .select("*")
        .eq("patient_id", patient_id)
        .order("created_at", desc=True)
        .execute()
    )

    return response.data