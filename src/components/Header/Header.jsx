//Developed by Amadeus Ferrp (https://www.linkedin.com/in/amadeusferro) ...
//Translated by Amadeus Ferro ...

import logo from "../img/logo.png";
import "./Header.css";

// 👇 Adicionado o useContext 👇
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const { t, i18n } = useTranslation();
  const { changeLanguage, language } = i18n;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [setCurrentLanguage] = useState(language);
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  const changeToEnglish = () => {
    localStorage.setItem("selectedLanguage", "en");
    const newLanguage = localStorage.getItem("selectedLanguage");
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    setIsMobileMenuOpen(false);
  };

  const changeToPortuguese = () => {
    localStorage.setItem("selectedLanguage", "pt");
    const newLanguage = localStorage.getItem("selectedLanguage");
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    setIsMobileMenuOpen(false);
  };

  const changeToJapanese = () => {
    localStorage.setItem("selectedLanguage", "ja");
    const newLanguage = localStorage.getItem("selectedLanguage");
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/Tech-Museum/"; 
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.style.display = "flex";
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      id="header"
      className={`header fixed-top ${
        isMobileMenuOpen ? "header-mobile-open" : ""
      }`}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link
          className="logo d-flex align-items-center"
          to="/Tech-Museum/"
          onClick={() => scrollToSection("hero")}
        >
          <img src={logo} alt="" />
          <span>{t("navbar.museum")}</span>
        </Link>

        <nav
          id="navbar"
          className={`navbar ${isMobileMenuOpen ? "navbar-mobile" : ""}`}
          style={{ display: isMobileMenuOpen ? "block" : "flex" }}
        >
          <ul>
            <li>
              <Link
                className="nav-link scrollto active text-logo"
                to="/Tech-Museum/"
                onClick={() => scrollToSection("hero")}
              >
                {t("navbar.home")}
              </Link>
            </li>
            <li>
              <Link
                className="nav-link scrollto"
                to="/Tech-Museum/"
                onClick={() => scrollToSection("about")}
              >
                {t("navbar.about")}
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" to="/Tech-Museum/gallery">
                {t("navbar.portfolio")}
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" to="/Tech-Museum/team">
                {t("navbar.members")}
              </Link>
            </li>
            <li>
              <Link
                className="nav-link scrollto"
                to="/Tech-Museum/"
                onClick={() => scrollToSection("contact")}
              >
                {t("navbar.contact")}
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" to="/Tech-Museum/blog">
                {t("navbar.blog")}
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" to="/Tech-Museum/4devs">
                {t("navbar.fourdevs")}
              </Link>
            </li>
            
            <li className="dropdown lang-dropdown">
              <Link className="disabled-link">
                <span>
                  {t("navbar.language.label")}{" "}
                  <i className="bi bi-globe-americas"></i>
                </span>
                <i className="bi bi-chevron-right"></i>
              </Link>
              <ul>
                <li className="langs">
                  <a onClick={changeToPortuguese}>
                    {t("navbar.language.portuguese")}
                  </a>
                </li>
                <li className="langs">
                  <a onClick={changeToEnglish}>
                    {t("navbar.language.english")}
                  </a>
                </li>
                <li className="langs">
                  <a onClick={changeToJapanese}>
                    {t("navbar.language.japanese")}
                  </a>
                </li>
              </ul>
            </li>

            {!user ? (
              <li>
                <Link className="nav-link scrollto" to="/Tech-Museum/user-login" style={{ fontWeight: "bold" }}>
                  <i className="bi bi-box-arrow-in-right" style={{ marginRight: '5px' }}></i> Login
                </Link>
              </li>
            ) : (
              <li className="dropdown lang-dropdown">
                <Link className="nav-link scrollto" style={{ cursor: 'pointer', color: '#4154f1', fontWeight: 'bold' }}>
                  <span>
                    <i className="bi bi-person-circle" style={{ marginRight: '5px' }}></i> 
                    Olá, {user.name ? user.name.split(' ')[0] : 'Usuário'}
                  </span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
                <ul>
                  {user.role === 'member' && (
                    <li className="langs">
                      <Link to="/Tech-Museum/dashboard" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <i className="bi bi-speedometer2" style={{ marginRight: '8px' }}></i> Painel
                      </Link>
                    </li>
                  )}
                  <li className="langs">
                    <a onClick={handleLogout} style={{ cursor: "pointer", color: "#dc3545", fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <i className="bi bi-box-arrow-right" style={{ marginRight: '8px' }}></i> Sair
                    </a>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <Link
                className="getstarted scrollto"
                to="/Tech-Museum/"
                onClick={() => scrollToSection("contact")}
              >
                {t("navbar.donate")}
              </Link>
            </li>
          </ul>
          <i
            className={`bi bi-list mobile-nav-toggle ${
              isMobileMenuOpen ? "bi-x" : ""
            }`}
            onClick={toggleMobileMenu}
          ></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;