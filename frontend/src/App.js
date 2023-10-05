import React from 'react';
import {  Route} from 'react-router-dom';
import { Admin, Resource, CustomRoutes} from 'react-admin';
import { TicketList, TicketEdit, TicketCreate, TicketShow } from './TicketList';
import {ComentariosList,Comentarioscreate} from './ComentarioList';
import { dataProvider } from "./dataProvider";
import { i18nProvider } from './i18nProvider.tsx';
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import { MyLayout } from './CustomLayout';

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
