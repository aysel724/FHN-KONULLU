const validateRequired = (value) => !!value && !!value.length;
const validateFields = (fields, values) => {
  const errors = {};
  fields.forEach((field) => {
    if (!validateRequired(values[field.name])) {
      errors[field.name] = field.message;
    }
  });

  return errors;
};
// phoneNumber1
//docs
//volunteer
function validateUser(values) {
  const fields = [
    { name: "name", message: "Ad boş qala bilməz" },
    { name: "priority", message: "Prioritet boş qala bilməz" },
    { name: "email", message: "E-poçt boş qala bilməz" },
    { name: "role", message: "Rol boş qala bilməz" },
    { name: "languageLevel", message: "Dil səviyyəsi boş qala bilməz" },
    { name: "computerSkillDegree", message: "Komputer bilik səviyyəsi boş qala bilməz" },
    { name: "firstName", message: "Ad boş qala bilməz" },
    { name: "insurance", message: "Sığorta boş qala bilməz" },
    { name: "trainings", message: "Təlimlər boş qala bilməz" },
    { name: "result", message: "Nəticə boş qala bilməz" },
    { name: "startDate", message: "Başlama tarixi boş qala bilməz" },
    { name: "finishDate", message: "Bitmə tarixi boş qala bilməz" },
    { name: "personInCharge", message: "Məsul şəxs boş qala bilməz" },
  ];

  return validateFields(fields, values);
}