export const headerNames = {
  EducationTypes: {
    h1: "Təhsilin tipi",
  },
  EducationDegrees: {
    h1: "Təhsilin səviyyəsi",
  },
  LanguageNames: {
    h1: "Dil biliyi",
  },
  LanguageProficiencyLevels: {
    h1: "Dil biliyinin  səviyyəsi",
  },
  ComputerSkillNames: {
    h1: "Kompüter bilikləri",
  },
  SkillLevels: {
    h1: "Kompüter biliklərinin səviyyəsi",
  },
  InsuranceCompanies: {
    h1: "Sığorta şirkətləri",
  },
  MesVoluntaryActivityEndReasons: {
    h1: "Fəaliyyətin bitmə səbəbləri",
  },
  SupplyTypes: {
    h1: "Əşya və ləvazimatların növü",
  },
  ElectronicDocumentTypes: {
    h1: "Elektron sənədlərin növü",
  },
  MesTrainingNames: {
    h1: "Təlimlər",
  },
  TrainingResults: {
    h1: "Təlimlərin nəticəsi",
  },
  SecurityCheckResultName: {
    h1: "Yoxlama nəticəsi",
  },
};

// <Route
// path="/TrainingResults"
// element={<TableForEducationType />}
// />
// <Route
// path="/MesTrainingNames"
// element={<TableForEducationType />}
// />
// <Route
// path="/EducationTypes"
// element={<TableForEducationType />}
// />
// <Route
// path="/EducationDegrees"
// element={<TableForEducationType />}
// />
// <Route
// path="/InsuranceCompaniesnce"
// element={<TableForEducationType />}
// />
// <Route
// path="/ComputerSkillName"
// element={<TableForEducationType />}
// />
// <Route path="/SkillLevels" element={<TableForEducationType />} />
// <Route
// path="/MesVoluntaryActivityEndReasons"
// element={<TableForEducationType />}
// />
// <Route path="/SupplyTypes" element={<TableForEducationType />} />
// <Route
// path="/ElectronicDocumentTypes"
// element={<TableForEducationType />}
// />
// <Route
// path="/LanguageNames"
// element={<TableForEducationType />}
// />
// <Route
// path="/LanguageProficiencyLevelseLevel"
// element={<TableForEducationType />}

export const columnNames = {
  EducationTypes: [
    {
      header: "Təhsilin tipi",
      accessorKey: "EducationTypes",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  EducationDegrees: [
    {
      header: "Təhsilin dərəcəsi",
      accessorKey: "EducationDegrees",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
    {
      header: "Təhsilin tipi",
      accessorKey: "EducationTypes",
      isSelectable: false,
    },
  ],
  LanguageNames: [
    {
      header: "Dil biliyi",
      accessorKey: "LanguageNames",
      isSelectable: false,
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  SecurityCheckResultName: [
    {
      header: "Yoxlanma nəticəsinin adı ",
      accessorKey: "SecurityCheckResultName",
      isSelectable: false,
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  LanguageProficiencyLevels: [
    {
      header: "Dil biliyi səviyyəsi",
      accessorKey: "LanguageProficiencyLevels",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  ComputerSkillNames: [
    {
      header: "Kompüter biliyinin adı",
      accessorKey: "ComputerSkillName",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  SkillLevels: [
    {
      header: "Kompüter biliyinin səviyyəsi",
      accessorKey: "SkillLevels",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  InsuranceCompanies: [
    {
      header: "Sığotra şirkəti",
      accessorKey: "InsuranceCompaniesnce",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  MesVoluntaryActivityEndReasons: [
    {
      header: "Fəaliyyətin bitmə səbəbi",
      accessorKey: "MesVoluntaryActivityEndReasons",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  SupplyTypes: [
    {
      header: "Əşya və ləvazimatların növü",
      accessorKey: "SupplyTypes",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  ElectronicDocumentTypes: [
    {
      header: "Elektron sənədlərin növü",
      accessorKey: "ElectronicDocumentTypes",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  MesTrainingNames: [
    {
      header: "Təlimin adı",
      accessorKey: "MesTrainingNames",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
  TrainingResults: [
    {
      header: "Təlimlərin nəticəsi",
      accessorKey: "TrainingResults",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "priority", isSelectable: false },
  ],
};
