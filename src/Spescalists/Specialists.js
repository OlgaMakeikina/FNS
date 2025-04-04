import SpecialistsList from "./SpecialistsList";
import "./Specialists.css";


const Specialists = () => {
  return (
    <div className='specialists-cont'>
        <h2>Организации и специалисты</h2>
        <p>Найдите русскоязычных специалистов и сервисы во Флорипе быстро и удобно!</p>
        <p>Используйте фильтры, чтобы выбрать нужную категорию и легко найти того, кто вам подходит.</p>
          
          <SpecialistsList />
    </div>


  );
};

export default Specialists;