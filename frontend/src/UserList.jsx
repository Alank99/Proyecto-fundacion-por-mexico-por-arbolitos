import { Datagrid, List, TextField, Show, SimpleForm,SimpleShowLayout,SelectInput,Create, TextInput, PasswordInput } from 'react-admin';
import { nivel,region } from './formato_ticket';
import { usePermissions, useNotify, useRedirect, useRefresh, useUnique } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="show">
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

  export const UserCreate = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const unique = useUnique();
    const { permissions } = usePermissions();

    const onSuccess = () => {
        notify("Usuario ha sido creado");
        redirect("/us");
        refresh();
    };

    const filtroEstatus = permissions === 'ejecutivo' ? nivel : [nivel[0], nivel[1]];

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="username" label="Usuario" />
                <TextInput source="fullName" label="Nombre Apellido" />
                <PasswordInput source="password" label="Contraseña" />
                <SelectInput source="nivel" label="Nivel" choices={filtroEstatus} />
                <SelectInput source="region" label="Región" choices={region} />
            </SimpleForm>
        </Create>
    );
  };

