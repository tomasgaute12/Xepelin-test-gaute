import React, { useState,useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LogoXepelin from "./assets/xepelin.png";
import {ModalTransaction} from './ModalDeposito';
import { getUserData } from '../services/accounts/accounts.service';
import { DataList } from './EventsList';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));


export function Home({ user, setUser }) {
  const classes = useStyles();
  const [openDeposito, setOpenDeposito] = useState(false);
  const [balance, setBalance] = useState(0); 
  const [accountNumber, setAccountNumber] = useState('');
  const [triggerFetchBalance, setTriggerFetchBalance] = useState(false);
  const [dataList, setDataList] = useState([]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };


  const fetchUserData = async () => {
    try {
        const response = await getUserData(user.username)
        setBalance(response.accounts.balance);
        setAccountNumber(response.accounts.accountNumber)
        setDataList(response.events)
    } catch (error) {
        console.error('Error al obtener el balance:', error);
    }
    };

    useEffect(() => {
      fetchUserData();
      }, [triggerFetchBalance]); 

  const handleCloseModal = () => {
    setOpenDeposito(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="textPrimary" className={classes.title}>
            Bienvenido <b>{user.username}</b>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Administrá tu cuenta
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                <Button variant="contained" color="primary" onClick={() => setOpenDeposito(true)}>
                    Realizar Transacción
                </Button>

                <ModalTransaction user={user} open={openDeposito} onClose={handleCloseModal}
                  setTriggerFetchBalance={setTriggerFetchBalance}/>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Balance de cuenta
              </Typography>
              <Typography style={{ textAlign: 'center' }}>
                US$ {balance}
              </Typography>
            </CardContent>
                </Card>
              </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Numero de cuenta
              </Typography>
              <Typography style={{ textAlign: 'center' }}>
                {accountNumber}
              </Typography>
            </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
        <DataList dataList={dataList} />

      </main>

    </React.Fragment>
  );
}