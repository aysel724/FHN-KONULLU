import data from "./data.json";

export const headerNames = {
  educationType: {
    h1: "Təhsilin tipi",
  },
  educationDegree: {
    h1: "Təhsilin səviyyəsi",
  },
  language: {
    h1: "Dil biliyi",
  },
  languageLevel: {
    h1: "Dil biliyinin  səviyyəsi",
  },
  computerSkills: {
    h1: "Kompüter bilikləri",
  },
  computerSkillsLevel: {
    h1: "Kompüter biliklərinin səviyyəsi",
  },
  insurance: {
    h1: "Sığorta şirkətləri",
  },
  reason: {
    h1: "Fəaliyyətin bitmə səbəbləri",
  },
  staff: {
    h1: "Əşya və ləvazimatların növü",
  },
  electronDocuments:{
    h1: "Elektron sənədlərin növü",
  },
trainingsAdmin:{
  h1: "Təlimlər",
},
trainingsResults:{
  h1: "Təlimlərin nəticəsi",
},}

export const headerNames1 = {
  educationType: 
    "Təhsilin tipi",
 
  educationDegree: 
   "Təhsilin səviyyəsi",

  language: 
   "Dil biliyi",

  languageLevel:
    "Dil biliyinin  səviyyəsi",

  computerSkills: 
   "Kompüter bilikləri",
 




};
export const columnNames = {
  educationType: [
    {
      header: "Təhsilin tipi",
      accessorKey: "educationType",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  educationDegree: [
    {
      header: "Təhsilin dərəcəsi",
      accessorKey: "educationDegree",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  language: [
    {
      header: "Dil biliyi",
      accessorKey: "language",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["əla", "yaxhi", "zəif", "yaxhi"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  languageLevel: [
    {
      header: "Dil biliyi səviyyəsi",
      accessorKey: "languageLevel",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  computerSkills: [
    {
      header: "Kompüter biliyinin adı",
      accessorKey: "computerSkills",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  computerSkillsLevel: [
    {
      header: "Kompüter biliyinin səviyyəsi",
      accessorKey: "computerSkillsLevel",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  insurance: [
    {
      header: "Sığotra şirkəti",
      accessorKey: "insurance",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  reason: [
    {
      header: "Fəaliyyətin bitmə səbəbi",
      accessorKey: "reason",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  staff: [
    {
      header: "Əşya və ləvazimatların növü",
      accessorKey: "staff",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  electronDocuments: [
    {
      header: "Elektron sənədlərin növü",
      accessorKey: "electronDocuments",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  trainingsAdmin: [
    {
      header: "Təlimin adı",
      accessorKey: "trainingsAdmin",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],
  trainingsResults: [
    {
      header: "Təlimlərin nəticəsi",
      accessorKey: "trainingsResults",
      isSelectable: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      isSelectable: ["Active", "Inactive"],
    },
    { header: "Prioritet", accessorKey: "prioritet", isSelectable: false },
  ],

  
  
};
export const apiData = {
  educationDegree: [
    {
      id: "1",
      educationDegree: "Bakalavr",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      educationDegree: "Maqistr",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      educationDegree: "Doctor",
      status: "active",
      prioritet: " 1",
    },
  ],
  educationType: [
    {
      id: "1",
      educationType: "Ali",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      educationType: "Orta",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      educationType: "Natamam ali",
      status: "active",
      prioritet: " 1",
    },
  ],
  language: [
    {
      id: "1",
      language: "İngilis",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      language: "Rus",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      language: "Alman",
      status: "active",
      prioritet: " 1",
    },
  ],
  languageLevel: [
    {
      id: "1",
      languageLevel: "A1",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      languageLevel: "A2",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      languageLevel: "B1",
      status: "active",
      prioritet: " 1",
    },
  ],
  computerSkills: [
    {
      id: "1",
      computerSkills: "HTML",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      computerSkills: "Css",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      computerSkills: "Js",
      status: "active",
      prioritet: " 1",
    },
  ],
  computerSkillsLevel: [
    {
      id: "1",
      computerSkillsLevel: "Əla'",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      computerSkillsLevel: "orta",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      computerSkillsLevel: "zəif",
      status: "active",
      prioritet: " 1",
    },
  ],

  insurance: [
    {
      id: "1",
      insurance: "AZƏR SIĞORTA",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      insurance: "PAŞA",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      insurance: "XALQ",
      status: "active",
      prioritet: " 1",
    },
  ],
  reason: [
    {
      id: "1",
      reason: "Proqram müddətinin bitməsi ilə",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      reason: "Sağlamlıq şərtləri ilə əlaqədar",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      reason: "Sağlamlıq şərtləri ilə əlaqədar",
      status: "active",
      prioritet: " 1",
    },
    {
      id: "4",
      reason: "Təhsil ilə əlaqədar",
      status: "active",
      prioritet: " 1",
    },
  ],
  staff: [
    {
      id: "1",
      staff: "Ayaqqabı",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
      staff: "Şalvar",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      staff: "Köynək",
      status: "active",
      prioritet: " 1",
    },
    {
      id: "4",
      staff: "Papaq",
      status: "active",
      prioritet: " 1",
    },
  ],
  electronDocuments: [
    {
      id: "1",
      electronDocuments: "CV forması",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
     electronDocuments: "Sertifikat",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      electronDocuments: "Diplom",
      status: "active",
      prioritet: " 1",
    },
    {
      id: "4",
      electronDocuments: "Təltifnamə",
      status: "active",
      prioritet: " 1",
    },
  ],
  trainingsAdmin: [
    {
      id: "1",
      trainingsAdmin: "Xilasetmə",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
    trainingsAdmin: "Yeni nəsil texnologiyalar",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      trainingsAdmin: "İlkin tibbi yardım",
      status: "active",
      prioritet: " 1",
    },
    {
      id: "4",
     trainingsAdmin: "Yanğın söndürmə",
      status: "active",
      prioritet: " 1",
    },
  ],
  trainingsResults: [
    {
      id: "1",
      trainingsResults: "Əla",
      status: "active",
      prioritet: " 3",
    },

    {
      id: "2",
    trainingsResults: "Yaxşı",
      status: "active",
      prioritet: " 2",
    },
    {
      id: "3",
      trainingsResults: "Kafi",
      status: "active",
      prioritet: " 1",
    },
    {
      id: "4",
     trainingsResults: "Qeyri-kafi",
      status: "active",
      prioritet: " 4",
    },
  ],
};

export const usersData = [
  {
    id: "1",
    firstName: "Aysel Hesenova",
    gender: "qadin",
    birthdate: "24.10.1994",
    mail: "Jerod14@hotmail.com",
    status: "Fealiyyete davam eden",
    fin: "1797krw",
    famylystatus: "evli",
    start: "23.09.2022",
    finish: "23.10.2022",
    state: "acvive",
    famylystatus: "evli",
    phone: "+994504962260",
    mail: "aska-hesenova94@mail.ru",
    army: "---",
    boy: 190,
  },



 
  {
    id: "2",
    firstName: "Ceyhun Asgerov",
    status: "Fəaliyyəti dəvam edən",
    gender: "qadin",
    birthdate: "24.10.1994",
    fin: "1y97krw",
    famylystatus: "evli",
    phone: "+994504962260",
    mail: "aska-hesenova94@mail.ru",
    start: "23.09.2022",
    finish: "--",
    army: "---",
    boy: 190,
  },
  {
    id: "3",
    firstName: "Ayla Asgarova",
    gender: "qadin",
    birthdate: "24.10.1994",
    mail: "Jerod14@hotmail.com",
    status: "Fealiyyete davam eden",
    fin: "1797krw",
    famylystatus: "evli",
    start: "23.09.2022",
    finish: "23.10.2022",
  },
  {
    id: "4",
    firstName: `Veli Aliyev`,
    gender: "kişi",
    birthdate: "24.10.1994",
    mail: "Jerod14@hotmail.com",
    status: "Fealiyyete davam eden",
    fin: "1797krw",
    famylystatus: "evli",
    start: "23.09.2022",
    finish: "23.10.2022",
  },
  {
    id: "5",
    firstName: `Aynur Rustamzade`,
    gender: "qadin",
    birthdate: "24.10.1994",
    mail: "aynur@hotmail.com",
    status: "Fealiyyete davam eden",
    fin: "1797krw",
    famylystatus: "evli",
    start: "21.08.2022",
    finish: "23.10.2022",
  },
];

//50 us states array
export const usStates = ["active", "inactive"];
export const usStates3 = ["admin", "guest"];
export const usStates8 = [
  "Aysel Hesenova",
  `Aynur Rustamzade`,
  `Veli Aliyev`,
  "Ayla Asgarova",
  "Ceyhun Asgarov",
];
export const usStates9 = ["pasha", `heyat`];
export const edutype = ["ali", "orta", "natamam ali"];
export const edudegree = ["bakalavr", "doktor", "magistr"];
export const results = ["əla", "yaxşı", "kafi", "qənaətbəxş"];
export const fakeData1 = [
  {
    id: 5,
    name: "Anım günü",
    desc: "-----------",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "1 gun",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    numberOfVolonteers: 200,
    note: "-----------------",
  },

  {
    id: 6,
    name: "Zəfər günü",
    desc: "-----------",
    start: "08.11.2020",
    finish: "21.11.2011",
    time: "1 gun",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    note: "-----------------",
    numberOfVolonteers: 200,
  },
  {
    id: 7,
    name: "Gelebe günü",
    desc: "-----------",
    start: "08.11.2020",
    finish: "21.11.2011",
    time: "1 gun",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    note: "-----------------",
    numberOfVolonteers: 200,
  },
];

export const fakeData2 = [
  {
    id: 1,
    name: "Yanğın söndürmə",
    desc: "-----------",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "10 mgun",
    adress: "20 yanvar",
    couch: "Elnur Aliyev",
    resault: "yaxwi",
    documents: [],
  },
  {
    name: "XilasETME",
    id: 2,
    desc: "-----------",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "20 GUN",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    resault: "yaxwi",
    documents: [],
  },
];
export const fakeData3 = [
  {
    id: "1",
    firstName: "Aysel Hesenova",

    mail: "Jerod14@hotmail.com",

    role: "admin",
  },

  {
    id: "2",
    firstName: "Ceyhun Asgarov",

    mail: "Jerod14@hotmail.com",
    role: "admin",
  },
  {
    id: "3",
    firstName: "Ayla Asgarova",

    mail: "Jerod14@hotmail.com",
    role: "admin",
  },
];
export const fakeData7 = [
  {
    id: 1,
    type: "Yanğın söndürmə",
    degree: "-----------",
    educationPlace: "ADNSU",
    diplomatime: "21.11.2011",
    finish: "21.11.2016",
    start: "14.09.2012",
    facultativ: "BIOMEDICAL",
    specialization: "enginering",
    diplomaNumber: "AE187369",
  },
  {
    type: "XilasETME",
    id: 2,
    degree: "-----------",
    educationPlace: "UNEC",
    diplomatime: "21.11.2011",
    finish: "21.11.2011",
    start: "14.09.2012",
    facultativ: "INSPEKTor",
    specialization: "ispektion",
    diplomaNumber: "TREE187369",
  },
];
export const fakeData4 = [
  {
    id: "1",
    firstName: "Azərbaycan",
    status: "active",
  },

  {
    id: "2",
    firstName: "Türk",
    status: "deactive",
  },
  {
    id: "3",
    firstName: "Rus",
    status: "active",
  },
];

export const fakeData5 = [
  {
    id: "1",
    educationType: "Ali",
    status: "active",
    prioritet: " 3",
  },

  {
    id: "2",
    educationType: "Orta",
    status: "active",
    prioritet: " 2",
  },
  {
    id: "3",
    educationType: "Natamam ali",
    status: "active",
    prioritet: " 1",
  },
];
export const fakeData6 = [
  {
    events: "Ilkin Tibbi yardım",
    sports: "Judo",
    id: "1",
    educationType: "Bakalavr",
    status: "active",
    prioritet: " 3",
    language: " rus",
    languageLevel: "yaxşı",
    computerSkill: "HTML",
    computerSkillsDegree: "yaxşı",
    insurance: "PAŞA SIĞORTA",
    reason: "Proqram müddətinin bitməsi ilə",
    staff: "Şalvar",
    docs: "Cv forma",
    trainings: "İlkin tibbi yardım",
    result: "yaxşı",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "20 GUN",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    insuranceNeme: "pasha",
  },

  {
    sports: "Yunan Roma güləşi",
    degree: "-----------",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "20 GUN",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
    id: "2",
    educationType: "Magistr",
    status: "active",
    prioritet: " 2",
    language: " az",
    languageLevel: "əla",
    computerSkill: "MSOFFICE",
    computerSkillsDegree: "zəif",
    insurance: "XALQ SIĞORTA",
    reason: "Təhsil ilə əlaqədar",
    staff: "'Köynək'",
    docs: "Sertifikat",
    trainings: "Yanğın söndürmə",
    result: "əla",
    insuranceNeme: "heyat",
    events: "Ilkin Tibbi yardım",
  },
  {
    sports: "Karate",
    id: "3",
    educationType: "Doktor",
    status: "active",
    prioritet: " 1",
    language: " eng",
    languageLevel: "kafi",
    computerSkill: "CSS",
    computerSkillsDegree: "əla",
    insurance: "ATAŞGAH SIĞORTA",
    reason: "Sağlamlıq şərtləri ilə əlaqədar",
    staff: "'Papaq'",
    docs: "Diplom",
    trainings: "Xilasetmə",
    result: "zəif",
    start: "11.11.2011",
    finish: "21.11.2011",
    time: "20 GUN",
    adress: "20 yanvar",
    couch: "ANAR Aliyev",
  },
];
