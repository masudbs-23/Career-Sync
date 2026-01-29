export interface InstitutionProgram {
    _id: string;
    name: string;
    intake: string;
    deadline: string;
    duration: string;
    degree: string;
    subjects: string[];
}

export interface InstitutionScholarship {
    _id: string;
    name: string;
    amount: string;
}

export interface Institution {
    _id: string;
    name: string;
    location: string;
    establishedYear: number;
    website: string;
    image: string;
    programs: InstitutionProgram[];
    requirements: string[];
    scholarships: InstitutionScholarship[];
    facilities: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
