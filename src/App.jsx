// import dependencies here
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

//import images and graphics ressources here
import pokemonlogo from "./assets/images/pokemon.svg";

//import pages here
import Home from "./components/Home";
import Pokemons from "./components/Pokemons";
import Pokemon from "./components/Pokemon";
import NotFound from "./components/NotFound";

//import style here
import "./App.css";

function App() {
  const [togglePokedex, setTogglePokedex] = useState(false);

  const TogglePokedexFunction = () => {
    setTogglePokedex(!togglePokedex);
  };

  return (
    <Router>
      <div className="container-global">
        <div className="disclaimer">**made by thibaud delecraz for BLING**</div>
        <nav>
          <Link to="/">
            <img
              id="pokemonlogo"
              src={pokemonlogo}
              alt="pokemonlog"
              style={{
                height: togglePokedex ? "15vh" : "30vh",
              }}
            />
          </Link>
        </nav>
        <div className="pokedex-container">
          <button
            id="pokedex"
            onClick={TogglePokedexFunction}
            style={{
              border: togglePokedex ? "solid 3px red" : "solid 5px #3369b2",
              height: togglePokedex ? "5vh" : "10vh",
            }}
          >
            {togglePokedex ? (
              <Link to="/">
                <div>CLOSE POKEDEX</div>
              </Link>
            ) : (
              <Link to="/pokemons">
                <div>OPEN POKEDEX</div>
              </Link>
            )}
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pokemons" element={<Pokemons />} />
        <Route path="/details/:id" element={<Pokemon />} />
        <Route
          path="*"
          element={<NotFound setTogglePokedex={setTogglePokedex} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
