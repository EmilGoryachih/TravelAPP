import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from '../../pages/Routes/cities';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddCity() {
    const [selectedCity, setSelectedCity] = useState('');
    const [route, setRoute] = useState([]);

    const handleAddCityToRoute = () => {
        if (selectedCity && !route.includes(selectedCity)) {
            setRoute([...route, selectedCity]);
        }
    };

    const handleRemoveCityFromRoute = (cityToRemove) => {
        setRoute(route.filter(city => city !== cityToRemove));
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold">Укажите город</h1>
            <div className="flex flex-row items-center space-x-2 mt-4">
                <Autocomplete
                    disablePortal
                    options={cities}
                    className="w-72"
                    value={selectedCity}
                    onChange={(_event, newValue) => setSelectedCity(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Город" variant="outlined" size="small" />
                    )}
                />
                <AddCircleOutlineIcon
                    onClick={handleAddCityToRoute}
                    className="cursor-pointer"
                    color = "primary"
                />
            </div>
            <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Выбранные города</h3>
                <div className='border p-4 space-y-2 rounded-lg bg-gray-100'>
                    {route.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {route.map((city, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    {city}
                                    <CancelIcon
                                        onClick={() => handleRemoveCityFromRoute(city)}
                                        className="cursor-pointer"
                                        color='primary'
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Не выбрано</p>
                    )}
                </div>
            </div>
        </div>
    );
}
