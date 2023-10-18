import React from 'react';
import { Route} from 'react-router-dom';
import { Admin, Resource, CustomRoutes} from 'react-admin';
import "./global.css"
import {UserList, UserShow,UserCreate} from "./UserList";
import { TicketList, TicketEdit, TicketCreate, TicketShow } from './TicketList';
import { dataProvider } from "./dataProvider";
import { i18nProvider } from './i18nProvider.tsx';
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import { MyLayout } from './CustomLayout';
import { CustomLogin } from './CustomLogin';  
import { Dashboard } from './Dashboard';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';


//en el app se esta utilizando dataProvider para conseguir los permissions  y darle acceso a los usuarios conforme a su nivel
const App = () =>{
  return(
      <Admin dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18nProvider} layout={MyLayout} loginPage={CustomLogin} dashboard={Dashboard}>
        {permissions => (
          <>
            <CustomRoutes>
              <Route path="/registrarse"  element={<Registrarse />}/>
            </CustomRoutes>
            <Resource name="tickets" list={TicketList} show={TicketShow} edit={permissions=== 'ejecutivo' || permissions === 'nacional' ? TicketEdit : null} create={TicketCreate} icon={ConfirmationNumberIcon}/>
            <Resource name="usuarios" list={permissions==='ejecutivo' ||  permissions === 'nacional' ? UserList : null} show={UserShow} create={permissions === 'ejecutivo' || permissions === 'nacional' ? UserCreate : null} recordRepresentation="fullName" icon={PersonIcon} />
          </>
        )}
      </Admin>
  );
};
export default App;

