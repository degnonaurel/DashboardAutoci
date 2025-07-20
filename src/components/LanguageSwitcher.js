import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>{t("lang")}:</label>{" "}
      <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;