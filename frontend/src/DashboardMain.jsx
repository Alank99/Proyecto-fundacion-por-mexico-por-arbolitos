import { Box, Paper, Container, Grid, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
import { format, differenceInDays } from 'date-fns';

const NumTicket = () => {
    const { data, total } = useGetList('tickets', {
        filter: { fecha: 'true', status: 'Pendiente' },
    }, {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'published_at', order: 'ASC' },
    });

    if (!data)
        return (
            <Grid direction="column" container spacing={3}>
                <Grid item>
                    <h2>No hay problemas</h2>
                </Grid>
            </Grid>
        )
    else {
        return (
            <Grid direction="column" container spacing={3}>
                {data.map(record => {
                    const createdDate = new Date(record.fechaCreacion);
                    const currentDate = new Date();
                    const daysSinceCreation = differenceInDays(currentDate, createdDate);

                    return (
                        <Grid item key={record.id}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant='h7'>
                                    {record.descripcion}
                                </Typography>
                                <Typography component="p" variant='body1'>
                                    El aula en la que se levantó el ticket fue en: <i>{record.aula}</i>
                                </Typography>
                                <Typography component="p" variant='body1'>
                                    Días sin resolver: <i>{daysSinceCreation} días </i>
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        )
    }
}

export const MyDashboard = () => (
    <Box sx={{ display: 'flex' }}>
        <Container maxWidth="lg">
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Tickets con más de una semana sin resolver: </Typography>
            <NumTicket />
        </Container>
    </Box>
)
