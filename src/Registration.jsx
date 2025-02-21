

// RegistrationForm.js
import React, { useState } from 'react';
import { TextField, Button, FormControl, CardContent, Typography, CardActions, Grid, FormControlLabel } from '@mui/material';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system'; // Fix import
import Switch from '@mui/material/Switch';

const Registration = ({ handleSignup, handleCancel }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null); // Fix initialization

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profile_image, setProfileImage] = useState(null);
  const [status, setStatus] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('password', password);

    if (profile_image) {
      formData.append('profile_image', profile_image);
    }

    try {
      const response = await axios.post('https://api.vidyamate.in/MachineTest/register_school/', formData);
      // toast.success(`Registration successful: ${JSON.stringify(response.data)}`, { position: 'top-right' });
      toast.success(`Registration successful`, { position: 'top-right' });

      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast.error(`Registration failed`, { position: 'top-right' });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleEmailBlur = () => {
    if (email.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(email));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const isValid = validatePassword(newPassword);
    setPasswordError(isValid ? null : 'Invalid password format');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <Card sx={{ minWidth: 275, margin: 'auto', maxWidth: '50%' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: 'blue', fontSize: '50px' }}>
          Registration
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Organization"
              name="organization"
              variant="standard"
              margin="normal"
              fullWidth
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="School Name"
              name="school_name"
              variant="standard"
              margin="normal"
              fullWidth
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="U-DISE-NO"
              variant="standard"
              margin="normal"
              fullWidth
              // value={}
              // onChange={}
              // onBlur={}
              // error={}
              // helperText={}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='standard-password-input'
              label="Address"
              type="text"
              margin="normal"
              variant="standard"
              fullWidth
              // value={}
              // onChange={}
              // error={Boolean()}
              // helperText={}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => options["name"]}
                getOptionValue={(options) => options["name"]}
                value={selectedCountry}
                onChange={(item) => { setSelectedCountry(item); setCountry(item.name); }}
                placeholder="Country">
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => options["name"]}
                getOptionValue={(options) => options["name"]}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item); setState(item.name)
                }}
                placeholder="State"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <Select
                options={City.getCitiesOfState(
                  selectedState?.countryCode,
                  selectedState?.isoCode
                )}
                getOptionLabel={(options) => options["name"]}
                getOptionValue={(options) => options["name"]}
                value={selectedCity}
                onChange={(item) => { setSelectedCity(item); setCity(item.name) }}
                placeholder="City"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Pincode"
              variant="standard"
              margin="normal"
              fullWidth
              // value={}
              // onChange={}
              // onBlur={}
              // error={}
              // helperText={}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              }
              label="Status"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Contact Person"
              variant="standard"
              margin="normal"
              fullWidth
              // value={}
              // onChange={}
              // onBlur={}
              // error={}
              // helperText={}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Contact Number"
              variant="standard"
              margin="normal"
              fullWidth
              // value={}
              // onChange={}
              // onBlur={}
              // error={}
              // helperText={}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Contact Email"
              variant="standard"
              margin="normal"
              fullWidth
              // value={}
              // onChange={}
              // onBlur={}
              // error={}
              // helperText={}
            />
          </Grid>
          

        </Grid>
        <Grid item xs={12} sm={6}>
          <Button component="label" variant="contained" onChange={handleFileChange} startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Grid>
      </CardContent>

      <CardActions>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>



  );
};

export default Registration;

