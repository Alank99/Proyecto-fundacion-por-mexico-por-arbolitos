import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create} from 'react-admin';

export const TicketList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="id_cor" label="coordinador"/>
            <TextField source="categoria"/>
            <TextField source="prioridad"/>
            <TextField source="region"/>
            <TextField source="fecha"/>
            <TextField source="status"/>
            
        </Datagrid>
    </List>
);

export const TicketEdit = () => (
    <Edit>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="id_cor" label="coordinador"/>
            <TextField source="prioridad" />
            <TextField source="categoria" />
            <TextField source="subcategoria" />
            <TextField source="descripcion" />
            <TextField source="aula"/>
            <TextInput source="status"/>
            <TextField source="fecha"/>
            <TextField source="region"/>
        </SimpleForm>
    </Edit>
);

export const TicketCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="prioridad" />
            <TextInput source="categoria" />
            <TextInput source="subcategoria" />
            <TextInput source="descripcion" />
            <TextInput source="aula"/>
        </SimpleForm>
    </Create>
);