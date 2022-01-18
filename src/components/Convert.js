import { useState, useEffect } from "react";
import rates from "../rates.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltDown, faArrowAltUp } from "@fortawesome/pro-solid-svg-icons";
import axios from "axios";
import { Switch } from "@mui/material";

const Convert = () => {
  const [source, setSource] = useState(0);
  const [result, setResult] = useState(0);

  const [csource, setCsource] = useState("EUR");
  const [cresult, setCresult] = useState("USD");
  const [data, setData] = useState([]);
  const [type, setType] = useState(false);

  const handleSubmit = (direction) => {
    const ratesResult = data.filter((val) => {
      return val.libDevise == cresult ? true : false;
    });
    const ratesSource = data.filter((val) => {
      return val.libDevise == csource ? true : false;
    });
    let rs = 1;
    let rr = 1;

    if (!type) {
      rs = ratesSource.length > 0 ? ratesSource[0].achatClientele : 1;
      rr = ratesResult.length > 0 ? ratesResult[0].achatClientele : 1;
    } else {
      rs = ratesSource.length > 0 ? ratesSource[0].venteClientele : 1;
      rr = ratesResult.length > 0 ? ratesResult[0].venteClientele : 1;
    }

    if (direction === "source2res") {
      setResult((source * rs) / rr);
    } else {
      setSource((result * rr) / rs);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const params = { libDevise: "", date: "2022-01-12T21:44:09.921Z" };
      const api_key = process.env.REACT_APP_BAM_API_KEY
        ? process.env.REACT_APP_BAM_API_KEY
        : "";
      const headers = {
        headers: {
          "Ocp-Apim-Subscription-Key": api_key,
        },
      };
      const data = await axios.get(
        "https://api.centralbankofmorocco.ma/cours/Version1/api/CoursBBE?libDevise=&date=" +
          Date.now(),

        headers
      );
      setData(data.data);
      console.log(data.data);
    };
    getData();
    setSource(1);
    setCsource("MAD");
  }, []);

  const currencies = Object.keys(rates);
  const currenciesList = data.map((key, index) => {
    return (
      <option value={key.libDevise} key={index}>
        {key.libDevise}
      </option>
    );
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit("source2res");
      }}
    >
      <div>
        <div className="type">
          <div>
            <span>Achat</span>
            <Switch
              onClick={(e) => {
                setType(!type);
              }}
            ></Switch>
            <span>Vente</span>
          </div>
          <div>
            <p className="medium">
              Achat repésente le coût d'achat d'une devise. Autrement dit, vous
              changez vos dirhams en devises.
            </p>
            <p className="medium">
              Vente repésente le coût de vente d'une devise. Autrement dit, vous
              changez vos devises en dirhams.
            </p>
          </div>
        </div>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <select value={csource} onChange={(e) => setCsource(e.target.value)}>
          {currenciesList}
          <option value="MAD" key="MAD">
            MAD
          </option>
        </select>
      </div>
      <div>
        <button className="btn-convert">Convertir</button>{" "}
        <FontAwesomeIcon
          size="2x"
          icon={faArrowAltDown}
          onClick={(e) => {
            handleSubmit("source2res");
          }}
        />
        <FontAwesomeIcon
          size="2x"
          icon={faArrowAltUp}
          onClick={(e) => {
            handleSubmit("res2source");
          }}
        />
      </div>
      <div>
        <input
          value={result}
          type="text"
          onChange={(e) => setResult(e.target.value)}
        />
        <select value={cresult} onChange={(e) => setCresult(e.target.value)}>
          {currenciesList}
          <option value="MAD" key="MAD">
            MAD
          </option>
        </select>
      </div>
    </form>
  );
};

export default Convert;
