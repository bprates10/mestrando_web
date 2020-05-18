import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import '../../css/global.css'
import '../../css/navbar.css'
import '../../css/body.css'
import '../../css/main.css'
import './styles.css'

import Skills from "../../components/SkillChart"
import Events from "../../components/EventChart"

// importando modais
import ModalEvent from '../../components/ModalEvent.jsx';

import { Person, Explore, SportsEsports } from '@material-ui/icons';

function App() {

  const [listPlayers, setListPlayers] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [dropdown, setDropdown] = useState("")
  // variavel que define o estilo da camada main
  const [mainStyle, setMainStyle] = useState({})
  // variavel que define se os gráficos estarão ocultos
  const [isHidden, setIsHidden] = useState(false)

  // Preparing the chart data
  const chartData = [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ];

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
        subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
        xAxisName: "Country",           //Set the x-axis name
        yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
        numberSuffix: "K",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  };

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

    const res = await api.get('/players')

    console.log("retorno player => ", res.data[0])

    if (res.data) {
      setListPlayers(res.data[0])
    }
  }

  async function find() { alert('procurando eventos') }

  useEffect(() => {
    getPlayer()
  }, [])

  function map() { alert('ver mapa') }
  function profile() { alert('editar perfil') }
  function events() { alert('gerir eventos') }

  return (

    <div id="main" style={mainStyle}>
      <div className="navbar">

        <img src={listPlayers.avatar_url} />

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
              <button type="button" className="btn btn-search-event" onClick={find}>Procurar Evento</button>
            </div>
          </div>
        </div>

      </div>

      <div className="icon-navbar-left">
        <div title="Mapa" style={{ color: 'red' }} onClick={map}><Explore /></div>
        <div tittle="Perfil" style={{ color: 'orange' }} onClick={profile}><Person /></div>
        <div title="Eventos" style={{ color: 'green' }} onClick={events}><SportsEsports /></div>
      </div>
    </div >
  );
}

export default App;
