import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import Card from '../../components/playerCards'
import BtnUpload from '../../components/btnUpload'
import '../../css/global.css'
import '../../css/navbar.css'
import '../../css/body.css'
import '../../css/main.css'

// components button
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'

// components loader
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

function App() {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [avatar_url, setAvatarUrl] = useState('https://observatoriodegames.uol.com.br/wp-content/uploads/2020/04/pink-pok%C3%A9mon-.jpg')
  const [boardgames, setBoardgames] = useState('')

  const [listPlayers, setListPlayers] = useState([])
  const [showPlayers, setShowPlayers] = useState(false)
  const [loader, setLoader] = useState(false)
  const [listGames, setListGames] = useState([])
  const [showGames, setShowGames] = useState([])

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    getLocation()
    getPlayers()
    getBoardGames()
  }, [])

  useEffect(() => {
    console.log(boardgames)
  }, [boardgames])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoader(true)
    console.log(name,
      username,
      age,
      bio,
      avatar_url,
      boardgames,
      latitude,
      longitude)
    const res = await api.post('/players', {
      name,
      username,
      age,
      bio,
      avatar_url,
      boardgames,
      latitude,
      longitude
    })
    console.log(res.data)
    setLoader(false)
    getPlayers()
  }

  async function getPlayers() {

    setListPlayers([])
    setLoader(true)

    const res = await api.get('/players')
    console.log("RES => ", res)
    if (res.data) {
      setListPlayers(res.data)
      setShowPlayers(true)
    }
    setLoader(false)
  }

  async function getBoardGames() {
    const res = await api.get('/games')
    console.log("RES => ", res)
    if (res.data) {
      setListGames(res.data)
      setShowGames(true)
    }
  }

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      }, (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }

  return (

    <div id="main">
      <div className="navbar">

        <strong>Cadastrar</strong>

        <form onSubmit={handleSubmit}>

          <div className="input">
            <label htmlFor="">Nome do Usuário</label>
            <input name="name"
              id="name"
              onChange={e => setName(e.target.value)}
              required />
          </div>

          <div className="input">
            <label htmlFor="">Apelido</label>
            <input name="username"
              id="username"
              onChange={e => setUsername(e.target.value)}
              required />
          </div>

          <div className="input">
            <label htmlFor="">Idade</label>
            <input name="age"
              id="age"
              onChange={e => setAge(e.target.value)}
              required />
          </div>

          <div className="input">
            <label htmlFor="">Sobre Você</label>
            <textarea name="bio"
              id="bio"
              onChange={e => setBio(e.target.value)}
              required />
          </div>

          <div className="input">
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
          </div>

          {/* <BtnUpload /> */}

          <div className="input" style={{ marginTop: 15 }}>
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
          </div>

          <div className="input-group">
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
          </div>

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
        </form>
      </div>
      <div className="body">
        {
          loader ?
            <Loader type="Puff" color="red" height={200} width={200} top={50} />
            :
            <div className="players-grid">
              {
                showPlayers ?
                  <Card data={listPlayers} />
                  :
                  <></>
              }
            </div>
        }
      </div>
    </div >
  );
}

export default App;
