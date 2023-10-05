import { Datagrid, List, TextField, Edit, SimpleForm, TextInput,Create,SelectInput, EditButton, SimpleShowLayout, Show } from 'react-admin';


export const ComentariosList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="id_tik" label="Ticket" />
            <TextField source="id_cor" label="Coordinador" />
            <TextField source="descripcion" label="Descripción" />
        </Datagrid>
    </List>
);

export const Comentarioscreate = (props) => (
    <Create >
        <SimpleForm>
            <TextInput source="descripción" label="Descripción" />
            <DisabledInput source="id_tik" label="Ticket" defaultValue= {props.id_tik} />
        </SimpleForm>
    </Create>
);





