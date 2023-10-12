import { Tabs, Tab, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {useState} from 'react'
import { usePermissions } from 'react-admin';
import {ChartComponent, TicketsTop5 ,TicketsPorRegion} from './GraficasDashboard.jsx';
import {MyDashboard} from "./DashboardMain.jsx"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
  
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Dashboard = () => {
    const [value, setValue] = useState(0);
    const { permissions } = usePermissions();
  
    const tabs = [
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
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Tablero" variant='scrollable' scrollButtons='auto'>
            {filteredTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
  
        {filteredTabs.map((tab, index) => (
          value === index && (
            <CustomTabPanel key={index} value={value} index={index}>
              {tab.component}
            </CustomTabPanel>
          )
        ))}
      </Box>
    );
  };
  