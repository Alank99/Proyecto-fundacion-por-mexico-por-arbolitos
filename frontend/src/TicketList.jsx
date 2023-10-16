import { Datagrid, List, ReferenceManyField, TextField, DateField, ReferenceField, Edit, SimpleForm, TextInput, SearchInput, Create,SelectInput, EditButton, TabbedShowLayout, Show, Tab, useGetRecordId, SimpleShowLayout } from 'react-admin';
import {useState,useEffect} from 'react';
import { Chip } from '@mui/material';

//import {Link} from 'react-router-dom';
import {categorias, subcategoria, prioridad, status, region} from './formato_ticket';

import NuevoComentario from "./nuevoComentario.js";
//import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const QuickFilter = ({ label }) => {
  return <Chip sx={{ marginBottom: 1 }} label={label} />;
};

const ticketFilters = [
  <SearchInput source="descripcion" alwaysOn />, 
  <QuickFilter source="fecha" label="Tickets de la Semana" defaultValue={"false"}/>,
  <SelectInput source="status" choices={status} label="Estado del ticket" />,
  <SelectInput source="prioridad" choices={prioridad} label="Prioridad del ticket" />,
  <SelectInput source="region" choices={region} label="Región del ticket"/>,
  <SelectInput source="categoria" choices={categorias} label="Categoría del ticket" />,
];

export const TicketList = () => { //Muestra la lista de tickets

  return (
    <List filters={ticketFilters} sort={{field: 'fechaCreacion', order: 'DESC'}}>
      <Datagrid rowClick="show">
        <ReferenceField source="id_cor" reference="usuarios" label="Usuario" link="show" />
        <TextField source="categoria" label="Categoría" />
        <TextField source="prioridad" />
        <TextField source="region" label="Región" />
        <TextField source="descripcion" label="Contenido" />
        <DateField source="fechaCreacion" label="Fecha de creación" />
        <TextField source="status" label="Estado del ticket" />
        <EditButton />

      </Datagrid>
    </List>
  );
};

export const TicketShow = props => { //Muestra los datos de un ticket al hacer clic en él
  const recordId = useGetRecordId();

  return (
    <Show {...props}>
        <TabbedShowLayout>
          <Tab label="Información">
          {/*Todo el div es para que se separen de una manera visible la información*/}
            <SimpleShowLayout>

            <div style={{ marginBottom: '10px' }}>
              <strong>ID:</strong> <TextField source="id" label="ID" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Usuario:</strong> <ReferenceField source="id_cor" reference="usuarios" label="Usuario" link="show" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Prioridad:</strong> <TextField source="prioridad" label="Prioridad" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Categoría:</strong> <TextField source="categoria" label="Categoría" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Subcategoría:</strong> <TextField source="subcategoria" label="Subcategoría" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Descripción:</strong> <TextField source="descripcion" label="Descripción" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Aula:</strong> <TextField source="aula" label="Aula" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Estado:</strong> <TextField source="status" label="Estado" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Fecha de creación:</strong> <DateField source="fechaCreacion" label="Fecha de creación" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Región:</strong> <TextField source="region" label="Región" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Número de folio:</strong> <TextField source="Numerodefolio" label="Número de folio" />
            </div>

            </SimpleShowLayout>
          </Tab>

          <Tab label="Comentarios">
          {/*Crea una pestaña de comentarios*/}
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

export const TicketEdit = () => (//Edita el estado de un ticket
  <Edit>
    <SimpleForm>
      <div style={{ marginBottom: '10px' }}>
      <strong>ID de ticket: </strong>  <TextField source="id" label="ID" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Usuario: </strong> <ReferenceField source="id_cor" reference="usuarios" label="Usuario" link="show" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Id del usuario: </strong><TextField source="id_cor" label="Coordinador" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Prioridad: </strong><TextField source="prioridad" label="Prioridad" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Categoria: </strong><TextField source="categoria" label="Categoría" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Subcategoria: </strong><TextField source="subcategoria" label="Subcategoría" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Descripcion: </strong><TextField source="descripcion" label="Descripción" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Aula: </strong><TextField source="aula" label="Aula" />
      </div>
      <div style={{ marginBottom: '10px' }}> {/*Solo se puede editar el estado del ticket*/}
        <SelectInput source="status" choices={status} label="Estado" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Fecha de creación: </strong><DateField source="fechaCreacion" label="Fecha de creación" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Región: </strong><TextField source="region" label="Región" />
      </div>
    </SimpleForm>
  </Edit>
);

export const TicketCreate = () => {//Crea un ticket nuevo
  const [categoriaSec, setCategoriasSec] = useState("");
  const [subcategoriaSec, setSubcategoriasSec] = useState([]);
  const [showSubcategoria, setShowSubcategoria] = useState(false);
  const [hasFolio, setHasFolio] = useState(false); 

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
        <div>
          <label>¿Tiene número de folio?</label>
          <input
            type="checkbox"
            checked={hasFolio}
            onChange={(e) => setHasFolio(e.target.checked)}
          />
        </div>

        {hasFolio && (
          <TextInput source="Numerodefolio"  />
        )}
        <TextInput multiline rows={5} fullWidth source="descripcion" />
        <TextInput source="aula" />
      </SimpleForm>
    </Create>
  );
};