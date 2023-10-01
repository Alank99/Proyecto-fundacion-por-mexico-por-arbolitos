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

/*
const auth = JSON.parse(localStorage.getItem('identity'));
console.log(auth);

const TicketEditLocal = () => (
  <Edit>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="id_cor" label="coordinador" />
      <TextField source="prioridad" />
      <TextField source="categoria" />
      <TextField source="subcategoria" />
      <TextField source="descripcion" />
      <TextField source="aula" />
      <TextField source="status" />
      <TextField source="fecha" />
      <TextField source="region" />
      <p>Si funciona para el nivel local</p>
    </SimpleForm>
  </Edit>
);

const TicketEditNacionalEjecutivo = () => (
  <Edit>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="id_cor" label="coordinador" />
      <TextField source="prioridad" />
      <TextField source="categoria" />
      <TextField source="subcategoria" />
      <TextField source="descripcion" />
      <TextField source="aula" />
      <TextInput source="status" />
      <TextField source="fecha" />
      <TextField source="region" />
      <p>Si funciona para el nivel nacional</p>
    </SimpleForm>
  </Edit>
);

export const TicketEdit = () => {
  if (!auth || !auth.nivel) {
    return null;
  }
  if (auth.nivel === 'local') {
    return <TicketEditLocal />;
  } else if (auth.nivel === 'nacional' || auth.nivel === 'ejecutivo') {
    return <TicketEditNacionalEjecutivo />;
  }
};

*/


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