import { Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import host from './const.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, LinearScale, BarElement, CategoryScale);
//importacion de las envolturas de las graficas para react

const centeredChartStyle = {
  width: '40%',
  margin: 'auto',
};

//Grafica de tickets resueltos y pendientes
const ChartComponent = () => {
  const [chartData, setChartData] = useState({ Resueltos: 0, Pendientes: 0 });//estado de la grafica

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${host}:1337/ticketsRvsno`, { //se hace la peticion a la api sin uso de react-admin
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': localStorage.getItem("auth"),
          },
        });

        if (response.ok) { //tratamiento de los datos
          const rawData = await response.json();
          const transformedData = {
            Resueltos: rawData["0"] || 0,
            Pendientes: rawData["1"] || 0
          };
          setChartData(transformedData); //setea los datos en el estado de la grafica
        } else {
          console.error('Error al obtener datos del servidor:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();
  }, []);

  const { Resueltos, Pendientes } = chartData; // se extraen los datos del estado con destructuracion

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

  //regresa la grafica en forma de componente de react que espera los datos de la grafica
  return (
    <div style={centeredChartStyle}>
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
  }, []); 

  const regiones = data.map(item => item._id); //se estra las regiones de los datos 
  const totalTickets = data.map(item => item.totalTickets);//se extrae el total de tickets de los datos

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
    <div style={centeredChartStyle}>
      <PolarArea data={chartData} />
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
          "#990000",
          "#009900",
          "#000099",
          "#999900",
          "#990099",
          "#009999", 
          "#800000",
          "#008000",
          "#000080", "#FFA500", "#008080", "#800080", "#808000", "#FF4500", "#4B0082", "#2E8B57",
          "#ADFF2F", "#8A2BE2", "#CD5C5C", "#20B2AA", "#FF6347", "#4682B4", "#DAA520", "#6A5ACD",
          "#8B4513", "#8B0000", "#2F4F4F", "#00CED1", "#D2691E", "#556B2F", "#B22222","#9932CC",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={centeredChartStyle}>
      <Bar data={chartData} />
    </div>
  );
};

export { ChartComponent, TicketsTop5, TicketsPorRegion };
