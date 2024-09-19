import AddCity from '../../components/Routes/AddCities.tsx';
import AddInterests from '../../components/Routes/AddInterests.tsx';
import {InputBase, Button, Toolbar, IconButton, Typography, AppBar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ComboBox() {
    const navigate = useNavigate();  // Хук для навигации

    const goToSight = () => {
        navigate('/sightseeng');
    };

    const goToMain = () => {
        navigate('/');
    };

    return (
        <div className="p-4">
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar  onClick={goToMain}>
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                        Вернуться на главную
                    </Typography>
                </Toolbar>
            </AppBar>
            <AddCity/>
            <div className="p-4">
                <p className="mb-2 text-lg font-medium">Укажите количество участников</p>
                <InputBase
                    className='border p-2 mt-2 w-full rounded-lg'
                    type="number"
                    placeholder="Введите число"
                />
            </div>
            <div className="p-4">
                <p className="mb-2 text-lg font-medium">Укажите количество дней поездки</p>
                <InputBase
                    className="border p-2 mt-2 w-full rounded-lg"
                    type="number"
                    placeholder="Введите число"
                />
            </div>
            <AddInterests/>
            <Button variant="contained" className="mt-4 w-full bg-purple-500 text-white" onClick={goToSight}>
                Показать варианты
            </Button>
        </div>
    );
}
