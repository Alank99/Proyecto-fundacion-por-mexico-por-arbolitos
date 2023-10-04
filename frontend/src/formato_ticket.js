export const categorias = [
    { id: 'Servicios', name: 'Servicios' },
    { id: 'Limpieza', name: 'Limpieza' },
    { id: 'Mantenimiento', name: 'Mantenimiento' },
    { id: 'Seguridad', name: 'Seguridad' },
    { id: 'Otros', name: 'Otros' },
];

export const subcategoria = [
    
    { id: 'luz', name: 'luz', categorias_id: 'Servicios' },
    { id: 'agua', name: 'agua', categorias_id: 'Servicios' },
    { id: 'internet', name: 'internet', categorias_id: 'Servicios' },
    { id: 'limpieza', name: 'limpieza', categorias_id: 'Limpieza' },
    { id: 'pintura', name: 'pintura', categorias_id: 'Mantenimiento' },
    { id: 'plomeria', name: 'plomeria', categorias_id: 'Mantenimiento' },
    { id: 'seguridad', name: 'seguridad', categorias_id: 'Seguridad' },
    { id: 'otros', name: 'otros', categorias_id: 'Otros' },
];

export const prioridad = [
    { id: 'baja', name: 'baja' },
    { id: 'media', name: 'media' },
    { id: 'alta', name: 'alta' },
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