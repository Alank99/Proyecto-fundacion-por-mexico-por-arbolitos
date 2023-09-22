import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, useTheme, defaultDarkTheme, defaultLightTheme } from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

export const mydarktheme = {
    palette: defaultDarkTheme.palette
}

export const mylighttheme = {
    palette: defaultLightTheme.palette
}

export const ThemeToggler = () => {
    const [theme, setTheme] = useTheme();

    const onClick = () => {
        setTheme(theme === mydarktheme ? mylighttheme : mydarktheme);
    }
        
    return (
        <Button onClick={onClick}>
            {theme === mydarktheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        </Button>
    );
}

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <ExitIcon />  Regresar a Inicio
        </MenuItem>
    );
});

const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar = () => (
    <AppBar userMenu={<MyUserMenu />}>
        <ThemeToggler/>
    </AppBar>
);

export const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);