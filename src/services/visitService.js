import api from "./api";

export const visitService = {
  async getAll() {
    const response = await api.get("/items/visits", {
      params: {
        fields: "id,visit_date,status,patient,doctor",
        sort: "-visit_date",
        limit: 100,
      },
    });

    return response.data.data;
  },
};