import { useRecordContext, useRefresh, useNotify, useRedirect } from "react-admin";
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, ReferenceInput, TextInput, Create } from "react-admin";

const AlbumTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>
};

const albumFilters = [
  <TextInput source="q" label="Buscar" alwaysOn />,
  <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

export const AlbumList = () => (
  <List filters={albumFilters}>
    <Datagrid rowClick="show">
        <TextField source="userId" label='Id de Usuario'/>
        <ReferenceField source="userId" reference="users" link="show" label='Usuario'/>
        <TextField source="id" label='Id'/>
        <TextField source="title" label='Título'/>
        <EditButton/>
    </Datagrid>
  </List>
);

export const AlbumEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
      notify("Álbum ha sido actualizado");
      redirect("/albums");
      refresh();
  };

  return (
    <Edit title={<AlbumTitle />} mutationOptions={{onSuccess}}>
        <SimpleForm warnWhenUnsavedChanges>
            <ReferenceInput source="userId" reference="users" label="Usuarios"/>
            <TextInput source="id" disabled label='Id'/>
            <TextInput source="title" multiline rows={5} label='Cuerpo'/>
        </SimpleForm>
    </Edit>
  );
};

export const AlbumCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
      notify("Álbum ha sido actualizado");
      redirect("/albums");
      refresh();
  };

  return (
  <Create mutationOptions={{onSuccess}}>
    <SimpleForm warnWhenUnsavedChanges>
      <ReferenceInput source="userId" reference="users" label="Id de Usuario"/>
      <TextInput source="title" multiline rows={5} label='Título'/>
    </SimpleForm>
  </Create>
  );
};