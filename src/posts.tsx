import { useRecordContext, useRefresh, useNotify, useRedirect, useUnique } from "react-admin";
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, ReferenceInput, TextInput, Create } from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>
};

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

export const PostList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" label='Id de Usuario'/>
            <ReferenceField source="userId" reference="users" link="show" label='Id de usuario'/>
            <TextField source="title" label='Título'/>
            <TextField source="body" label='Cuerpo'/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const PostEdit = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify("Publicación ha sido actualizada");
        redirect("/posts");
        refresh();
    };

    return (
    <Edit title={<PostTitle />} mutationOptions={{onSuccess}}>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput source="id" disabled label='Id'/>
            <ReferenceInput source="userId" reference="users" label="Usuario"/>
            <TextInput source="title" label='Titulo'/>
            <TextInput source="body" multiline rows={5} label='Cuerpo'/>
        </SimpleForm>
    </Edit>
    );
};

export const PostCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const unique = useUnique();

    const onSuccess = () => {
        notify("Publicación ha sido creada");
        redirect("/posts");
        refresh();
    };

    return (
      <Create mutationOptions={{onSuccess}}>
        <SimpleForm  warnWhenUnsavedChanges>
          <ReferenceInput source="userId" reference="users" label='Usuarios'/>
          <TextInput source="title" label='Titulo' validate={unique()}/>
          <TextInput source="body" multiline rows={5} label='Cuerpo'/>
        </SimpleForm>
      </Create>
    );
};