import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

import activeLiveSvg from '../../assets/types/active-live.svg';
import campingSvg from '../../assets/types/camping.svg';
import eventsSvg from '../../assets/types/events.svg';
import governmentSvg from '../../assets/types/government.svg';
import historicalSvg from '../../assets/types/historical.svg';
import museumSvg from '../../assets/types/museum.svg';
import parksSvg from '../../assets/types/parks.svg';
import religionSvg from '../../assets/types/religion.svg';
import sightseenSvg from '../../assets/types/sightseen.svg';
import {sendDataToRegistrationEndpoint} from "../../API/Reg.tsx";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const TypesBox = styled(Box)(({  }) => ({
    width: '100%',
    padding: '5%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#c2e59c',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #64b3f4, #c2e59c)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #64b3f4, #c2e59c)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}));

const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    marginBottom: theme.spacing(4),
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));

const itemData = [
    { id: 1, icon: activeLiveSvg, title: 'Активный отдых' },
    { id: 2, icon: campingSvg, title: 'Кемпинг' },
    { id: 3, icon: eventsSvg, title: 'События' },
    { id: 4, icon: governmentSvg, title: 'Государственные учреждения' },
    { id: 5, icon: historicalSvg, title: 'История' },
    { id: 6, icon: museumSvg, title: 'Музеи' },
    { id: 7, icon: parksSvg, title: 'Парки и сады' },
    { id: 8, icon: religionSvg, title: 'Религия' },
    { id: 9, icon: sightseenSvg, title: 'Памятники' },
];

function BasicMasonry() {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleClick = (item) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
        console.log(selectedItems.map(item => itemData.find(i => i.id === item)?.title));
    };

    const handleSubmit = async () => {
        if (selectedItems.length === 0) {
            return;
        }

        try {
            const selectedInterests = selectedItems.map(item => itemData.find(i => i.id === item)?.title);

            // Get existing userData or create an empty object if it doesn't exist
            let userData = JSON.parse(localStorage.getItem('userData') || '{}');

            // Remove the previous selectedInterests if they exist
            userData.selectedInterests = [];

            // Add the new selectedInterests
            userData.selectedInterests.push(...selectedInterests);

            // Save the updated userData back to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Send data to the API
            const userId = await sendDataToRegistrationEndpoint();

            if (userId) {
                console.log('User registered successfully. UserId:', userId);
                // Redirect to home page
                navigate("/");
            } else {
                console.error('Failed to register user.');
            }

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };



    return (
        <TypesBox>
            <Title>Точки интереса</Title>
            <Masonry columns={2} spacing={2}>
                {itemData.map((item) => (
                    <Item key={item.id} onClick={() => handleClick(item)} elevation={2}
                          sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={item.icon} alt={item.title} style={{ width: '60px', height: '60px', alignSelf: 'center'}} />
                        <Typography variant="subtitle1" color="primary" align="center">
                            {item.title}
                        </Typography>
                    </Item>
                ))}
            </Masonry>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Поехали!
            </Button>
        </TypesBox>
    );
}

export default BasicMasonry;
