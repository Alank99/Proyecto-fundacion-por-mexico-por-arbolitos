
export const categorias = [
    { id: 'Servicios', name: 'Servicios' },
    { id: 'Digital', name: 'Digital' },
    { id: 'Infraestructura', name: 'Infraestructura' },
    { id: 'Recursos_humanos', name: 'Recursos humanos' },
    { id: 'Beneficiarios', name: 'Beneficiarios' },
    { id: 'Mobiliario', name: 'Mobiliario' },
    { id: 'Seguridad', name: 'Seguridad' },
    { id: 'Materiales', name: 'Materiales' },
    { id: 'Fenomeno_meteorologico', name: 'Fenómeno meteorológico' },
];

export const subcategoria = [
    { id: 'Agua', name: 'Agua', categorias_id: 'Servicios' },
    { id: 'Luz', name: 'Luz', categorias_id: 'Servicios' },
    { id: 'Telefono', name: 'Teléfono', categorias_id: 'Servicios' },
    { id: 'Basura', name: 'Basura', categorias_id: 'Servicios' },
    { id: 'Limpieza_aula', name: 'Limpieza del aula', categorias_id: 'Servicios' },
    { id: 'Internet', name: 'Internet, servidores y equipos', categorias_id: 'Digital' },
    { id: 'Software', name: 'Software', categorias_id: 'Digital' },
    { id: 'Hardware', name: 'Hardware', categorias_id: 'Digital' },
    { id: 'Camaras', name: 'Cámaras de seguridad', categorias_id: 'Digital' },
    { id: 'Soporte_tecnico', name: 'Soporte técnico presencial y remoto', categorias_id: 'Digital' },
    { id: 'Paredes', name: 'Paredes', categorias_id: 'Infraestructura' },
    { id: 'Techo', name: 'Techo', categorias_id: 'Infraestructura' },
    { id: 'Ventanas', name: 'Ventanas', categorias_id: 'Infraestructura' },
    { id: 'Puertas', name: 'Puertas', categorias_id: 'Infraestructura' },
    { id: 'Aulas', name: 'Aulas en general', categorias_id: 'Infraestructura' },
    { id: 'Permisos', name: 'Permisos', categorias_id: 'Recursos_humanos' },
    { id: 'Asistencias', name: 'Asistencias', categorias_id: 'Recursos_humanos' },
    { id: 'Salud', name: 'Salud', categorias_id: 'Recursos_humanos' },
    { id: 'Tramites', name: 'Trámites', categorias_id: 'Recursos_humanos' },
    { id: 'Honorarios', name: 'Honorarios', categorias_id: 'Recursos_humanos' },
    { id: 'Asistencias', name: 'Asistencias', categorias_id: 'Beneficiarios' },
    { id: 'Documentacion', name: 'Documentación', categorias_id: 'Beneficiarios' },
    { id: 'Apoyo_academico', name: 'Apoyo académico', categorias_id: 'Beneficiarios' },
    { id: 'Salud', name: 'Salud', categorias_id: 'Beneficiarios' },
    { id: 'Bulling', name: 'Seguridad, bulling', categorias_id: 'Beneficiarios' },
    { id: 'Sillas', name: 'Sillas, butacas', categorias_id: 'Mobiliario' },
    { id: 'Escritorios', name: 'Escritorios', categorias_id: 'Mobiliario' },
    { id: 'Pizarrones', name: 'Pizarrones', categorias_id: 'Mobiliario' },
    { id: 'Cafeteria', name: 'Cafetería', categorias_id: 'Mobiliario' },
    { id: 'Estantes', name: 'Estantes, archiveros', categorias_id: 'Mobiliario' },
    { id: 'Delincuencia', name: 'Delincuencia', categorias_id: 'Seguridad' },
    { id: 'Robos', name: 'Robos', categorias_id: 'Seguridad' },
    { id: 'Vandalismo', name: 'Vandalismo', categorias_id: 'Seguridad' },
    { id: 'Imagen_institucional', name: 'Imagen institucional', categorias_id: 'Seguridad' },
    { id: 'Educativos', name: 'Educativos', categorias_id: 'Materiales' },
    { id: 'Papeleria', name: 'Papelería', categorias_id: 'Materiales' },
    { id: 'Limpieza', name: 'Limpieza', categorias_id: 'Materiales' },
    { id: 'Inundaciones', name: 'Inundaciones', categorias_id: 'Fenomeno_meteorologico' },
    { id: 'Incendios', name: 'Incendios', categorias_id: 'Fenomeno_meteorologico' },
    { id: 'Sismos', name: 'Sismos', categorias_id: 'Fenomeno_meteorologico' },
];


export const prioridad = [
    { id: 'Baja', name: 'Baja' },
    { id: 'Media', name: 'Media' },
    { id: 'Alta', name: 'Alta' },
];

export const region = [
    {id:"CDMX", name:"CDMX"},
    {id:"Aguascalientes", name:"Aguascalientes"},
    {id:"Baja California", name:"Baja California"},
    {id:"Baja California Sur", name:"Baja California Sur"},
    {id:"Campeche", name:"Campeche"},
    {id:"Chiapas", name:"Chiapas"},
    {id:"Chihuahua", name:"Chihuahua"},
    {id:"Coahuila", name:"Coahuila"},
    {id:"Colima", name:"Colima"},
    {id:"Durango", name:"Durango"},
    {id:"Estado de México", name:"Estado de México"},
    {id:"Guanajuato", name:"Guanajuato"},
    {id:"Guerrero", name:"Guerrero"},
    {id:"Hidalgo", name:"Hidalgo"},
    {id:"Jalisco", name:"Jalisco"},
    {id:"Michoacán", name:"Michoacán"},
    {id:"Morelos", name:"Morelos"},
    {id:"Nayarit", name:"Nayarit"},
    {id:"Nuevo León", name:"Nuevo León"},
    {id:"Oaxaca", name:"Oaxaca"},
    {id:"Puebla", name:"Puebla"},
    {id:"Querétaro", name:"Querétaro"},
    {id:"Quintana Roo", name:"Quintana Roo"},
    {id:"San Luis Potosí", name:"San Luis Potosí"},
    {id:"Sinaloa", name:"Sinaloa"},
    {id:"Sonora", name:"Sonora"},
    {id:"Tabasco", name:"Tabasco"},
    {id:"Tamaulipas", name:"Tamaulipas"},
    {id:"Tlaxcala", name:"Tlaxcala"},
    {id:"Veracruz", name:"Veracruz"},
    {id:"Yucatán", name:"Yucatán"},
    {id:"Zacatecas", name:"Zacatecas"}
];


export const status = [
    {id:"Pendiente", name:"Pendiente"},
    {id:"Resuelto", name:"Resuelto"},
];

export const nivel = [
    {id:"local", name:"Local"},
    {id:"nacional", name:"Nacional"},
    {id:"ejecutivo", name:"Ejecutivo"},
];