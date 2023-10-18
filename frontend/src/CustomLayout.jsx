import * as React from "react";
import { forwardRef } from "react";
import {
  AppBar,
  Layout,
  UserMenu,
  useLogout,
  useTheme,
  useGetIdentity,
  defaultDarkTheme,
  defaultLightTheme,
} from "react-admin";
import { MenuItem, Box } from "@mui/material";
import ExitIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const mydarktheme = { //Define el tema oscuro
  palette: {
    ...defaultDarkTheme.palette,
  },
};

export const mylighttheme = { //Define el tema claro
  palette: {
    ...defaultLightTheme.palette,
  },
};

export const ThemeToggler = () => { //Cambia el tema
  const [theme, setTheme] = useTheme();

  const onClick = () => {
    setTheme(theme === mydarktheme ? mylighttheme : mydarktheme); //Si el tema es oscuro, lo cambia a claro, y viceversa
  };

  return ( //Muestra el botón para cambiar el tema
    <Button
      style={{ backgroundColor: "#426fa6", color: "white" }}
      onClick={onClick}
    >
      {theme === mydarktheme ? <LightModeIcon /> : <DarkModeIcon />}
      {theme === mydarktheme ? " Cambiar a tema claro" : " Cambiar a tema oscuro"}
    </Button>
  );
};

// Es importante pasar la ref para permitir que Material UI gestione la navegación por teclado
const MyLogoutButton = forwardRef((props, ref) => { //Cierra la sesión
  const logout = useLogout();
  const handleClick = () => logout();

  return ( //Muestra el botón para salir de la aplicación
    <MenuItem
      style={{backgroundColor: "#800000", color: "white" }}
      onClick={handleClick}
      ref={ref} 
      // It's important to pass the props to allow Material UI to manage the keyboard navigation
      {...props}
    > 
      <ExitIcon /> Salir de la aplicación 
    </MenuItem>
  );
});

const MyUserMenu = () => { //Muestra el menú del usuario
    const { identity } = useGetIdentity(); 

    return ( //Muestra la información del usuario
  <UserMenu>
    <MenuItem>
    <p> <strong> Inició sesión como: </strong> {identity? identity.usuario : 'usuario desconocido'}. </p>
    </MenuItem>
    <MenuItem>
    <p> <strong> Nivel: </strong> {identity? identity.nivel : 'nivel desconocido'}. </p>
    </MenuItem>
    <MenuItem>
    <p> <strong> Se encuentra en la región de: </strong> {identity? identity.region : 'región desconocida'}. </p>
    </MenuItem>
    <MyLogoutButton />
  </UserMenu>
    );
};  

const MyAppBar = () => ( //Muestra la barra de la aplicación
  <AppBar userMenu={<MyUserMenu />}>
    <ThemeToggler />
    <Box component="span" flex={1} />
  </AppBar>
);

export const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;