import React, {  useState } from "react";
import  { useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
<<<<<<< HEAD

export default function Login(){

    const history = useHistory()
    const dispatch= useDispatch()
    const owner = useSelector(state=> state.owners)    
    const client = useSelector(state=>state.clients)
    const prueba = useSelector(state=>state.prueba)
=======
<<<<<<< HEAD
import Cookies from "universal-cookie/es6";
=======
import Cookies from 'universal-cookie';
>>>>>>> develop

export default function Login(){


    const history = useHistory()
    
    const owner = useSelector(state=> state.owners)    
    const client = useSelector(state=>state.clients)

>>>>>>> develop
    const allUsers= owner.concat(client)
    console.log(client)

    const [input, setInput]= React.useState({
        user:"",
        password:"",
    })
    
    const responseGoogle = (response) => {
        console.log(response);
      }
      
      function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        console.log(input)
      }

      function handleSubmit(e){
<<<<<<< HEAD
          e.preventDefault()
          let userMatch = allUsers.find(e=>e.email===input.user)
          if(!userMatch){
              alert('mail incorrecto')
          }else {
              if(userMatch.password !== input.password)
              alert('passwordf inco')
          }
          history.push('/home')
=======
        e.preventDefault()
        let userMatch = allUsers.find(e=>e.email===input.user)
          if(!userMatch){
              alert('mail incorrecto')
          }
          if(userMatch.password !== input.password){
            alert('password incorrecto')}
          else{
            const cookies= new Cookies();
            cookies.set('user', input.user,{path:'/'})
            cookies.set('password', input.password,{path:'/'})
            history.push('/home')
          }
>>>>>>> develop
      }
         
    return(
        <>            
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Usuario: </div>
                    <input type='text' 
                    value= {input.user} 
                    name='user' 
                    placeholder="Ingrese su usuario" 
                    onChange={(e)=>handleChange(e)}/> 
                </div>
                <div>
                    <div>Contraseña: </div>
                    <input type='password' 
                    value={input.password} 
                    name='password' 
                    placeholder="Ingrese su contraseña" 
                    onChange={(e)=>handleChange(e)}/> 
                </div>

               <button type='submit' >Iniciar sesíon</button>
            </form>

            <GoogleLogin
                        clientId="573681437399-riki1t5m65bqd6q5h98o2r0f9qnolp8k.apps.googleusercontent.com"
                        buttonText="Iniciar sesión"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
        </>
    )
}
