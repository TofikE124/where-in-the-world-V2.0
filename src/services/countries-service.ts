import APIClient from "./api-client";
interface Name {
  common: string;
  official: string;
  nativeName: {
    [k: string]: {
      common: string;
    };
  };
}
interface Flags {
  png: string;
}

export interface Country {
  name: Name;
  flags: Flags;
  region: string;
  capital: string[];
  population: number;
  cca3: string;
}

const countriesService = () => new APIClient<Country>("/all");
export default countriesService;
