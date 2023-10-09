import { useGetOne, Error, Loading, useGetList } from 'react-admin';
import { Card, CardContent, CardHeader } from "@mui/material";
import {ChartComponent} from './pruebasgraficos.jsx';
import {TicketsPorRegion} from './grafica2.jsx';

export const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        <ChartComponent/>
        <TicketsPorRegion/>

    </Card>
);


