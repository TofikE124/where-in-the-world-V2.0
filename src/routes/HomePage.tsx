import { ClipLoader } from "react-spinners";
import countriesService from "../services/countries-service";
import { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import CountryElement from "../components/CountryElement";
import SearchBar from "../components/SearchBar";

import Filter from "../components/Filter/Filter";
import OptionsContainer from "../components/OptionsContainer";
import Option from "../components/Filter/Option";
import Title from "../components/Filter/Title";
import { FilterDataContext } from "../providers/FilterDataProvider";
const HomePage = () => {
  const { data: countries, isLoading, error } = countriesService().getAll();
  const { darkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState<string>("");
  const { filterData } = useContext(FilterDataContext);
  let displayedCountries;
  displayedCountries = countries?.sort((a, b) => b.population - a.population);

  displayedCountries = filterData
    ? displayedCountries?.filter((c) => {
        return c.region === filterData;
      })
    : displayedCountries;

  displayedCountries = search
    ? displayedCountries?.filter((c) =>
        c.name.common.toLowerCase().startsWith(search.toLowerCase())
      )
    : displayedCountries;
  const countriesElements = displayedCountries?.map((country, index) => (
    <CountryElement key={index} data={country} search={""} />
  ));

  if (isLoading)
    return (
      <div className="spinner-container container">
        <ClipLoader
          color={darkMode ? "#00FFFF" : "#000"}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  if (error) throw error;

  return (
    <div className="home-container container">
      <div className="home-search-section flex">
        <SearchBar
          search={search}
          handleChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <Filter>
          <Title>Region</Title>
          <OptionsContainer>
            <Option defaultOption>None</Option>
            <Option>Africa</Option>
            <Option>Americas</Option>
            <Option>Asia</Option>
            <Option>Europe</Option>
            <Option>Oceania</Option>
          </OptionsContainer>
        </Filter>
      </div>
      <div className="countries-section grid">
        {countriesElements?.length ? countriesElements : ""}
      </div>
    </div>
  );
};

export default HomePage;
