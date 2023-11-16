import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import { createTransaction } from '../services/transactions/transacitons.service';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export function ModalTransaction({ user, open, onClose,setTriggerFetchBalance }) {
  const classes = useStyles();
  const [creationMessage, setCreationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [transactionData, setTransactionData] = useState({
    type: '',
    amount: 0,
    username: user.username
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'amount' ? parseInt(value) : value;
    setTransactionData({ ...transactionData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transactionData.type === '' || transactionData.amount <= 0) {
      alert('Por favor selecciona un tipo y asegúrate de que la cantidad sea mayor a 0.');
      return;
    } 
    console.log('Datos del formulario:', transactionData);
    const response = await createTransaction(transactionData);
    if(response.success){
        const capitalized = transactionData.type.charAt(0).toUpperCase() + transactionData.type.slice(1);
        setCreationMessage(`${capitalized} creado correctamente`);
        setTransactionData({type:'',amount:0,username:user.username})

        setTimeout(() => {
            setCreationMessage('')
            setTriggerFetchBalance(prev => !prev); // Cambiar el estado para activar useEffect en Home
            onClose();
          }, 1000);
    } else{
      setErrorMessage(response.message? response.message: "Error al crear transacción" )
      setTimeout(() => {
        setErrorMessage('')
      },1500)
    }
  };

  const handleClose = () => {
    setTransactionData({type:'',amount:0,username:user.username})
    setErrorMessage('')
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modalContainer}>
        <div className={classes.paper}>
          <CloseIcon className={classes.closeButton} onClick={handleClose} />
          <h2>Crear Depósito</h2>
          {creationMessage && <p style={{color:'green'}}>{creationMessage}</p>}
          {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className={classes.formControl}>
              <label>Tipo:</label>
              <Select name="type" value={transactionData.type} onChange={handleChange} style={{ width: '100%' }}>
                <MenuItem value="">Seleccione...</MenuItem>
                <MenuItem value="retiro">Retiro</MenuItem>
                <MenuItem value="deposito">Depósito</MenuItem>
              </Select>
            </div>
            <div className={classes.formControl}>
              <label>Monto:</label>
              <input type="number" name="amount" value={transactionData.amount} onChange={handleChange} style={{ width: '100%' }} />
            </div>
            {/* Otros campos del formulario */}
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}