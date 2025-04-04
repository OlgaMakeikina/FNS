import main from './main3.png';
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <img src={main} alt="Ponto" className="home-image" />
      <button className="home-button">Найти специалиста</button>
    </div>
  );
};

export default Home;