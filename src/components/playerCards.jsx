import React from "react";

function PlayerCars(props) {
  // console.log(props.data)

  const styleImg = {
    borderRadius: '50%',
    maxWidth: 100,
    marginLeft: '35%',
    marginBottom: '3%',
  }

  return (
    <>
      {
        props.data.map((item) => {
          // console.log(item.avatar_url)
          return (
            <div key={item._id} style={{ width: '100%' }} >
              <img style={styleImg} src={item.avatar_url} alt="Avatar" />
              <div className="information">
                <strong>{item.username}</strong>
                <br />
                <b>{item.name}</b>
                <br />
                <span>Boardgames</span>
                <br />
                <p>{item.bio}</p>
                <br />
                <a href="">Perfil da rede social</a>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default PlayerCars