import floripa from "./tourism-images/floripa.jpg";
import balneario from "./tourism-images/balneario.jpg";
import beto from "./tourism-images/beto-carrero.jpg";

const tourismData = [
    {
      id: 1,
      title: "Интересные места во Флорипе",
      picture: floripa, 
      date: "16 апреля 2025",
      excerpt: "Путеводитель по острову",
      link: "/tourism/floripa-guide",
    },
    {
      id: 2,
      title: "Бразильский Дубай",
      picture: balneario, 
      date: "23 апреля 2025",
      excerpt: "Что посмотреть в Бальнеариу Камбориу?",
      link: "/tourism/balneario-camborio",
    },
    {
      id: 3,
      title: "Парк аттракционов Beto Carrero",
      picture: beto, 
      date: "23 апреля 2025",
      excerpt: "Самый большой парк аттракционов в ЛА",
      link: "/tourism/beto-carrero",
    },
  ];
  
  export default tourismData;