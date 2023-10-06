import { Datagrid, List, TextField, Show, SimpleShowLayout } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="fullName" label="Nombre Completo"/>
            <TextField source="nivel" label="Nivel"/>
            <TextField source="region" label="Región"/>
        </Datagrid>
    </List>
);

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="fullName" label="Nombre Completo"/>
            <TextField source="nivel" label="Nivel"/>
            <TextField source="region" label="Región"/>
        </SimpleShowLayout>
    </Show>
  );