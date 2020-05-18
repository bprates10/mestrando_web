import React, { useState } from "react"
// import "./styles.css"
import api from "../../services/api"
import { Link, withRouter } from "react-router-dom"
import Logo from "../../assets/banner-web.png"
// import Form from "../../components/form"
import "../../styles/global.css"
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'

function AddPlayer() {
  // const [name, setName] = useState('')
  const setName = ''
  const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  const setEmail = ''
  const [password, setPassword] = useState('')
  // const [age, setAge] = useState('')
  const setAge = ''
  // const [bio, setBio] = useState('')
  const setBio = ''
  // const [avatar_url, setAvatarUrl] = useState('https://observatoriodegames.uol.com.br/wp-content/uploads/2020/04/pink-pok%C3%A9mon-.jpg')
  // const [boardgames, setBoardgames] = useState('')
  const setBoardgames = ''
  // const [listGames, setListGames] = useState([])
  const listGames = []
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  // const [isInvisible, setIsInvisible] = useState(false)

  async function handleSignUp(e) {
    e.preventDefault();
    setIsError(false)
    setErrorMsg({})

    if (username === '') {
      setIsError(true)
      setErrorMsg({ error: "E qual será o seu nick ?" })
    }

    if (password === '') {
      setIsError(true)
      setErrorMsg({ error: "Ops, parece que faltou uma senha ><" })
    }

    if (!isError) {

      try {
        await api.post("/players", { username, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err)
        setIsError(true)
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" })
      }
    }
  };

  return (

    <div className="container" style={{ flexDirection: "column" }}>
      <img src={Logo} alt="Banda Mestra Logo" style={{ position: "absolute" }} />
      {isError && <p>{errorMsg.error}</p>}

      <form onSubmit={handleSignUp} style={{ position: "relative" }} >

        {/* <div className="input" hidden={isInvisible}> */}
        <label htmlFor="">Nome:</label>
        <input name="name"
          id="name"
          onChange={e => setName(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input" hidden={isInvisible}> */}
        <label htmlFor="">Apelido (username):</label>
        <input name="username"
          id="username"
          onChange={e => setUsername(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input"> */}
        <label htmlFor="">E-mail:</label>
        <input name="mail"
          id="mail"
          onChange={e => setEmail(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input"> */}
        <label htmlFor="">Senha:</label>
        <input name="password"
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input" hidden={isInvisible}> */}
        <label htmlFor="">Idade</label>
        <input name="age"
          id="age"
          onChange={e => setAge(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input" hidden={isInvisible}> */}
        <label htmlFor="">Sobre Você</label>
        <textarea name="bio"
          id="bio"
          onChange={e => setBio(e.target.value)}
          required />
        {/* </div> */}

        {/* <div className="input" hidden={isInvisible}> */}
        <label htmlFor="">Avatar</label>
        <Button
          className="btnUploadImg"
          style={{ marginLeft: '20%', paddingTop: 1, color: 'red' }}
          name="avatar"
          id="avatar"
          // onChange={e => setAvatarUrl(e.target.value)}
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          Upload
          </Button>
        {/* </div> */}

        {/* <div className="input" hidden={isInvisible} style={{ marginTop: 15 }}> */}
        <label htmlFor="">Seus Jogos</label>
        <br />
        <select name="boardgames"
          id="boardgames"
          onChange={e => setBoardgames(e.target.value)}
          required>
          {
            listGames.map((game) => {
              return (
                <option key={game._id} value={game.name}>{game.name}</option>
              )
            })
          }
        </select>
        {/* </div> */}

        {/* <div className="input-group" hidden={isInvisible}> */}
        <div className="input-block">
          <label htmlFor="">Longitude</label>
          <input type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required />
        </div>
        <div className="input">
          <label htmlFor="">Latitude</label>
          <input type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required />
        </div>
        {/* </div> */}

        <Button
          className="btnSubmit"
          style={{ marginLeft: '30%', paddingTop: 1, color: 'red' }}
          name="submit"
          id="submit"
          type="submit"
          variant="contained"
          color="default"
          startIcon={<SaveIcon />}
        >
          Salvar
  </Button>

        <Link to="/">Fazer login</Link>
      </form>
    </div>
  );
}

export default withRouter(AddPlayer);