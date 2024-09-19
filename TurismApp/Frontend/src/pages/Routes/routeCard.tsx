import {
    Container,
    Typography,
    Avatar,
    Box,
    List,
    ListItemAvatar,
    ListItemText,
    Paper, ListItem, Button, Toolbar, IconButton, AppBar
} from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import YMap from "../../components/Map/YMap.tsx";
import * as React from "react";

export default function RouteCard() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            setProfile(JSON.parse(savedData));
        }
    }, []);
    const user = {
        name: 'Мария Ильина',
        age: 18,
        gender: 'Женщина',
        avatar: 'https://example.com/avatar.jpg', // replace with actual avatar link
    };

    const destinations = [
        { id: 1, name: 'Музей истории космонавтики', location: 'Калуга', icon: 'М', isChoose: 0 },
        { id: 2, name: 'KFL Arena', location: 'Калуга', icon: 'К', isChoose: 0 },
        { id: 3, name: 'Площадь Победы', location: 'Калуга', icon: 'П', isChoose: 0 },
        { id: 5, name: 'Дом-музей А.Л.Чижевского ', location: 'Калуга', icon: 'Д', isChoose: 0 },
        { id: 6, name: 'Дом Г.С.Батенькова ', location: 'Калуга', icon: 'Д', isChoose: 0 },
        { id: 7, name: 'Палаты Коробовых ', location: 'Калуга', icon: 'П', isChoose: 0 },
    ];

    const navigate = useNavigate();  // Hook for navigation

    const goToChooseRoute = () => {
        navigate('/choose-route');
    };
    const goToChat = () => {
        navigate('/chat');
    };

    const goToPay = () => {
        navigate('/pay');
    };

    return (
        <Container maxWidth="sm" style={{ padding: '20px' }}>
            {/* Header */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar onClick={goToChooseRoute}>
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                        Вернуться к маршрутам
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                    <Typography variant="h6">{user.name}</Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Paper elevation={3} sx={{ padding: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    Поездка по Калуге
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Тег: кибер-спортсмены, туристы, 1 день, история
                </Typography>
                <Typography variant="body1" paragraph>
                    Мы рады, что выбрали наш сервис, ведь мы можем предложить самый выгодный тур с посещением главных интересных мест этого города.
                </Typography>
                <Typography>
                    Имеено здесь вы сможете увидеть самые прекрасные пейзажи, рассветы и простую жизнь.
                    У вас есть возможность пройтись по главнымдостопримечательностям города, узнать его историю и насладиться культурным отдыхом.
                </Typography>

                {/* Destination List */}
                <List>
                    {destinations.map((attraction) => (
                        <ListItem
                            key={attraction.id}
                            style={{
                                backgroundColor: '#F5F5F6',
                                margin: '5px 10px',
                                borderRadius: '10px',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#8e72dc' }}>{attraction.icon}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={attraction.name} secondary={attraction.location} />
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={goToChat}
                                sx={{ marginRight: '8px' }}
                            >
                                Чат
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={goToPay}
                            >
                                Оплата
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <YMap/>
        </Container>
    );
}
