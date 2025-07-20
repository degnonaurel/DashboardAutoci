import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BarChartComponent from "./components/BarChartComponent";
import Filters from "./components/Filters";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LineChartComponent from "./components/LineChartComponent";
import "./i18n/i18n";

function App() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    fetch("/export_voitures_12mois_10marques.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1);

        const parsed = rows.map((line) => {
          const [mois, marque, type_carburant, nb_exportees, prix_moyen_cad] = line.split(",");
          return {
            mois,
            marque,
            type_carburant,
            nb_exportees: parseInt(nb_exportees),
            prix_moyen_cad: parseInt(prix_moyen_cad),
          };
        });

        setData(parsed);
        setSelectedBrands([...new Set(parsed.map((d) => d.marque))]);
      });
  }, []);

  useEffect(() => {
    let result = data;
    if (selectedMonth) result = result.filter((d) => d.mois === selectedMonth);
    if (selectedFuel) result = result.filter((d) => d.type_carburant === selectedFuel);
    setFilteredData(result);
  }, [data, selectedMonth, selectedFuel]);

  const moisList = [...new Set(data.map((d) => d.mois))];
  const carburantList = [...new Set(data.map((d) => d.type_carburant))];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{t("title")}</h1>
      <LanguageSwitcher />
      <Filters
        moisList={moisList}
        carburantList={carburantList}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
      />
      <BarChartComponent data={filteredData} />

      {/* 🎯 Filtre de marques pour le graphe en lignes */}
      <div style={{ margin: "2rem 0" }}>
        <strong>{t("select_brands") || "Marques à afficher :"}</strong>
        <div style={{ marginTop: "0.5rem" }}>
          {Array.from(new Set(data.map((d) => d.marque))).map((marque) => (
            <label key={marque} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                value={marque}
                checked={selectedBrands.includes(marque)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setSelectedBrands([...selectedBrands, marque]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((m) => m !== marque));
                  }
                }}
              />
              {" " + marque}
            </label>
          ))}
        </div>
      </div>

      <LineChartComponent data={data} selectedBrands={selectedBrands} />
    </div>
  );
}

export default App;
