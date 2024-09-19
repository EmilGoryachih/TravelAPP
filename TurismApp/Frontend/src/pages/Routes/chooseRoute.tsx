import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const attractions = [
    { id: 1, name: 'Вариант поездки 0', location: 'Поезд', icon: '0'},
    { id: 2, name: 'Вариант поездки 1', location: 'Самолет', icon: '1'},
    { id: 3, name: 'Вариант поездки 2', location: 'Blablacar', icon: '2'},
    { id: 4, name: 'Вариант поездки 3', location: 'Метро', icon: '3'},
];

export default function ChooseRoute() {
    const [addedStates, setAddedStates] = useState(Array(attractions.length).fill(true));
    const navigate = useNavigate();

    const goToSettings = () => {
        navigate('/sightseeng');
    };

    const goToRouteCard = () => {
        navigate('/route-card');
    };
    const goToMain = () => {
        navigate('/');
    };

    const handleAddClick = (index) => {
        const newAddedStates = [...addedStates];
        newAddedStates[index] = !newAddedStates[index];
        setAddedStates(newAddedStates);
    };

    return (
        <div className="p-4" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar onClick={goToSettings}>
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                        Вернуться к выбору достопримечательностей
                    </Typography>
                </Toolbar>
            </AppBar>

            <Typography variant="h6" style={{ margin: '20px' }}>
                Выберите маршрут
            </Typography>

            <List>
                {attractions.map((attraction, index) => (
                    <ListItem
                        key={attraction.id}
                        style={{
                            backgroundColor: addedStates[index] ? '#F5F5F6' : '#DEE6FF',
                            margin: '5px 10px',
                            borderRadius: '10px',
                        }}
                        onClick={() => {index ? handleAddClick(index) : goToRouteCard()}}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#8e72dc' }}>{attraction.icon}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={attraction.name} secondary={attraction.location} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" className="mt-4 w-full bg-purple-500 text-white" onClick={goToMain}>
                Домой
            </Button>
        </div>
    );
}
