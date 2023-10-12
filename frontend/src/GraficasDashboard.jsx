import { Chart as ChartJS, ArcElement,LinearScale,BarElement,CategoryScale, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import host from './const.js'

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, LinearScale, BarElement,CategoryScale);

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
          'rgba(0, 167, 0, 0.7)', //verde
          'rgba(222, 117, 13, 0.7)', //naranja
        ],
        borderColor: [
          'rgb(0, 167, 0)', //verde
          'rgb(222, 117, 13)', //naranja
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div style={{width:'50%', height:'50%'}}>
      <Doughnut data={data} />
    </div>
  );
};

const TicketsTop5 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${host}:1337/ticketstop5`, {
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
          'rgba(0, 167, 0, 0.7)', //verde
          'rgba(222, 117, 13, 0.7)', //naranja
          'rgba(230, 0, 230, 0.7)', //violeta
          'rgba(171, 105, 38, 0.7)', //cafe
          'rgba(72, 147, 141, 0.7)', //turquesa
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{width:'50%', height:'50%'}}>
      <PolarArea data={chartData}/>
    </div>
  );
};

const TicketsPorRegion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${host}:1337/ticketsPorRegion`, {
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
          'rgba(0, 167, 0, 0.7)', //verde
          'rgba(222, 117, 13, 0.7)', //naranja
          'rgba(230, 0, 230, 0.7)', //violeta
          'rgba(171, 105, 38, 0.7)', //cafe
          'rgba(72, 147, 141, 0.7)', //turquesa
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{width:'50%', height:'50%'}}>
      <Bar data={chartData}/>
    </div>
  );
};

export { ChartComponent, TicketsTop5, TicketsPorRegion };