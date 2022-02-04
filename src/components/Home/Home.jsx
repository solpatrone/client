import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Navbar from '../NavBar/Navbar'
import Landingpage from '../LandingPage/Landingpage' 
import Cookies from 'universal-cookie';
import Logout from '../Logout/Logout';

export default function Home(){

    const cookies= new Cookies();
    console.log(cookies);
    const restoName= cookies.get('restoName');
    const usuario = cookies.get('name');
    return (
        <div>

            <Navbar/>
            <Landingpage/>                                 
              
            {usuario?   <h3>Usuario: {cookies.get('name')}</h3> : ""}                
            {restoName? <h3>Resto: {cookies.get('restoName')} </h3>: ""}
            {usuario?  <Logout/>:""}
             
        </div>
    )
}