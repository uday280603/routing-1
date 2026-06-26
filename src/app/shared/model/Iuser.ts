

export interface Iuser {
  userName: string;
  userId: string
  userRole: "Candidate" | "Admin";
  profileImage: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
  address: Iaddress;
  isAddSame: boolean;
    profileDescription: string

}

export interface Iaddress {
  current: Icurrent;
  permanent: Ipermanent;
}

export interface Icurrent {
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Ipermanent {
  city: string;
  state: string;
  country: string;
  zipCode: string;
}