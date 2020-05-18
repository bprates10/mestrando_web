import React, { useState, useEffect } from 'react';
import api from '../../services/api'

// include css
import '../../css/global.css'
import '../../css/navbar.css'
import '../../css/body.css'
import '../../css/main.css'
import './styles.css'

// include charts
import Skills from "../../components/SkillChart"
import Events from "../../components/EventChart"

// importando modais
import ModalEvent from '../../components/ModalEvent.jsx';

// include icons
import { Person, Explore, SportsEsports } from '@material-ui/icons';

function App() {

  const [listPlayers, setListPlayers] = useState([])
  const isDisabled = true
  // state da modal
  const [dropdown, setDropdown] = useState("")
  // variavel que define o estilo da camada main
  const [mainStyle, setMainStyle] = useState({})
  // variavel que define se os gráficos estarão ocultos
  const [isHidden, setIsHidden] = useState(false)

  const showDropdown = () => {
    //se clicar no botão, modal aparece
    setDropdown("show");
    document.body.addEventListener("click", closeDropdown);
    setMainStyle({
      // opacity: '0.9',
      backgroundColor: '#000'
    })
    setIsHidden(true)
  }

  const closeDropdown = event => {
    setDropdown("");
    document.body.removeEventListener("click", closeDropdown);
    setMainStyle({})
    setIsHidden(false)
  };

  async function getPlayer() {

    setListPlayers([])

    try {
      const res = await api.get('/players')

      console.log("retorno player => ", res.data[0])

      if (res.data) {
        setListPlayers(res.data[0])
      }
    }
    catch (error) {
      setListPlayers({
        avatar_url: 'data:image/jpeg;base64,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'
      })
      console.log("error =>", error)
    }

  }

  useEffect(() => {
    getPlayer()
  }, [])

  function genericFunction() { alert('implementar function') }

  return (

    <div id="main" style={mainStyle}>
      <div className="navbar">

        <img src={listPlayers.avatar_url} alt="Imagem de Perfil" />

        <div className="form-data">
          <p>{listPlayers.username}</p>
          <br />
          <label>Nome:</label>
          <input type="text" disabled={{ isDisabled }} value={listPlayers.name} />
          <label>Level:</label>
          <input type="text" className="input-small" value={listPlayers.level} disabled={{ isDisabled }} />
          <label className="label-rating">Rating:</label>
          <input type="text" className="input-small" value={listPlayers.rating} disabled={{ isDisabled }} />
          <label>Biografia:</label>
          <textarea type="text" value={listPlayers.bio} style={{ height: 100, padding: '3%' }} disabled={{ isDisabled }} />
        </div>
      </div>

      <div className="my-grafics">

        <div className="my-stats">
          <p>Minhas Estatísticas</p>
          <br />
          <div className="container-main">

            <div className="graph">
              <Skills stats={listPlayers.skills} />
            </div>

            <div className="descriptions">
              <p>Avaliação Média (rating): 3 (FIXO)</p>
              <p>Melhor Evento Participado: - (FIXO)</p>
              <p>Último Evento Participado: - (FIXO)</p>
              <p>Total de Eventos Participados: 0 (FIXO)</p>
              <p>Total de Eventos Finalizados: 0 (FIXO)</p>
              <button type="button" className="btn btn-map" onClick={showDropdown}>Meu Mapa</button>
              <ModalEvent className={dropdown} />
            </div>
          </div>

        </div>

        <div className="my-events">
          <p>Meus Eventos</p>
          <br />

          <div className="container-main">

            <div className="graph" hidden={isHidden}>
              <Events />
            </div>

            <div className="descriptions">
              <p>Avaliação Média (rating) de Eventos: - (FIXO)</p>
              <p>Melhor Evento Criado: - (FIXO)</p>
              <p>Último Evento Criado: - (FIXO)</p>
              <p>Total de Eventos Criados: 0</p>
              <p>Total de Eventos Finalizados: 0</p>
              <button type="button" className="btn btn-add-event" onClick={showDropdown}>Criar Evento</button>
              <ModalEvent className={dropdown} name={listPlayers.name} />
              <button type="button" className="btn btn-search-event" onClick={genericFunction}>Procurar Evento</button>
            </div>
          </div>
        </div>

      </div>

      <div className="icon-navbar-left">
        <div title="Mapa" style={{ color: 'red' }} onClick={genericFunction}><Explore /></div>
        <div tittle="Perfil" style={{ color: 'orange' }} onClick={genericFunction}><Person /></div>
        <div title="Eventos" style={{ color: 'green' }} onClick={genericFunction}><SportsEsports /></div>
      </div>
    </div >
  );
}

export default App;
