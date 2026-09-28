
import api from "./api";

export const patientService = {
  async getAll() {
    const response = await api.get("/items/patients", {
      params: {
        fields: [
          "id",
          "patient_code",
          "first_name",
          "last_name",
          "date_of_birth",
          "gender",
          "phone_no",
          "email",
          "city",
          "state",
          "blood_group",
          "profile_image",
        ].join(","),
        sort: "-id",
      },
    });

    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/items/patients/${id}`);

    return response.data.data;
  },
};
