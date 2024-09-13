
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
  errors["insuranceCompany.name"] = !validateRequired(values["insuranceCompany.name"] || "")
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
  errors["supplyType.name"] = !validateRequired(values["supplyType.name"] || "")
  ? "Əşya və ya ləvazimatların növü tələb olunur"
  : "";
  errors.receivingDate = !validateRequired(values.receivingDate || "")
  ? "Başlama tarixi tələb olunur"
  : "";
  if (validateRequired(values.handOverDate)) {
    if (new Date(values.handOverDate) < new Date(values.receivingDate)) {
      errors.handOverDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.handOverDate = "";
    }
  } else {
    errors.handOverDate = "";
  }
  return errors 
}
export function validateSport(values){
  const errors = {};
  errors.name = !validateRequired(values.name || "")
  ? "idman növünün adı tələb olunur"
  : "";
  return errors 
}
export function validateTraningTab(values){
  const errors = {};

  errors.name = !validateRequired(values.name || "")
  ? "Təlimin adı tələb olunur"
  : "";
  errors.startDate = !validateRequired(values.startDate || "")
  ? "Başlama tarixi tələb olunur"
  : "";
  if (validateRequired(values.finishDate)) {
    if (new Date(values.finishDate) < new Date(values.startDate)) {
      errors.finishDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz";
    } else {
      errors.finishDate = "";
    }
  } else {
    errors.finishDate = "";
  }
  return errors 
}
export function validateElectronDocument(values) {
  const errors = {};
  errors.name = !validateRequired(values.name || "")
    ? "Sənədin adı tələb olunur"
    : "";
  errors['electronicDocumentType.name'] = !validateRequired(values['electronicDocumentType.name'] || "")
    ? "Sənədin növü tələb olunur"
    : "";
    if (!values.file) {
      errors.file = "Fayl seçilməlidir.";
    } else if (values.file && values.file.name) {
      const validExtensions = ['docx', 'pdf'];
      const fileExtension = values.file.name.split('.').pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        errors.file = "Yalnız .docx və .pdf faylları seçə bilərsiniz.";
      }
    }
    return errors;
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

export function validateOtherSkillls(values){
  const errors = {};
  errors.name = !validateRequired(values.name || "")
  ? "Biliyin adı tələb olunur"
  : "";
 
  return errors 
}
export function validateComputerSkills(values){
  const errors = {};
  errors["computerSkillName.name"] = !validateRequired(values["computerSkillName.name"] || "")
  ? "Bilik boş qala bilməz"
  : "";
  errors["skillLevel.name"] = !validateRequired(values["skillLevel.name"] || "")
  ? "Bilik dərəcəsi boş qala bilməz"
  : "";
  errors.priority = !validateRequired(values.priority || "")
  ? "Prioritet tələb olunur"
  : "";

 return errors
}


export function validateTraning(userData) {
  const newErrors = {};
  if (!userData.departmentInCharge) newErrors.departmentInCharge = "Bu xana boş qala bilməz";
  if (!userData.description) newErrors.description = "Bu xana boş qala bilməz";
  if (!userData.startDate) newErrors.startDate = "Bu xana boş qala bilməz";
  if (!userData.finishDate) newErrors.finishDate = "Bu xana boş qala bilməz";
  if(userData.finishDate){
    if(new Date (userData.finishDate) < new Date (userData.startDate)){
      newErrors.finishDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz"
    }
  }
  if (!userData.trainingResultId) newErrors.trainingResultId = "Bu xana boş qala bilməz";
  if (!userData.trainingPlace) newErrors.trainingPlace = "Bu xana boş qala bilməz";
  if (!userData.trainingMaster) newErrors.trainingMaster = "Bu xana boş qala bilməz";
  if (!userData.mesTrainingNameId) newErrors.mesTrainingNameId = "Bu xana boş qala bilməz";
  if (!userData.volunteerIds || userData.volunteerIds.length === 0)
    newErrors.volunteerIds = "Bu xana boş qala bilməz";


  return newErrors;
}
export function validateEvent(userData) {
  const newErrors = {};
  if (!userData.name) newErrors.name = "Bu xana boş qala bilməz";
  if (!userData.departmentInCharge) newErrors.departmentInCharge = "Bu xana boş qala bilməz";
  if (!userData.startDate) newErrors.startDate = "Bu xana boş qala bilməz";
  if(userData.finishDate){
    if(new Date (userData.finishDate) < new Date (userData.startDate)){
      newErrors.finishDate = "Bitmə tarixi başlama tarixindən əvvəl ola bilməz"
    }
  }
  if (!userData.eventPlace) newErrors.eventPlace = "Bu xana boş qala bilməz";
  if (!userData.volunteerIds || userData.volunteerIds.length === 0)
    newErrors.volunteerIds = "Bu xana boş qala bilməz";

  return newErrors;
}
export function validateVolunteerİAMAS(passportData) {
  // console.log(passportData,'PassportDaata')
  const newErrors = {};
  if (!passportData?.fin) newErrors.fin = "Bu xana boş qala bilməz";
  if (!passportData?.seriaNumber) newErrors.seriaNumber = "Bu xana boş qala bilməz";
  if (!passportData?.docNumber) newErrors.docNumber = "Bu xana boş qala bilməz";
  return newErrors;
}
export function validateVolunteerAdd(userData) {
  console.log(userData,'PassportDaata')
  const newErrors = {};
  if (!userData?.phoneNumber1) newErrors.phoneNumber1 = "Bu xana boş qala bilməz";
  if (!userData?.phoneNumber2) newErrors.phoneNumber2 = "Bu xana boş qala bilməz";
  if (!userData?.email) newErrors.email = "Bu xana boş qala bilməz";
  return newErrors;
}

