
import api from "./api";

const DOCTOR_ID = Number(import.meta.env.VITE_DOCTOR_ID || 1);

export const appointmentService = {
  async getAll() {
    const response = await api.get("/items/appointments", {
      params: {
        "filter[doctor][_eq]": DOCTOR_ID,

        fields: [
          "id",
          "appointment_date",
          "appointment_time",
          "reason",
          "status",
          "patient.id",
          "patient.patient_code",
          "patient.first_name",
          "patient.last_name",
          "patient.profile_image",
          "doctor.id",
          "doctor.first_name",
          "doctor.last_name",
        ].join(","),

        sort: "appointment_date,appointment_time",
        limit: 100,
      },
    });

    return response.data.data || [];
  },
};
