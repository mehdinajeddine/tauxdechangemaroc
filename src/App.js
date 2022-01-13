import "./App.css";
import Convert from "./components/Convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Taux de change au Maroc</h1>
        <p>Pour convertir le dirham Marocain dans toutes les devises.</p>
      </header>
      <main>
        <Convert />
      </main>
      <footer>
        <hr />
        <p className="small">
          taux-de-change.ma © 2022
          <br />
          L'utilisation de ce site est gratuite et réservée à un usage
          strictement personnel.
          <br />
          Created with{" "}
          <FontAwesomeIcon
            icon={faHeart}
            onClick={(e) => {
              handleSubmit("res2source");
            }}
          />{" "}
          in Morocco
        </p>
      </footer>
    </div>
  );
}

export default App;
