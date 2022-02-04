import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Navbar from '../NavBar/Navbar'
import Landingpage from '../LandingPage/Landingpage'
import Card from '../Card/card' 
import Paginate from '../Paginate/Paginate'
import Filters from '../Filters/Filters';

export default function Home(){

let dispatch = useDispatch


    return (
        <div>

            <Navbar/>
            <Landingpage/>
            <Filters/>
            <Card />
            <Paginate itemsPerPage={4}/>

        </div>
    )
}