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

export const mydarktheme = {
  palette: {
    ...defaultDarkTheme.palette,
  },
};

export const mylighttheme = {
  palette: {
    ...defaultLightTheme.palette,
  },
};

export const ThemeToggler = () => {
  const [theme, setTheme] = useTheme();

  const onClick = () => {
    setTheme(theme === mydarktheme ? mylighttheme : mydarktheme);
  };

  return (
    <Button
      style={{ backgroundColor: "#426fa6", color: "white" }}
      onClick={onClick}
    >
      {theme === mydarktheme ? <LightModeIcon /> : <DarkModeIcon />}
      {theme === mydarktheme ? " Cambiar a tema claro" : " Cambiar a tema oscuro"}
    </Button>
  );
};

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();

  return (
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

const MyUserMenu = () => {
    const { identity } = useGetIdentity();

    return (
  <UserMenu>
    <MenuItem>
    <p> <strong> Inició sesión como: </strong> {identity? identity.usuario : 'usuario desconocido'}. </p>
    </MenuItem>
    <MenuItem>
    <p> <strong> Se encuentra en la región de: </strong> {identity? identity.region : 'región desconocida'}. </p>
    </MenuItem>
    <MyLogoutButton />
  </UserMenu>
    );
};  

const MyAppBar = () => (
  <AppBar userMenu={<MyUserMenu />}>
    <ThemeToggler />
    <Box component="span" flex={1} />
  </AppBar>
);

export const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;