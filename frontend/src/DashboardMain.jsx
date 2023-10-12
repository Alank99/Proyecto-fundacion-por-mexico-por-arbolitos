import { Box, Paper, Container, Grid, Typography } from '@mui/material';
import {useGetList} from 'react-admin'

const NumTicket = () => {
    const {data, total} = useGetList('tickets', {filter:{fecha: 'true', status: 'Pendiente'}},
    { pagination: { page: 1, perPage: 10 }, sort: { field: 'published_at', order: 'ASC' }} );

    if (!data)
        return(
            <Grid item>
                <h2>No hay problemas</h2>
            </Grid>
        )
    else
        {
        return (
            <Grid direction="column" container spacing={3}>
                {data.map(record =>
                    <Grid item>
                        <Paper sx={{p:2, display:'flex', flexDirection:'column'}}>
                            <Typography component="h3" variant='h7' >
                                {record.descripcion}
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        )
    }
}

export const MyDashboard = () => (
    <Box sx={{ display: 'flex' }}>
        <Container maxWidth="lg">
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Tickets con más de una semana sin resolver</Typography>
            <NumTicket />
        </Container>
    </Box>
)