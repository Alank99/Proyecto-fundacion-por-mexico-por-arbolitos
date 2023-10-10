import {Chart as ChartJS,RadialLinearScale, ArcElement,Tooltip,Legend,} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import host from './const.js'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const TicketsPorRegion = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://${host}:1337/ticketsporregion`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authentication': localStorage.getItem("auth"),
            },
          });
  
          if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData); // Almacena los datos en el estado del componente
          } else {
            console.error('Error al obtener datos del servidor:', response.statusText);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
  
      fetchData();
    }, []); // El array vacío asegura que se ejecute solo una vez después del montaje inicial
  
    const regiones = data.map(item => item._id);
    const totalTickets = data.map(item => item.totalTickets);
  
    const chartData = {
      labels: regiones,
      datasets: [
        {
          label: 'Total de Tickets',
          data: totalTickets,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    
  
    return (
      <div>
        <h2>Gráfico de Tickets por Región</h2>
        <PolarArea data={chartData}  />
      </div>
    );
  };
  
  
  