import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Grid,
    InputAdornment, AppBar, Toolbar, IconButton,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

export default function PaymentForm() {
    const navigate = useNavigate();  // Hook for navigation

    const goToRouteCard= () => {
        navigate('/route-card');
    };
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar onClick={goToRouteCard}>
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="textPrimary" style={{ flexGrow: 1 }}>
                        Оплата банковской картой
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { mb: 2 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* Card Number */}
                    <TextField
                        fullWidth
                        label="Номер карты"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CreditCardIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Expiry Date */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Месяц"
                                variant="outlined"
                                placeholder="MM"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Год"
                                variant="outlined"
                                placeholder="YY"
                            />
                        </Grid>
                    </Grid>

                    {/* Cardholder Name */}
                    <TextField
                        fullWidth
                        label="Имя и фамилия владельца"
                        variant="outlined"
                    />

                    {/* CVC Code */}
                    <TextField
                        fullWidth
                        label="CVC"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />

                    {/* Supported Cards */}
                    <Typography variant="body2" gutterBottom>
                        Мы принимаем:
                    </Typography>
                    <Box sx={{ display: "flex", mb: 2 }}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                            alt="Visa"
                            style={{ width: 50, marginRight: 8 }}
                        />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZfFFdT8f28FW_ic1p45zvGGi1cij9VXfg0w&s"
                            alt="Mastercard"
                            style={{ width: 50 }}
                        />
                    </Box>

                    {/* Phone Number */}
                    <TextField
                        fullWidth
                        label="Номер телефона"
                        variant="outlined"
                        placeholder="+7"
                        helperText="Нужен для отслеживания статуса платежа"
                    />

                    {/* Amount */}
                    <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                        К оплате: <strong>2500.00 ₽</strong>
                    </Typography>

                    {/* Pay Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Оплатить картой
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
