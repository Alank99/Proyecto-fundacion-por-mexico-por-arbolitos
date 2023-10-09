import { Datagrid, List, ReferenceManyField, TextField, DateField, ReferenceField, Edit, SimpleForm, TextInput ,Create,SelectInput, EditButton, TabbedShowLayout, Show, Tab, useGetRecordId } from 'react-admin';
import {useState,useEffect} from 'react';

//import {Link} from 'react-router-dom';
import {categorias, subcategoria, prioridad,status} from './formato_ticket';

import NuevoComentario from "./nuevoComentario.js";
//import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export const TicketList = () => {

  return (
    <List >
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ReferenceField source="id_cor" reference="usuarios" label="Usuario" link="show" />
        <TextField source="categoria" label="Categoría" />
        <TextField source="prioridad" />
        <TextField source="region" label="Región" />
        <DateField source="fechaCreacion" label="Fecha de creación" />
        <TextField source="status" label="Estado del ticket" />
        <EditButton />

      </Datagrid>
    </List>
  );
};

export const TicketShow = props => {
  const recordId = useGetRecordId();

  return (
    <Show {...props}>
        <TabbedShowLayout>
          <Tab label="Información">
            <TextField source="id" label="ID" />
            <ReferenceField source="id_cor" reference="usuarios" label='Usuario' link="show" />
            <TextField source="prioridad" label="Prioridad" />
            <TextField source="categoria" label="Categoría" />
            <TextField source="subcategoria" label="Subcategoría" />
            <TextField source="descripcion" label="Descripción" />
            <TextField source="aula" label="Aula" />
            <TextField source="status" label="Estado" />
            <DateField source="fechaCreacion" label="Fecha de creación" />
            <TextField source="region" label="Región" />
          </Tab>
          <Tab label="Comentarios">
            <ReferenceManyField
            addLabel={false}
            reference="comentarios"
            target='id_tik'
            sort={{ field: "fecha", order: "DESC" }}
            >
              <Datagrid>
                <DateField source="fecha" />
                <TextField source="contenido" />
                <ReferenceField source="id_cor" reference="usuarios" label='Usuario' link="show" />
                <EditButton />
              </Datagrid>
            </ReferenceManyField>
            <NuevoComentario id_tik={recordId}/>
          </Tab>
        </TabbedShowLayout>
    </Show>
  );
};

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
      <DateField source="fecha" label="Fecha" />
      <TextField source="region" label="Región" />
    </SimpleForm>
  </Edit>
);

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