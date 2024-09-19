import { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FriendsPage() {
    const [addedFriends, setAddedFriends] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Load added friends from localStorage
        const savedAddedFriends = JSON.parse(localStorage.getItem('addedFriends')) || [];
        setAddedFriends(savedAddedFriends);
    }, []);

    const goToMain = () => {
        navigate('/');
    };

    const handleRemoveFriend = (friendId) => {
        // Load added friends from localStorage
        const savedAddedFriends = JSON.parse(localStorage.getItem('addedFriends')) || [];

        // Filter out the friend to be removed
        const updatedAddedFriends = savedAddedFriends.filter(friend => friend.id !== friendId);
        localStorage.setItem('addedFriends', JSON.stringify(updatedAddedFriends));

        // Update state
        setAddedFriends(updatedAddedFriends);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="transparent" elevation={0} className='p-4 flex'>
                <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                    Добавленные друзья
                </Typography>
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={goToMain}>
                    Вернуться на главную
                </Button>
            </AppBar>

            <List>
                {addedFriends.map((friend) => (
                    <ListItem
                        key={friend.id}
                        style={{
                            backgroundColor: '#f7f2fb',
                            margin: '5px 10px',
                            borderRadius: '10px',
                        }}
                        secondaryAction={
                            <IconButton onClick={() => handleRemoveFriend(friend.id)}>
                                <CancelIcon color="secondary" />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#8e72dc' }}>
                                {friend.name.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={friend.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
