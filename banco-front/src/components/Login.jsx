import "./Formulario.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import LogoXepelin from "./assets/xepelin.png";
import { login } from "../services/login/auth";

export function Login({setUser}) {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await login({ usuario, contraseña });
        if (response.user) {
          setUser(response.user); 
          window.localStorage.setItem('user',JSON.stringify(response.user)); 
          if(response.user.haveAccount){
            navigate('/')
          }else{
            navigate('/bankform'); 

          }
        } else {
          setError('Credenciales incorrectas');
        }
      } catch (error) {
        setError('Error al iniciar sesión');
      }
    };
    return (
        <section className="login-container">
          <img src={LogoXepelin} alt="Logo" className="logo-image" /> 
          <form className="formulario" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="input-field"
            />

            {error && <p className="error-message">Credenciales incorrectas. Inténtalo de nuevo.</p>}
            <button type="submit" className="submit-button">Iniciar sesión</button>
          </form>
          <p className="register-text">¿Nuevo aquí? <a href="/Register">Registrar usuario</a></p>
        </section>
      );
    }