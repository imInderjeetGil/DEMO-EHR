
import api from "./api";

export const labReportService = {
  async getAll() {
    const response = await api.get("/items/lab_reports", {
      params: {
        fields: [
          "id",
          "test_name",
          "test_date",
          "result_summary",
          "status",
          "notes",
          "file",
          "patient.id",
          "patient.patient_code",
          "patient.first_name",
          "patient.last_name",
          "visit.id",
        ].join(","),
        sort: "-test_date",
        limit: 100,
      },
    });

    return response.data.data || [];
  },
};
