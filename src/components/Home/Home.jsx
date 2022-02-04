import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Navbar from '../NavBar/Navbar'
import Landingpage from '../LandingPage/Landingpage' 
import Cookies from 'universal-cookie';
import Logout from '../Logout.jsx/Logout';

export default function Home(){
    
    const cookies= new Cookies();
    return (
        <div>

            <Navbar/>
            <Landingpage/>
            <h3>usuario:{cookies.get('user')}</h3>
             <Logout/>
        </div>
    )
}