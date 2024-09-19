import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from './cities';
import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RouteCard from '../../components/Card/RouteCard';
import {useNavigate} from 'react-router-dom';

export default function ComboBox() {
  const navigate = useNavigate();  // Хук для навигации

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <>
      <Typography variant="h6" color="text" component="h6">Избранные маршруты</Typography>
      <Stack direction="column" spacing={2}>
        <Autocomplete
          disablePortal
          options={cities}
          renderInput={(params) => <TextField {...params} label="Город"/>}
        />

        <RouteCard title="Экскурсия" city="Санкт-Петербург" onButtonClick={() => {}}/>
        <RouteCard title="Пешая пргулка" city="Москва" onButtonClick={() => {}}/>
      </Stack>

      <div className="absolute left-0 px-6 bottom-16 w-full">
        <Button variant="contained" fullWidth onClick={goToSettings}>Создать маршрут</Button>
      </div>
    </>
  );
}
