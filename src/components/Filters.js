import React from "react";
import { useTranslation } from "react-i18next";

const Filters = ({ moisList, carburantList, selectedMonth, setSelectedMonth, selectedFuel, setSelectedFuel }) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "1rem" }}>
        {t("select_month")} :
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">--</option>
          {moisList.map((mois) => (
            <option key={mois} value={mois}>{mois}</option>
          ))}
        </select>
      </label>
      <label>
        {t("select_fuel")} :
        <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
          <option value="">--</option>
          {carburantList.map((c) => (
            <option key={c} value={c}>{t(`carburant.${c}`)}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;