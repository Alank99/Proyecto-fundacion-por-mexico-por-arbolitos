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
        <div style={{ marginBottom: '10px' }}>
            <strong>ID:</strong> <TextField source="id" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <strong>Nombre Completo:</strong> <TextField source="fullName" label="Nombre Completo" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <strong>Nivel:</strong> <TextField source="nivel" label="Nivel" />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <strong>Región:</strong> <TextField source="region" label="Región" />
        </div>
        </SimpleShowLayout>
    </Show>
  );