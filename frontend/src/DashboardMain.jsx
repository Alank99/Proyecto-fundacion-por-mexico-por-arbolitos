import { Box, Paper, Container, Grid, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
import { differenceInDays } from 'date-fns';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const NumTicket = () => { //Muestra el número de tickets que llevan más de una semana sin resolverse
    const { data, total } = useGetList('tickets', {
        filter: { fecha: 'true', status: 'Pendiente' },//llama al query para filtrar los tickets que llevan más de una semana sin resolverse
    }, {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'published_at', order: 'ASC' },
    });

    if (!total)//Si no hay datos, muestra que no hay problemas
        return (
            <Grid item>
                <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="h1" variant='h7'>
                        ¡Felicidades, no tienes Tickets atrasados!
                    </Typography>
                </Paper>
            </Grid>
        )
    else { //Formato de los tickets que llevan más de una semana sin resolverse
        return (
            <Grid direction="column" container spacing={3}>
                {data.map(record => {
                    const createdDate = new Date(record.fechaCreacion); //fecha del ticket
                    const currentDate = new Date();//fecha actual
                    const daysSinceCreation = differenceInDays(currentDate, createdDate);//cuanto a pasado desde que se creó el ticket

                    return (
                        <Grid item key={record.id}>
                            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {record.prioridad === 'Alta' && <PriorityHighIcon color="error" style={{ fontSize: '50px' }} />}
                                        {record.prioridad === 'Media' && <PriorityHighIcon color="warning" style={{ fontSize: '50px' }} />}
                                        {record.prioridad === 'Baja' && <PriorityHighIcon color="info" style={{ fontSize: '50px' }} />}
                                    </div>
                                    <div>
                                        <Typography component="h1" variant='h7'>
                                            {record.descripcion}
                                        </Typography>
                                        <Typography component="p" variant='body1'>
                                            El aula en la que se levantó el ticket fue en: <i>{record.aula}</i>
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <AccessTimeIcon style={{ marginRight: '8px' }} />
                                    <Typography component="p" variant='body1'>
                                        {daysSinceCreation} días activo
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        )
    }
}

export const MyDashboard = () => ( //La página principal del administrador para la sección de tablero
    <Box sx={{ display: 'flex' }}>
        <Container maxWidth="lg">
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Tickets con más de una semana sin resolver: </Typography>
            <NumTicket />
        </Container>
    </Box>
)
