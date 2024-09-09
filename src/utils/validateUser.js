
// import { validationMessages, fieldConfigs } from '../utils/validationMessage';

  const validateRequired = (value) => {
  // Ensure that value is a string or can be treated as such
  if (typeof value !== 'string') {
    return false;
  }
  return value.length > 0;
};
export function validateFHNVolunterActivity(values) {
  const errors = {};
  errors.startDate = !validateRequired(values.startDate || "")
    ? "Başlama tarixi tələb olunur"
    : "";
  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }
  if(validateRequired(values.endDate)){
    errors["mesVoluntaryActivityEndReason.name"] = !validateRequired(values["mesVoluntaryActivityEndReason.name"] || "")
      ? "Fəaliyyətin bitmə səbəbi tələb olunur"
      : "";
  }
  return errors;
}


export function validateLaborActivity(values) {
  const errors = {};

  // Gerekli alanları kontrol et
  errors.workplace = !validateRequired(values.workplace || "")
    ? "İş yeri tələb olunur"
    : "";

  errors.position = !validateRequired(values.position || "")
    ? "Vəzifə tələb olunur"
    : "";

  errors.startDate = !validateRequired(values.startDate || "")
    ? "Başlama tarixi tələb olunur"
    : "";

  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }

 

  return errors;
}

export function validateLanguageLevel(values){
  const errors = {};
  errors["languageName.name"] = !validateRequired(values["languageName.name"] || "")
  ? "Dil boş qala bilməz"
  : "";
  errors["languageProficiencyLevel.name"] = !validateRequired(values["languageProficiencyLevel.name"] || "")
  ? "Bilik səviyyəsi boş qala bilməz"
  : "";
 return errors
}

export function validateInsurance(values) {
  const errors = {};
  errors.insuranceCompanyId = !validateRequired(values.insuranceCompanyId || "")
  ? "Sığorta şirkətinin adı tələb olunur"
  : "";
  errors.startDate = !validateRequired(values.startDate || "")
    ? "Başlama tarixi tələb olunur"
    : "";
  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }
 
  return errors;
}

export function validateContract(values) {
  const errors = {};
  errors.number = !validateRequired(values.number || "")
  ? "Müqavilə nömrəsi tələb olunur"
  : "";
  errors.startDate = !validateRequired(values.startDate || "")
    ? "Başlama tarixi tələb olunur"
    : "";
  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }
 
  return errors;
}

export function validateVolunterActivity(values) {
  const errors = {};

  // Gerekli alanları kontrol et
  errors.name = !validateRequired(values.name || "")
    ? "Könüllük fəaliyyətin adı tələb olunur"
    : "";


  errors.startDate = !validateRequired(values.startDate || "")
    ? "Başlama tarixi tələb olunur"
    : "";

  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }

  errors.description = !validateRequired(values.description || "")
  ? "Məzmun tələb olunur"
  : ""; 
  errors.interestOfVoluntryField = !validateRequired(values.interestOfVoluntryField || "")
  ? "Maraq göstərilən sahə tələb olunur"
  : ""; 

 

  return errors;
}

export function validateStaff(values){
  const errors = {};
  errors.staff = !validateRequired(values.staff || "")
  ? "Əşya və ya ləvazimatların növü   tələb olunur"
  : "";
  errors.startDate = !validateRequired(values.startDate || "")
  ? "Başlama tarixi tələb olunur"
  : "";
  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }
  return errors 
}
export function validateElectronDocument(values){
  const errors = {};
  errors.name = !validateRequired(values.name || "")
  ? "Sənədin adı tələb olunur"
  : "";
  errors.electronicDocumentType = !validateRequired(values.electronicDocumentType || "")
  ? "Sənədin növü tələb olunur"
  : "";
  errors.fileName = !validateRequired(values.fileName || "")
  ? "Sənədin növü tələb olunur"
  : "";

  return errors 
}

export function validateEducation(values){
  const errors = {};
  errors["educationType.name"] = !validateRequired(values["educationType.name"] || "")
  ? "Təhsilin tipi  tələb olunur"
  : "";
  errors.startDate = !validateRequired(values.startDate || "")
  ? "Başlama tarixi tələb olunur"
  : "";
  if (validateRequired(values.endDate)) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.endDate = "";
    }
  } else {
    errors.endDate = "";
  }
  return errors 
}