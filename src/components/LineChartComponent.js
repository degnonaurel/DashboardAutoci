import React from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComponent = ({ data, selectedBrands }) => {
  const { t } = useTranslation();
  const marques = [...new Set(data.map((item) => item.marque))];
  const mois = [...new Set(data.map((item) => item.mois))];

  const grouped = mois.map((m) => {
    const row = { mois: m };
    marques.forEach((marque) => {
      const record = data.find((d) => d.mois === m && d.marque === marque);
      row[marque] = record ? record.nb_exportees : 0;
    });
    return row;
  });

  return (
    <div>
      <h2>{t("chart2_title")}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={grouped}  margin={{ top: 40, right: 40, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedBrands.map((marque, idx) => (
            <Line
              key={marque}
              type="monotone"
              dataKey={marque}
              stroke={`hsl(${(idx * 37) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;