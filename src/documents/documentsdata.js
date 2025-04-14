import visa from "./documents-images/visa.jpg"; 
import child from "./documents-images/child.jpg"; 
import medicine from "./documents-images/medicine.jpg";


const documentsData = [
    {
      id: 1,
      title: "Как продлить туристическое пребывание на 90 дней?",
      picture: visa,
      date: "08 апреля 2025",
      excerpt: "Инструкция по продлению",
      link: "/documents/visa-extension",
    },
    {
      id: 2,
      title: "Как оформить гражданство Бразилии для ребёнка до 10 лет?",
      picture: child,
      date: "09 апреля 2025",
      excerpt: "Подробный гайд",
      link: "/documents/child-citizenship",
    },
    {
      id: 3,
      title: "Как получить бесплатную медицинскую страховку?",
      picture: medicine,
      date: "09 апреля 2025",
      excerpt: "Гайд по оформлению SUS",
      link: "/documents/sus",
    },
  ];
  
  export default documentsData;