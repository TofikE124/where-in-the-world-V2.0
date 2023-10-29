import APIClient from "./api-client";
import { Country } from "./countries-service";

interface Currency {
  name: string;
  symbol: string;
}

interface CountryDetails extends Country {
  subregion: string;
  currencies: { [k: string]: Currency };
  languages: { [k: string]: string };
  tld: string[];
  borders: string[];
}

type CountryDetailsService = CountryDetails | CountryDetails[];

const countryDetailsService = () =>
  new APIClient<CountryDetailsService>("/name");

export default countryDetailsService;
