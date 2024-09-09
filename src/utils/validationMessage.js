
export const validationMessages = {
    required: "Bu sahə tələb olunur",
    dateBefore: "Bitmə tarixi başlama tarixindən əvvəl ola bilməz"
  };
  
  export const fieldConfigs = [
    { accessorKey: "workplace", required: true },
    { accessorKey: "position", required: true },
    { accessorKey: "startDate", required: true },
    { accessorKey: "endDate", required: true, customValidation: (value, values) => {
      if (new Date(value) < new Date(values.startDate)) {
        return validationMessages.dateBefore;
      }
    }},
    { accessorKey: "mesVoluntaryActivityEndReason.name", required: true },
    { accessorKey: "staff", required: true },
    { accessorKey: "start", required: true },
    { accessorKey: "finish", required: true },
    { accessorKey: "note", required: true },
    { accessorKey: "number", required: true }
  ];
  