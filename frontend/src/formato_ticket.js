
export const categorias = [
    { id: 'servicios', name: 'Servicios' },
    { id: 'digital', name: 'Digital' },
    { id: 'infraestructura', name: 'Infraestructura' },
    { id: 'recursos_humanos', name: 'Recursos humanos' },
    { id: 'beneficiarios', name: 'Beneficiarios' },
    { id: 'mobiliario', name: 'Mobiliario' },
    { id: 'seguridad', name: 'Seguridad' },
    { id: 'materiales', name: 'Materiales' },
    { id: 'fenomeno_meteorologico', name: 'Fenómeno meteorológico' },
];

export const subcategoria = [
    
    { id: 'agua', name: 'Agua', categorias_id: 'servicios' },
    { id: 'luz', name: 'Luz', categorias_id: 'servicios' },
    { id: 'telefono', name: 'Teléfono', categorias_id: 'servicios' },
    { id: 'basura', name: 'Basura', categorias_id: 'servicios' },
    { id: 'limpieza_aula', name: 'Limpieza del aula', categorias_id: 'servicios' },

    { id: 'internet', name: 'Internet, servidores y equipos', categorias_id: 'digital' },
    { id: 'software', name: 'Software', categorias_id: 'digital' },
    { id: 'hardware', name: 'Hardware', categorias_id: 'digital' },
    { id: 'camaras', name: 'Cámaras de seguridad', categorias_id: 'digital' },
    { id: 'soporte_tecnico', name: 'Soporte técnico presencial y remoto', categorias_id: 'digital' },

    { id: 'paredes', name: 'Paredes', categorias_id: 'infraestructura' },
    { id: 'techo', name: 'Techo', categorias_id: 'infraestructura' },
    { id: 'ventanas', name: 'Ventanas', categorias_id: 'infraestructura' },
    { id: 'puertas', name: 'Puertas', categorias_id: 'infraestructura' },
    { id: 'aulas', name: 'Aulas en general', categorias_id: 'infraestructura' },

    { id: 'permisos', name: 'Permisos', categorias_id: 'recursos_humanos' },
    { id: 'asistencias', name: 'Asistencias', categorias_id: 'recursos_humanos' },
    { id: 'salud', name: 'Salud', categorias_id: 'recursos_humanos' },
    { id: 'tramites', name: 'Trámites', categorias_id: 'recursos_humanos' },
    { id: 'honorarios', name: 'Honorarios', categorias_id: 'recursos_humanos' },

    { id: 'asistencias', name: 'Asistencias', categorias_id: 'beneficiarios' },
    { id: 'documentacion', name: 'Documentación', categorias_id: 'beneficiarios' },
    { id: 'apoyo_academico', name: 'Apoyo académico', categorias_id: 'beneficiarios' },
    { id: 'salud', name: 'Salud', categorias_id: 'beneficiarios' },
    { id: 'bulling', name: 'Seguridad, bulling', categorias_id: 'beneficiarios' },

    { id: 'sillas', name: 'Sillas, butacas', categorias_id: 'mobiliario' },
    { id: 'escritorios', name: 'Escritorios', categorias_id: 'mobiliario' },
    { id: 'pizarrones', name: 'Pizarrones', categorias_id: 'mobiliario' },
    { id: 'cafeteria', name: 'Cafetería', categorias_id: 'mobiliario' },
    { id: 'estantes', name: 'Estantes, archiveros', categorias_id: 'mobiliario' },

    { id: 'delincuencia', name: 'Delincuencia', categorias_id: 'seguridad' },
    { id: 'robos', name: 'Robos', categorias_id: 'seguridad' },
    { id: 'vandalismo', name: 'Vandalismo', categorias_id: 'seguridad' },
    { id: 'imagen_institucional', name: 'Imagen institucional', categorias_id: 'seguridad' },

    { id: 'educativos', name: 'Educativos', categorias_id: 'materiales' },
    { id: 'papeleria', name: 'Papelería', categorias_id: 'materiales' },
    { id: 'limpieza', name: 'Limpieza', categorias_id: 'materiales' },

    { id: 'inundaciones', name: 'Inundaciones', categorias_id: 'fenomeno_meteorologico' },
    { id: 'incendios', name: 'Incendios', categorias_id: 'fenomeno_meteorologico' },
    { id: 'sismos', name: 'Sismos', categorias_id: 'fenomeno_meteorologico' },
];

export const prioridad = [
    { id: 'baja', name: 'Baja' },
    { id: 'media', name: 'Media' },
    { id: 'alta', name: 'Alta' },
];

export const region = [
    {id:"cdmx", name:"CDMX"},
    {id:"Estado de México", name:"Estado de México"},
    {id:"Morelos", name:"Morelos"},
    {id:"Puebla", name:"Puebla"},
    {id:"Querétaro", name:"Querétaro"},
    {id:"Hidalgo", name:"Hidalgo"},
    {id:"Tlaxcala", name:"Tlaxcala"},
    {id:"Guerrero", name:"Guerrero"},
    {id:"Oaxaca", name:"Oaxaca"},
    {id:"Veracruz", name:"Veracruz"},
    {id:"Tabasco", name:"Tabasco"},
    {id:"Chiapas", name:"Chiapas"},
    {id:"Campeche", name:"Campeche"},
    {id:"Yucatán", name:"Yucatán"},
    {id:"Quintana Roo", name:"Quintana Roo"},
];

export const status = [
    {id:"pendiente", name:"Pendiente"},
    {id:"resuleto", name:"Resuelto"},
];

export const nivel = [
    {id:"local", name:"Local"},
    {id:"nacional", name:"Nacional"},
    {id:"ejecutivo", name:"Ejecutivo"},
];