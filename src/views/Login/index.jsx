import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/banner-web.png"
import api from "../../services/api";
import { login } from "../../services/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import "../../styles/global.css"
import "./styles.css"

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ error: '' })
  const [isEnable, setIsEnable] = useState(false)
  const [loader, setLoader] = useState(false)

  async function handleSignIn(e) {
    e.preventDefault()
    setLoader(true)

    if (username == '') {
      setIsError(true)
      setErrorMsg({ error: "Preencha o nome de usuário para continuar!" })
      return
    }
    if (password == '') {
      setIsError(true)
      setErrorMsg({ error: "Preencha a senha para continuar!" })
      return
    }

    setIsError(false)

    try {
      // const response = await api.post("/showplayer", { username, password });
      // console.log(response.data.token)
      // login(response.data.token);
      // this.props.history.push("/home");
    } catch (err) {
      setIsError(true)
      setErrorMsg({ error: "Opa, parece que o usuário ou a senha estão incorretos !" })
    }
    setLoader(false)
  }

  // useEffect(() => {
  // setIsEnable(email !== '' && password !== '' ? true : false)
  // }, [username])

  return (
    <div className="container">
      <form onSubmit={handleSignIn}>
        <img src={Logo} alt="Banda Mestra logo" />
        {isError && <p>{errorMsg.error}</p>}
        <input
          type="username"
          placeholder="Nome de Usuário"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />
        {
          loader ?
            <Loader />
            : <></>
        }

        <button type="submit">Entrar</button>
        <hr />
        <Link to="/addplayer">Criar conta grátis</Link>
      </form>
    </div>
  );
}

export default withRouter(Login);