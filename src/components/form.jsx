// import React, { useState, useEffect } from "react";
// import "../styles/global.css"

// import api from "../services/api"
// import { Link, withRouter } from "react-router-dom"

// // components button
// import Button from '@material-ui/core/Button'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
// import SaveIcon from '@material-ui/icons/Save'


// function FormAddPlayer(props) {



//   async function handleSignUp(e) {
//     e.preventDefault();
//     setIsError(false)
//     setErrorMsg({})

//     if (name == '') {
//       setIsError(true)
//       setErrorMsg({ error: "Queremos saber o seu nome !" })
//     }
//     if (username == '') {
//       setIsError(true)
//       setErrorMsg({ error: "E qual será o seu nick ?" })
//     }

//     if (password == '') {
//       setIsError(true)
//       setErrorMsg({ error: "Ops, parece que faltou uma senha ><" })
//     }

//     if (!isError) {

//       try {
//         await api.post("/players", { username, password });
//         this.props.history.push("/");
//       } catch (err) {
//         console.log(err)
//         setIsError(true)
//         this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" })
//       }
//     }
//   };

//   useEffect(() => {
//     if (props.idForm === 'login_add') {
//       setIsInvisible(true)
//     }
//     console.log(props.idForm)
//   }, [props])

//   return (
//     <>

//     </>
//   )
// }

// export default FormAddPlayer