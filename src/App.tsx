import {Admin, Resource, ShowGuesser, Layout, defaultDarkTheme} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users"
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums"
import { PostList, PostEdit, PostCreate } from "./posts";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider.js";

import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import AlbumIcon from "@mui/icons-material/Album";

import MyLoginPage from "./CustomLogin";
import MyLayout from "./CustomLayout";

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider} loginPage={MyLoginPage} layout={MyLayout} >
      <Resource 
          name="posts"
          list={PostList}
          show={ShowGuesser}
          edit={PostEdit}
          create={PostCreate}
          icon={PostIcon}
          options={{label:'Publicaciones'}}
      />
      <Resource
          name="users"
          list={UserList}
          show={ShowGuesser}
          recordRepresentation="name"
          icon={UserIcon}
          options={{label:'Usuarios'}}
      />
      <Resource
        name="albums"
        list={AlbumList}
        show={ShowGuesser}
        edit={AlbumEdit}
        create={AlbumCreate}
        icon={AlbumIcon}
        options={{label:'Álbumes'}}
      />
  </Admin>
);