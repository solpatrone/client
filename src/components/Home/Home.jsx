import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Navbar from '../NavBar/Navbar'
import Landingpage from '../LandingPage/Landingpage' 

export default function Home(){

    return (
        <div>

            <Navbar/>
            <Landingpage/>
          

        </div>
    )
}