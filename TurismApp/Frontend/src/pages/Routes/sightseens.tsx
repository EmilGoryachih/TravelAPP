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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';


const attractions = [
    { id: 1, name: 'Музей истории космонавтики', location: 'Калуга', icon: 'М', isChoose: 0 },
    { id: 2, name: 'KFL Arena', location: 'Калуга', icon: 'К', isChoose: 0 },
    { id: 3, name: 'Площадь Победы', location: 'Калуга', icon: 'П', isChoose: 0 },
    { id: 5, name: 'Дом-музей А.Л.Чижевского ', location: 'Калуга', icon: 'Д', isChoose: 0 },
    { id: 6, name: 'Дом Г.С.Батенькова ', location: 'Калуга', icon: 'Д', isChoose: 0 },
    { id: 7, name: 'Палаты Коробовых ', location: 'Калуга', icon: 'П', isChoose: 0 },
    { id: 8, name: 'Казанский моностырь ', location: 'Калуга', icon: 'К', isChoose: 0 },
    { id: 9, name: 'Дом музыки ', location: 'Калуга', icon: 'Д', isChoose: 0 },
    { id: 10, name: 'Театр юного ззрителя ', location: 'Калуга', icon: 'Т', isChoose: 0 },

];

export default function RoutePage() {
    const [addedStates, setAddedStates] = useState(Array(attractions.length).fill(true)); // Array to track state for each item
    const navigate = useNavigate();  // Hook for navigation

    const goToSettings = () => {
        navigate('/settings');
    };

    const goToChoosing = () => {
        navigate('/choose-route');
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
                        Вернуться к настройкам маршрута
                    </Typography>
                </Toolbar>
            </AppBar>

            <Typography variant="h6" style={{ margin: '20px' }}>
                Выберите достопримечательности
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
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#8e72dc' }}>{attraction.icon}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={attraction.name} secondary={attraction.location} />
                        <Button size="small" color="primary" onClick={() => handleAddClick(index)}>
                            {addedStates[index] ?
                                <AddCircleOutlineIcon /> :
                                <CancelIcon />}
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" className="mt-4 w-full bg-purple-500 text-white" onClick={goToChoosing}>
                Показать маршруты
            </Button>
        </div>
    );
}
