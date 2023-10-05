import React from 'react';
import { Route} from 'react-router-dom';
import { Admin, Resource, CustomRoutes, ShowGuesser} from 'react-admin';
import "./global.css"
import { TicketList, TicketEdit, TicketCreate } from './TicketList';
import { dataProvider } from "./dataProvider";
import { i18nProvider } from './i18nProvider.tsx';
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import { MyLayout } from './CustomLayout';
import { CustomLogin } from './CustomLogin';  
import { Dashboard } from './Dashboard';

const App = () =>{
  return(
      <Admin dataProvider={dataProvider} authProvider={authProvider}  i18nProvider={i18nProvider} layout={MyLayout}>
        <Resource name="tickets" list={TicketList} show={TicketShow} edit={TicketEdit} create={TicketCreate} />
        <Resource name="comentarios" list={ComentariosList} create={Comentarioscreate} />
        <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
        </CustomRoutes>
      </Admin>
  );
};
export default App;
