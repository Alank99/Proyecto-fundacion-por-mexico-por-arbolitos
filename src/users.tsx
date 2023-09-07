import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, UrlField } from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" label='Id'/>
                    <TextField source="name" label='Nombre'/>
                    <TextField source="username" label='Usuario'/>
                    <EmailField source="email" label='Correo electrónico'/>
                    <TextField source="address.street" label='Calle'/>
                    <TextField source="phone" label='Teléfono'/>
                    <UrlField source="website" label='Página Web'/>
                    <TextField source="company.name" label='Compañía'/>
                </Datagrid>
            )}
        </List>
    );
};