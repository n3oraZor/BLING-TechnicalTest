import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";

//import style here
import "../assets/stylesheet/pokemon.css";

const Pokemon = () => {
  // destructured ID we get when clicking on a particular elem to dispay pokemon page
  const { id } = useParams();
  //data from axios
  const [data, setData] = useState(null);
  //wait all datas to be fetched to display page
  const [isloading, setLoading] = useState(true);
  // useState in case link is modified by user to prevent bad UX
  const [notFound, setNotFound] = useState(false);

  //fetch external ata using AXIOS
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setNotFound(true);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

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
      <Link to="/pokemons">
        <button id="goback">RETURN TO POKEDEX</button>
      </Link>
    </div>
  );
};

export default Pokemon;
