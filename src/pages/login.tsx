import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Grid,
    Paper, 
    Typography, 
    TextField, 
    InputAdornment, 
    IconButton, 
    Button 
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import { useAuth } from '../hooks/auth';

import logoPrincipal from '../assets/Principal.png'; 

interface InputBoxProps {
    children: React.ReactNode;
    icon: React.ReactNode;
}

function InputBox({ icon, children }: InputBoxProps) {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                width: '100%',
                mt: 1
            }}
        >
            {icon}
            <Box sx={{ width: '100%' }}>
                {children}
            </Box>
        </Box>
    )
}

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { autenticar } = useAuth();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (!login || !password) {
            alert("Preencha o usuário e a senha.");
            return;
        }

        setIsLoading(true);
        try {
            await autenticar({ login, senha: password });
            navigate('/'); 
        } catch (error) {
            console.error("Erro no fluxo de login", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ width: '100vw' ,minHeight: '100vh', backgroundColor: '#1288fd', color: 'primary.main' }}>
            <Grid 
                container 
                sx={{ height: '100vh', alignItems: "center", justifyContent: "center" }} 
                spacing={4}
            >
                <Grid sx={{ display: 'flex', justifyContent: 'center', xs: '12', md: '6' }}>
                    <img src={logoPrincipal} alt="Logo ZB House" style={{ maxWidth: '60%', height: 'auto' }} />
                </Grid>

                <Grid sx={{ display: 'flex', justifyContent: 'center', xs:'12', md:'6' }}>
                    <Paper 
                        component="form" 
                        elevation={3}
                        sx={{
                            p: 5, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            gap: 3,
                            width: '100%',
                            maxWidth: 450,
                            borderRadius: 2
                        }}
                        onSubmit={handleSignIn}
                    >
                        <Typography sx={{fontWeight:'bold'}} component="h1" variant="h4" color="primary">
                            Bem-vindo
                        </Typography>

                       
                        <InputBox icon={<AccountCircle sx={{ color: 'action.active', mr: 2, mb: 0.5 }} />}>
                            <TextField 
                                fullWidth 
                                id="login-input" 
                                label="Utilizador" 
                                variant="standard" 
                                color='primary'
                                onChange={e => setLogin(e.target.value)}
                                disabled={isLoading}
                            />
                        </InputBox>

                        
                        <InputBox icon={<LockIcon sx={{ color: 'action.active', mr: 2, mb: 0.5 }} />}>
                            <TextField
                                fullWidth
                                id="password-input"
                                label="Palavra-passe"
                                variant="standard"
                                color="primary"
                                type={showPassword ? 'text' : 'password'}
                                onChange={e => setPassword(e.target.value)}
                                disabled={isLoading}
                                slotProps={{
                                    input:{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="alternar visibilidade da senha"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </InputBox>

                        <Button 
                            variant="contained" 
                            size="large"
                            endIcon={<LoginIcon/>}
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            sx={{ mt: 2, py: 1.5 }}
                        >
                            {isLoading ? 'Aguarde...' : 'Entrar'}
                        </Button>                 
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}