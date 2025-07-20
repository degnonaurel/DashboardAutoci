import React from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BarChartComponent = ({ data }) => {
  const { t, i18n } = useTranslation();

  const formatCurrency = (value) =>
    i18n.language === "fr"
      ? `${value.toLocaleString("fr-FR")} $CAD`
      : `${value.toLocaleString("en-US")} CAD`;

  return (
    <div>
      <h2>{t("chart1_title")}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} 
  margin={{ top: 40, right: 30, left: 20, bottom: 60 }}

>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="marque" angle={-20} textAnchor="end" interval={12} />


          <YAxis tickFormatter={formatCurrency} domain={[0, 40000]} />
      
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="prix_moyen_cad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;