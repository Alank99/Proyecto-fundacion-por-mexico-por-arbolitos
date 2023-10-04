import { Datagrid, List, TextField, Edit, SimpleForm, TextInput,Create,SelectInput} from 'react-admin';
import {useState,useEffect} from 'react';
import {categorias, subcategoria, prioridad,status} from './formato_ticket';


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
      <TextField source="id" label="ID" />
      <TextField source="id_cor" label="Coordinador" />
      <TextField source="prioridad" label="Prioridad" />
      <TextField source="categoria" label="Categoría" />
      <TextField source="subcategoria" label="Subcategoría" />
      <TextField source="descripcion" label="Descripción" />
      <TextField source="aula" label="Aula" />
      <SelectInput source="status" label="Estado" choices={status} />
      <TextField source="fecha" label="Fecha" />
      <TextField source="region" label="Región" />
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

export const TicketCreate = () => {
  const [categoriaSec, setCategoriasSec] = useState("");
  const [subcategoriaSec, setSubcategoriasSec] = useState([]);
  const [showSubcategoria, setShowSubcategoria] = useState(false);

  useEffect(() => {
    if (categoriaSec) {
      const subcategoriaFiltered = subcategoria.filter((subcat) => subcat.categorias_id === categoriaSec);
      setSubcategoriasSec(subcategoriaFiltered);
      setShowSubcategoria(true); // Mostrar el campo de subcategoría
    } else {
      setSubcategoriasSec([]);
      setShowSubcategoria(false); // Ocultar el campo de subcategoría
    }
  }, [categoriaSec]);

  const categoriaDefaultOption = { id: '', name: 'Seleccione una categoría' };
  const subcategoriaDefaultOption = { id: '', name: 'Seleccione una categoría primero' };
  const prioridadDefaultOption = { id: '', name: 'Seleccione una prioridad' };

  return (
    <Create>
      <SimpleForm>
        <SelectInput  source="prioridad" choices={[prioridadDefaultOption, ...prioridad]} />
        <SelectInput
          source="categoria"
          choices={[categoriaDefaultOption, ...categorias]}
          onChange={(e) => {
            setCategoriasSec(e.target.value);
            // Restablece el campo de subcategoría cuando se cambia la categoría
            setShowSubcategoria(false);
          }}
        />
        {showSubcategoria && (
          <SelectInput
            source="subcategoria"
            choices={[subcategoriaDefaultOption, ...subcategoriaSec.map((subcat) => ({ id: subcat.id, name: subcat.name }))]}
          />
        )}
        <TextInput source="descripcion" />
        <TextInput source="aula" />
      </SimpleForm>
    </Create>
  );
};