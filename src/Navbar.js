import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Navbar.css";
import logo from './1.png';

export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const itemRenderer = (item) => (
    <Link 
      to={item.to} 
      className={`flex align-items-center p-menuitem-link ${item.className || ""}`}
      style={item.className === "custom-donate-item" ? { color: '#1a9e3b', textDecoration: 'none' } : {}}
    >
      <span className={`pi ${item.icon} menu-item-icon`} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </Link>
  );

  const items = [
    {
      label: "Главная",
      icon: "pi pi-home",
      to: "/",
      template: itemRenderer,
    },
    {
      label: "Специалисты",
      icon: "pi pi-folder",
      items: [
        {
          label: "Найти специалиста",
          icon: "pi pi-user",
          to: "/specialists",
          template: itemRenderer,
        },
        {
          label: "Добавить специалиста",
          icon: "pi pi-plus-circle",
          to: "/addcontact",
          template: itemRenderer,
        },
      ],
    },
    {
      label: "Полезная информация",
      icon: "pi pi-star",
      items: [
        {
          label: "Лайфхаки",
          icon: "pi pi-check",
          to: "/lifehacks",
          template: itemRenderer,
        },
        {
          label: "Документы",
          icon: "pi pi-check",
          to: "/documents",
          template: itemRenderer,
        },
        {
          label: "Новости",
          icon: "pi pi-check",
          to: "/news",
          template: itemRenderer,
        },
        {
          label: "Туризм",
          icon: "pi pi-check",
          to: "/tourism",
          template: itemRenderer,
        },
      ],
    },
    {
      label: "Контакты",
      icon: "pi pi-envelope",
      to: "/contact",
      template: itemRenderer,
    },
    {
      label: "Поддержать",
      icon: "pi pi-credit-card",
      to: "/donate",
      template: itemRenderer,
      className: "custom-donate-item",
    },
  ];

  const start = (
    <Link to="/" className="logo">
      <img alt="logo" src={logo} height="40" className="mr-2" />
    </Link>
  );

  return (
    <div className="navbar-container">
      <Menubar
        model={items}
        start={start}
        className={`glassmorphism ${mobileMenuVisible ? "mobile-visible" : ""}`}
        onClick={() => setMobileMenuVisible(false)} 
      />
    </div>
  );
}