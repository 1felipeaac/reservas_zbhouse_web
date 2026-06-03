import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    Grid, 
    IconButton, 
    Input, 
    InputAdornment, 
    InputLabel, 
    Paper, 
    TextField, 
    Typography } from "@mui/material";
import { 
    AccountCircle, 
    Visibility, 
    VisibilityOff,
    Login as LoginIcon
} from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import React from "react";

interface InputBoxProps {
    children: React.ReactNode;
    icon: React.ReactNode;
    component?: React.ElementType;
}

function InputBox({ icon, children, component }: InputBoxProps) {

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                borderRadius: 1, 
                p: 1, 
                mt: 2,
                height: 35,
                width:'100%'
            }}
            component={component}
        >
            {icon}
            {children}
        </Box>
    )
}

export function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    
    function handleClickShowPassword(){ setShowPassword((show) => !show);}
    
    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    };
    
    function handleMouseUpPassword(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
    };
    
    const sxId = React.useId();
    const standardPasswordId = React.useId();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, color: 'primary'}}>
            <Grid container sx={{ flexDirection: "row", alignItems:"center", justifyContent: "center" }} spacing={3}>
                <Box>
                    <img src="src\assets\Principal.png" alt="Logo" style={{ maxWidth: '50%', height: 'auto' }} />
                </Box>
                <Box 
                    component={Paper} 
                    sx={{
                        p: 2, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography component="h1" color="primary">Login</Typography>
                    </Box>

                    <InputBox icon={<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}>
                        <TextField 
                            fullWidth 
                            id={`${sxId}-input`} 
                            label="Login" 
                            variant="standard" 
                        />
                    </InputBox>

                    <InputBox 
                        icon={<LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
                        component="form"
                    >
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor={`${standardPasswordId}-input`}>Password</InputLabel>
                            <Input
                                autoComplete="false"
                                id={`${standardPasswordId}-input`}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </InputBox>
                
                    <Button variant="contained" endIcon={<LoginIcon/>}>
                        Entrar
                    </Button>                 
                </Box>
            </Grid>

        </Container>
    )

}