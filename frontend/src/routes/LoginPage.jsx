import React from 'react'

//status message
import useToast from "../hooks/useToast"

//api
import partyFetch from '../axios/config'

//hooks
import { useState } from 'react'

//navigation
import { useNavigate } from 'react-router-dom'

//style
import './LoginPage.css'
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';


const Login = () => {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();


  //função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const loginData = {
        user: user,
        password: password
      }

      const response = await partyFetch.post('/login', loginData);

      localStorage.setItem("token", response.data.token);
      navigate("/home");


    } catch (error) {

      toast("Usuário ou senha inválidos!", error.response?.data.msg ?? "Erro desconhecido");
    }
  }

  return (
    <div
      className="login-section">
      <div className="form-page">
        <form onSubmit={handleSubmit}>
          <h2>Bem-vindo</h2>
          <p>Faça login para acessar a área das festas</p>

          <div className="inputs_container">
            <label>
              <div className="user-help">
                <span>Usuário</span>
                <Tooltip title="Usuário: user, senha: 123456">
                  <HelpIcon sx={{ fontSize: "medium" }} />
                </Tooltip>
              </div>

              <input
                type="text"
                placeholder="Nome do usuário"
                required
                onChange={(e) => setUser(e.target.value)}
                value={user || ""}
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                placeholder="Digite sua senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
              />
            </label>
            <div className="divBtn">
              <button className="btn" type="submit">Fazer login</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login