import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ThemeContext } from "../providers/ThemeProvider";
import countryDetailsService from "../services/countryDetails-service";
import axios from "axios";

interface Alpha {
  name: {
    common: string;
  };
}

const CountryDetailsPage = () => {
  const [borderElements, setBorderElements] = useState<any[]>([]);
  const { darkMode } = useContext(ThemeContext);
  const arrowURL = `/images/BackArrow-${darkMode ? "Dark" : "Light"}.png`;
  const navigate = useNavigate();
  const params = useParams();
  const { countryName } = params;
  let { data: country } = countryDetailsService().get(countryName!, {
    params: {
      fields:
        "name,flags,population,capital,regionm,subregion ,borders,tld,currencies,languages",
    },
  });

  if (Array.isArray(country)) {
    country = country.filter(
      (c) => c.name.common.toLowerCase() === countryName
    )[0];
  }

  const borders = country?.borders;

  useEffect(() => {
    if (country) {
      setBorderElements([]);
      borders?.forEach((b, index) => {
        axios
          .get<Alpha[]>(
            `https://restcountries.com/v3.1/alpha?codes=${b}&fields=name`
          )
          .then((res) => res.data)
          .then((data) => {
            const name = data[0].name.common;
            setBorderElements((prevBorderElements) => [
              ...prevBorderElements,
              <Link
                key={index}
                to={`/country/${name.toLowerCase()}`}
                className="country-page-info__border-item bx-s-2 br bg-pure-white txt-dark"
              >
                {name}
              </Link>,
            ]);
          });
      });
    }
  }, [country]);

  if (!country) return;

  const { nativeName } = country?.name;
  const displayedNativeName = nativeName[Object.keys(nativeName)[0]].common;

  const { currencies } = country;
  const displayedCurrencies = Object.keys(currencies).join(",");

  const { languages } = country;
  const displayedLanguages = Object.keys(languages)
    .map((key) => languages[key])
    .join(",");

  return (
    <div className="country-page-container container">
      <button
        onClick={() => navigate(-1)}
        className="country-page-top bg-white flex bx-s-2 br txt-dark"
      >
        <img src={arrowURL} />
        <p>Back</p>
      </button>

      {country ? (
        <div className="country-page-info-container grid">
          <img
            className="country-page-info__image br bx-s"
            src={country.flags.png}
          />
          <div className="country-page-info grid">
            <h1 className="country-page-info__title txt-dark fs-900 fw-800">
              {country.name.common}
            </h1>
            <div className="country-page-info__main fs-800 fw-600 txt-dark">
              <p>
                Native Name:{" "}
                <span className="fw-300">{displayedNativeName}</span>
              </p>
              <p>
                Population:{" "}
                <span className="fw-300">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p>
                Region: <span className="fw-300">{country.region}</span>
              </p>
              <p>
                Sub Region: <span className="fw-300">{country.subregion}</span>
              </p>
              <p>
                Capital: <span className="fw-300">{country.capital}</span>
              </p>
            </div>
            <div className="country-page-info__secondary fs-800 fw-600 txt-dark">
              <p>
                Top Level Domain:{" "}
                <span className="fw-300">{country.tld[0]}</span>
              </p>
              <p>
                Currencies:{" "}
                <span className="fw-300">{displayedCurrencies}</span>
              </p>
              <p>
                Languages: <span className="fw-300">{displayedLanguages}</span>
              </p>
            </div>
            <div className="country-page-info__border-container grid">
              {borderElements.length !== 0 ? (
                <>
                  <p className="country-page-info__border-container__title fs-600 fw-600 txt-dark">
                    Border Countries:
                  </p>
                  <div className="country-page-info__borders flex">
                    {borderElements}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="country-page-loader-container grid">
          <ClipLoader
            color={darkMode ? "#00FFFF" : "#000"}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetailsPage;
