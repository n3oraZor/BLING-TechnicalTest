import axios from "axios";

const fetchData = async (setData, setIsLoading, setNotFound, settings) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${settings}`
    );
    //store response in useState
    setData(response.data);
    //update useState value to display result (rerendered)
    setIsLoading(false);
  } catch (error) {
    console.log("error catched");
    setNotFound(true);
    console.log(error.message);
  }
};

export default fetchData;
