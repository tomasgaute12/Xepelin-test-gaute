import React, { useState } from 'react';
import "./BankForm.css";
import { createAccount } from '../services/accounts/accounts.service';
import { useNavigate } from 'react-router-dom';

export const BankAccountForm = ({user}) => {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    balance: '',
    username: user.username
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [creationMessage, setCreationMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...accountInfo, [name]: parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAccount(accountInfo);
      if(response.success){
        setCreationMessage('Creado correctamente!');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
        
      }
      else{
        setError(response.message)
      }
    } catch (error) {
      setError('Error de servicor. Intentalo de nuevo');
    }
    setError('')
    setAccountInfo({ accountNumber: '', username: user.username, balance: 0 });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        {creationMessage && <p style={{ color: 'green' }}>{creationMessage}</p>}
        <h2>Crear Cuenta Bancaria</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Número de Cuenta: </label>
            <input
              type="number"
              name="accountNumber"
              value={accountInfo.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Balance: </label>
            <input
              type="number"
              name="balance"
              value={accountInfo.balance}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{ 'Error. Inténtalo de nuevo'}</p>}
          <button type="submit">Crear Cuenta</button>
        </form>
        <p className="register-text">
          <a href="/">Volver al inicio</a>
        </p>
      </div>
    </div>
  );
};
