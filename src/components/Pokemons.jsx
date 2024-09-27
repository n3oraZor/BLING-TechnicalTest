import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import fetchData from "../assets/FetchData";

//import style here
import "../assets/stylesheet/pokemons.css";

const Pokemons = () => {
  //list of useState
  //fetchonly first 20 pokemons
  const [isLimit, setIsLimit] = useState(20);
  //data from axios
  const [data, setData] = useState(null);
  //wait all datas to be fetched to display page
  const [isLoading, setIsLoading] = useState(true);
  //searchfunction
  const [searchName, setSearchName] = useState("");
  const [searchState, setSearchState] = useState([]);
  // useState in case link is modified by user to prevent bad UX
  const [notFound, setNotFound] = useState(false);

  const settings = `?limit=${isLimit}`;

  //fetch external ata using AXIOS & rerender fetchData on isLimit
  useEffect(() => {
    console.log(settings);
    fetchData(setData, setIsLoading, setNotFound, settings);
  }, [isLimit]);

  //

  //Function to filter POKEMON, avoid null value and update islimit value to fetch all datas
  //Lower case mandatory to prevent mobile 1rst letter in cap
  const filteredPokemon = () => {
    if (data && data.results) {
      searchName && setIsLimit(data.count);
      const filterPokemon = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchName)
      );
      setSearchState(filterPokemon);
    }
  };

  //display next 20 pokemons when button NEXT is pressed
  //lazyload bypass the need to press
  const nextPokemons = () => {
    setIsLimit(isLimit + 20);
  };

  //rerender filteredPokemon on searchName
  useEffect(() => {
    filteredPokemon();
  }, [searchName, data]);

  //lazyload approach to display pokemon without pressing NEXT button
  //function from stackoverflow
  //using the page Height to detect when we reach the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const bodyHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + windowHeight >= bodyHeight - 1) {
        //we can do bodyHeight -100 to trigger action a bit before to smooth UX
        {
          nextPokemons();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLimit]);

  return isLoading ? (
    <>
      <p>Loading...</p>
    </>
  ) : (
    <div className="pokemons-container">
      <h2>
        We have discovered {data.count} Pokemons yet, but there are still some
        unknowns species... while we pursue our research, test yourself !
      </h2>
      <form>
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          placeholder="&#x1F50D; | ex: search for pikachu"
          onInput={(e) => {
            setSearchName(e.target.value.toLowerCase());
          }}
        />
      </form>
      <div className="container">
        {/* using regex to replace everything except /numbers/ 
        url is not directy recheable, API give patch and need to had pokemon index in
        database */}
        {searchState.map((elem, index) => {
          const extractIndexFromUrl = elem.url.replace(/.*\/(\d+)\/$/, "$1");
          return (
            <Link to={`/details/${elem.name}`} key={index}>
              <div className="pokemon-container">
                <span>{elem.name.toUpperCase()}</span>

                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractIndexFromUrl}.png`}
                  alt={elem.name}
                />
              </div>
            </Link>
          );
        })}
      </div>
      {isLoading ||
        (!searchName && (
          <div>
            <button
              id="next"
              onClick={nextPokemons}
              className={
                isLimit > data.count - 20 ? "hide-button" : "show-button"
              }
            >
              MORE
            </button>
          </div>
        ))}
    </div>
  );
};

export default Pokemons;
