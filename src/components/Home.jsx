import pokeball from "../assets/images/pokeball.png";

const Home = () => {
  return (
    <div className="explore-container">
      <img id="pokeball" src={pokeball} alt="pokeball" />
      <p className="p-explore">EXPLORE THE POKEMON WORLD</p>
      <img id="pokeball" src={pokeball} alt="pokeball" />
    </div>
  );
};

export default Home;
