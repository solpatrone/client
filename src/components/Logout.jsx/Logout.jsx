import React, {  useState } from "react";
import  { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie';

export default function Logout(){
    
    const history = useHistory()

    function handleSubmit(e){
        const cookies= new Cookies();
        cookies.set('user', '',{path:'/'})
          cookies.set('password', '',{path:'/'})
          history.push('/home')
    }

    return(
            <button onClick={handleSubmit}>Cerrar sessión</button>
    )
}