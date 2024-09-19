import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
    styled,
} from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    maxWidth: '450px',
    padding: theme.spacing(3),
    gap: theme.spacing(1.5),
    margin: 'auto',
    background: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({theme}) => ({
    height: '100%',
    color: 'white',
    background: '#c2e59c',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #64b3f4, #c2e59c)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #64b3f4, #c2e59c)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));

export default function SignUp() {
    const navigate = useNavigate();

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('')

    const [surnameError, setSurnameError] = React.useState(false);
    const [surnameErrorMessage, setSurnameErrorMessage] = React.useState('')

    const [isDisabled, setIsDisabled] = React.useState(false);

    const [phoneError, setPhoneError] = React.useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');

    const [gender, setGender] = React.useState('');
    const [genderError] = React.useState(false);
    const [genderErrorMessage] = React.useState('');


    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;
        const surname = document.getElementById('surname') as HTMLInputElement;
        const phone = document.getElementById('phone') as HTMLInputElement;
        const dateOfBirth = document.getElementById('dateOfBirth') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Введите корректный почтовый адрес');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!dateOfBirth) isValid = false;

        if (!phone.value.split(/\s+/).join('') || !/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g.test(phone.value.split(/\s+/).join(''))) {
            setPhoneError(true);
            setPhoneErrorMessage('Введите корректный номер телефона');
            isValid = false;
        } else {
            setPhoneError(false);
            setPhoneErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Пароль должен содержать как минимум 6 символов');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Введите имя');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!surname.value || surname.value.length < 1) {
            setSurnameError(true);
            setSurnameErrorMessage('Введите фамилию');
            isValid = false;
        } else {
            setSurnameError(false);
            setSurnameErrorMessage('');
        }

        return isValid;
    };

    const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsDisabled(event.target.checked);
    };

    const [phone, setPhone] = React.useState('')

    const handlePhone = (newPhone: React.SetStateAction<string>) => {
        setPhone(newPhone)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let formData = Object.fromEntries(data.entries());
        formData.isDisabled = data.get('isDisabled') !== null;
        formData.phone = String(data.get('phone')).split(/\s+/).join('')
        console.log({
            name: data.get('name'),
            surname: data.get('surname'),
            email: data.get('email'),
            password: data.get('password'),
            phone: String(data.get('phone')).split(/\s+/).join(''),
            isDisabled: data.get('isDisabled') !== null,
            gender: data.get('gender'),
            dateOfBirth: data.get('dateOfBirth')
        });
        if (validateInputs()) {
            localStorage.setItem('userData', JSON.stringify(formData));
            navigate('/choose-type');
        }
    };

    return (
        <SignUpContainer direction="column" justifyContent="space-between">
            <Stack
                sx={{
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Luckation
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Имя</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                variant="outlined"
                                fullWidth
                                id="name"
                                placeholder="Иван"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl><FormControl>
                            <FormLabel htmlFor="surname">Фамилия</FormLabel>
                            <TextField
                                autoComplete="surname"
                                name="surname"
                                required
                                fullWidth
                                id="surname"
                                placeholder="Иванов"
                                error={surnameError}
                                helperText={surnameErrorMessage}
                                color={surnameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Почта</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phone">Телефон</FormLabel>
                            <MuiTelInput
                                name="phone"
                                id="phone"
                                error={phoneError}
                                value={phone} onChange={handlePhone}
                                helperText={phoneErrorMessage}
                                color={phoneError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="gender">Пол</FormLabel>
                            <Select
                                name="gender"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                             variant="outlined">
                                error={genderError}
                                helperText={genderErrorMessage}
                                color={genderError ? 'error' : 'primary'}
                                <MenuItem value="male">Мужской</MenuItem>
                                <MenuItem value="female">Женский</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="dateOfBirth">Дата рождения</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Пароль</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isDisabled}
                                    onChange={handleChange}
                                    name="isDisabled"
                                    color="primary"
                                />
                            }
                            label="Человек с ограниченными возможностями"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            регистрация
                        </Button>
                    </Box>
                </Card>
            </Stack>
        </SignUpContainer>
    );
}