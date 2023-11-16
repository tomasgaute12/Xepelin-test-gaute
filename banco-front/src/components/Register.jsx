import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Formulario.css";
import { registerUser } from '../services/register/register.service';


export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle sumbiut");
    if (username && password && repeatPassword) {
      console.log("Entre validador 1");
      if (password !== repeatPassword) {
        setError(false);
        setPasswordError(true);
      } else {

        const response = await registerUser({ username, password });
        if(response.success){
          setRegistrationMessage('¡Registrado correctamente!');
          setTimeout(() => {
            navigate('/'); 
          }, 2000);
          
        }
        else{
          setError(response.message)
        }
        setError(false);
        setPasswordError(false);

      }
    } else {
      setError(true);
      setPasswordError(false);
    }
  };

  return (
    <section className="login-container">
      <h1>Registrarse</h1>
      {registrationMessage && <p style={{color:'green'}}>{registrationMessage}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="input-field"
        />
        {error && <p className="error-message">Por favor, completa todos los campos.</p>}
        {passwordError && <p className="error-message">Las contraseñas no coinciden.</p>}
        <button type="submit" className="submit-button">Registrar cuenta</button>
      </form>
      <p> <a href="/">Volver al login</a></p>
    </section>
  );
}