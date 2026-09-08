import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => i18n.changeLanguage(language);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navigation = [
    [t("header.features"), "#features"],
    [t("header.practice"), "#principle"],
    [t("header.about"), "#about"],
  ];

  return (
    <header className="landing-header">
      <div className="landing-container landing-header__inner">
        <Link to="/" className="landing-header__brand" aria-label="OrbiTest">
          <img src={logo} alt="OrbiTest" />
        </Link>

        <nav className="landing-header__nav" aria-label="Основная навигация">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="landing-header__actions">
          <div className="landing-language" aria-label="Выбор языка">
            <button
              type="button"
              className={i18n.language.startsWith("uz") ? "is-active" : ""}
              onClick={() => changeLanguage("uz")}
            >
              UZ
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={i18n.language.startsWith("ru") ? "is-active" : ""}
              onClick={() => changeLanguage("ru")}
            >
              RU
            </button>
          </div>
          <Link className="landing-header__login" to="/Register">
            {t("header.signIn")}
          </Link>
          <Link className="landing-header__signup" to="/SingUp">
            {t("header.signUp")} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="landing-header__menu-button"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`landing-mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <nav aria-label="Мобильная навигация">
          {navigation.map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
        </nav>
        <div className="landing-mobile-menu__footer">
          <Link to="/Register" onClick={closeMenu}>{t("header.signIn")}</Link>
          <Link to="/SingUp" onClick={closeMenu}>
            {t("header.signUp")} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
