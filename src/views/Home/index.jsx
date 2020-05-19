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
import ModalCreateEvent from '../../components/ModalCreateEvent.jsx';
import ModalFindEvent from '../../components/ModalFindEvent.jsx';

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
      // setListPlayers({
      //   avatar_url: 'https://img.ibxk.com.br/ns/quizpop/2015/03/10/10175754730000.png'
      // })
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

        {/* <img src={listPlayers.avatar_url} alt="Imagem de Perfil" /> */}

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
              {/* <ModalMap className={dropdown} /> */}
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
              <ModalCreateEvent className={dropdown} name={listPlayers.name} />
              <button type="button" className="btn btn-search-event" onClick={showDropdown}>Procurar Evento</button>
              <ModalFindEvent className={dropdown} name={listPlayers.name} />
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
