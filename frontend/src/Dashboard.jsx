import { Tabs, Tab, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {useState} from 'react'
import { usePermissions } from 'react-admin';
import {ChartComponent, TicketsTop5 ,TicketsPorRegion} from './GraficasDashboard.jsx';
import {MyDashboard} from "./DashboardMain.jsx"

function CustomTabPanel(props) { //Pestañas del tablero
  const { children, value, index, ...other } = props; //Se obtienen los valores de las pestañas

   //Cada pestaña tiene un índice y un valor, si el valor es igual al índice, se muestra la pestaña
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (//Si el valor es igual al índice, se muestra la pestaña
      //Se muestra el contenido de la pestaña
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography> 
        </Box>
      )}
    </div>
  );
}
  
//Se define el tipo de dato de las pestañas
CustomTabPanel.propTypes = { 
  children: PropTypes.node, //requerie un nodo de react
  index: PropTypes.number.isRequired,//requiere un número
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {  //Propiedades de accesibilidad de las pestañas
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Dashboard = () => {
    const [value, setValue] = useState(0); //Valor inicial de las pestañas
    const { permissions } = usePermissions();//consigue el permiso del usuario
  
    const tabs = [ //llama los componentes de las graficas 
      { label: 'Principal', component: <MyDashboard />},
      { label: 'Tickets Resueltos', component: <ChartComponent /> },
      { label: 'Top 5 de Regiones con ticket', component: <TicketsTop5 /> },
      { label: 'Tickets por región', component: <TicketsPorRegion /> },
    ];
  
    // Filtra las pestañas basándose en los permisos del usuario
    const filteredTabs = permissions === 'ejecutivo' ? tabs : [tabs[0], tabs[1]];
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return ( //Muestra las pestañas
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Tablero" variant='scrollable' scrollButtons='auto'>
            {filteredTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
  
        {filteredTabs.map((tab, index) => ( //renderiza las pestañas con su contenido de acurdo con el filtro
          value === index && (
            <CustomTabPanel key={index} value={value} index={index}>
              {tab.component}
            </CustomTabPanel>
          )
        ))}
      </Box>
    );
  };
  