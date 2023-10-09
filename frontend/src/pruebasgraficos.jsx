import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import host from './const.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({ Resueltos: 0, Pendientes: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${host}:1337/ticketsRvsno`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': localStorage.getItem("auth"),
          },
        });

        if (response.ok) {
          const rawData = await response.json();
          const transformedData = {
            Resueltos: rawData["0"] || 0,
            Pendientes: rawData["1"] || 0
          };
          setChartData(transformedData);
        } else {
          console.error('Error al obtener datos del servidor:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();
  }, []);

  const { Resueltos, Pendientes } = chartData;

  const data = {
    labels: ['Resuelto', 'Pendiente'],
    datasets: [
      {
        label: 'Tickets',
        data: [Resueltos, Pendientes],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div style={{width:'50%', height:'50%'}}>
      <h2>Gráfico de Resueltos vs No Resueltos</h2>
      <Doughnut data={data} />
    </div>
  );
};

export { ChartComponent };