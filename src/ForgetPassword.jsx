import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const cardStyle = {
        width: '24rem',
        background: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
        border: '2px solid #ddd',
        borderRadius: '8px',
    };

    const handleBlur = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users?userName=${username}`);
            const userData = response.data;

            // check if username is exist
            if (userData.length === 0) {
                toast.error('User not found');
                return;
            }
            console.log(userData);
        }
        catch (error) {
            console.log('Error fetching security question:', error);
            toast.error('An error occurred while fetching security question');
        }
    };

    
    const handleResetPassword = async () => {
        try {
            // Send a request to fetch user data based on the username
            const response = await axios.get(`http://localhost:8000/users?userName=${username}`);
            const userData = response.data;
            console.log(userData);

            // Check if a user with the given username exists
            if (userData.length === 0) {
                toast.error('User not found');
                return;
            }

            // Extract the user ID from the fetched data
            const user = userData[0];
            const userId = user.id;

            // Update the user's password
            user.password = newPassword;

            // Send a request to update the user's password
            await axios.put(`http://localhost:8000/users/${userId}`, user);

            // Notify the user that the password has been reset
            toast.success('Password reset successful');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred while resetting password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Card className="draggable-card" style={cardStyle}>
                <CardContent>
                    <h2>Forgot Password</h2>
                    <TextField
                        type="text"
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={(e) => handleBlur()}
                    />
                    
                    
                    <TextField
                        type="password"
                        label="New Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isDisabled}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                        <Button variant="contained" color="primary" onClick={handleResetPassword}>
                            Reset Password
                        </Button>
                        <Link to="/">Back to Login</Link>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgetPassword;
