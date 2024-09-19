import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Simulating the 'initialFriends' array for this example
import initialFriends from "./initialFriends.tsx";

export default function AddFriend() {
    const [friends, setFriends] = useState(initialFriends); // State for the list of friends
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Load added friends from localStorage
        const savedAddedFriends = JSON.parse(localStorage.getItem('addedFriends')) || [];
        // Filter out already added friends from the initial list
        const filteredFriends = initialFriends.filter(friend => !savedAddedFriends.some(savedFriend => savedFriend.id === friend.id));
        setFriends(filteredFriends);
    }, []);

    const goToMain = () => {
        navigate('/');
    };

    const handleAddFriend = (friend) => {
        // Load added friends from localStorage
        const savedAddedFriends = JSON.parse(localStorage.getItem('addedFriends')) || [];

        // Add friend to the addedFriends array
        const updatedAddedFriends = [...savedAddedFriends, friend];
        localStorage.setItem('addedFriends', JSON.stringify(updatedAddedFriends));

        // Remove friend from the current friends list
        setFriends(friends.filter((f) => f.id !== friend.id));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="transparent" elevation={0} className='p-4 flex'>
                <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                    Мои друзья
                </Typography>
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={goToMain}>
                    Вернуться на главную
                </Button>
            </AppBar>

            <List>
                {friends.map((friend) => (
                    <ListItem
                        key={friend.id}
                        style={{
                            backgroundColor: '#f7f2fb',
                            margin: '5px 10px',
                            borderRadius: '10px',
                        }}
                        secondaryAction={
                            <IconButton onClick={() => handleAddFriend(friend)}>
                                <AddCircleOutlineIcon color="primary" />
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
