import main from './test.png';
import "./Home.css";
import { Link } from 'react-router-dom';
import Specialists from './Spescalists/Specialists';

const Home = () => {
  return (
    <div>
    <div className="home-container">
      <img src={main} alt="Ponto" className="home-image" />
      <button className="home-button">
      <Link to="/specialists" className="home-button-link">
             Найти специалиста
              </Link>
        </button>
    </div>  
    <Specialists />
       </div>
  );
};

export default Home;