export const categorias = [
    { id: 'Servicios', name: 'Servicios' },
    { id: 'Limpieza', name: 'Limpieza' },
    { id: 'Mantenimiento', name: 'Mantenimiento' },
    { id: 'Seguridad', name: 'Seguridad' },
    { id: 'Otros', name: 'Otros' },
];

export const subcategoria = [
    
    { id: 'luz', name: 'Luz', categorias_id: 'Servicios' },
    { id: 'agua', name: 'Agua', categorias_id: 'Servicios' },
    { id: 'internet', name: 'Internet', categorias_id: 'Servicios' },
    { id: 'limpieza', name: 'Limpieza', categorias_id: 'Limpieza' },
    { id: 'pintura', name: 'Pintura', categorias_id: 'Mantenimiento' },
    { id: 'plomeria', name: 'Plomeria', categorias_id: 'Mantenimiento' },
    { id: 'seguridad', name: 'Seguridad', categorias_id: 'Seguridad' },
    { id: 'otros', name: 'Otros', categorias_id: 'Otros' },
];

export const prioridad = [
    { id: 'baja', name: 'Baja' },
    { id: 'media', name: 'Media' },
    { id: 'alta', name: 'Alta' },
];

export const region = [
    {id:"cdmx", name:"cdmx"},
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
    {id:"Abierto", name:"Abierto"},
    {id:"Resuelto", name:"Resuelto"},
];

export const nivel = [
    {id:"local", name:"Local"},
    {id:"nacional", name:"Nacional"},
    {id:"ejecutivo", name:"Ejecutivo"},
];