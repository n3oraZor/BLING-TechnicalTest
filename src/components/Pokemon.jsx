import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import fetchData from "../assets/FetchData";

//import style here
import "../assets/stylesheet/pokemon.css";

const Pokemon = () => {
  // UseNavigate
  const navigate = useNavigate();
  // destructured ID we get when clicking on a particular elem to dispay pokemon page
  const { id } = useParams();
  //data from axios
  const [data, setData] = useState(null);
  //wait all datas to be fetched to display page
  const [isloading, setIsLoading] = useState(true);
  // useState in case link is modified by user to prevent bad UX
  const [notFound, setNotFound] = useState(false);

  const settings = id;

  //fetch external ata using AXIOS & rerender fetchData on isLimit
  useEffect(() => {
    fetchData(setData, setIsLoading, setNotFound, settings);
  }, [id]);

  const returnHome = () => {
    navigate("/Pokemons");
  };

  //is notFound is true, display all query page
  return notFound ? (
    <Navigate to="*" />
  ) : isloading ? (
    <>
      <p>Loading...</p>
    </>
  ) : (
    <div className="container-pokemon">
      <span>NAME: {data.name.toUpperCase()}</span>
      <span>WEIGHT: {data.weight / 10} KG</span>
      <span>HEIGHT: {data.height * 10} CM</span>
      <div className="container-sprites">
        <img
          src={data.sprites.front_default}
          alt={`${data.name} default`}
          id="img1"
        />
        <img
          src={data.sprites.front_shiny}
          alt={`${data.name} shiny `}
          id="img2"
        />
      </div>
      <div className="element-type">
        {data.types.map((elem, index) => {
          return <p key={index}>TYPE: {elem.type.name.toUpperCase()}</p>;
        })}
      </div>

      <button id="goback" onClick={returnHome}>
        RETURN TO POKEDEX
      </button>
    </div>
  );
};

export default Pokemon;
