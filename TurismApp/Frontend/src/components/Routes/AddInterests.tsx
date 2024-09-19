import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import interests from '../../pages/Routes/interests';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddInterests() {
    const [selectedInterest, setSelectedInterest] = useState('');
    const [interestsList, setInterestsList] = useState([]);

    const handleAddInterest = () => {
        if (selectedInterest && !interestsList.includes(selectedInterest)) {
            setInterestsList([...interestsList, selectedInterest]);
        }
    };

    const handleRemoveInterest = (interestToRemove) => {
        setInterestsList(interestsList.filter(interest => interest !== interestToRemove));
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold">Укажите интерес</h1>
            <div className="flex flex-row items-center space-x-2 mt-4">
                <Autocomplete
                    disablePortal
                    options={interests}
                    className="w-72"
                    value={selectedInterest}
                    onChange={(_event, newValue) => setSelectedInterest(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Мне нравится посещать" variant="outlined" size="small" />
                    )}
                />
                <AddCircleOutlineIcon
                    onClick={handleAddInterest}
                    className="cursor-pointer"
                    color = "primary"
                />
            </div>
            <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Выбранные интересы</h3>
                <div className='border p-4 space-y-2 rounded-lg bg-gray-100'>
                    {interestsList.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {interestsList.map((interest, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    {interest}
                                    <CancelIcon
                                        onClick={() => handleRemoveInterest(interest)}
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
