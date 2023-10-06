import { useGetOne, Error, Loading, useGetList } from 'react-admin';
import { Card, CardContent, CardHeader } from "@mui/material";
//import Chart from 'chart.js';

export const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        <UserProfile />
    </Card>
);


const UserProfile = () => {
    const { data: user, isLoading, error } = useGetList('tickets', {  });

    if (isLoading) return <Loading />;
    if (error) return <Error />;
    if (!user) return null;

    return (
        <ul>
            <li>Name: {user.usuario}</li>
            <li>Email: {user.fullName}</li>
        </ul>
    )
};