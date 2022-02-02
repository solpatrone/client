import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import './Home.css'

export default function Home(){

    return (
        <div>
            <h1>Esta es la home!</h1>
            <div>
            <NavLink activeStyle={{ backgroundColor: '#BFA2DB' }}  to={'/registerclient'}>|Cliente|   </NavLink>
            <NavLink activeStyle={{ backgroundColor: '#BFA2DB' }}  to={'/registerOwner'}>|Dueño|</NavLink>
             </div>

        </div>
    )
}