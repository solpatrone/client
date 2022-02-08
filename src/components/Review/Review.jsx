import React from 'react';
import {useSelector} from 'react-redux'
import {RiStarFill }from 'react-icons/ri'
import s from './Review.module.css'

export default function Review(){

    const reviews = useSelector((state) => state.reviews);

    return(
         reviews && reviews.map(r =>{
             return(
                <div className={s.review}>
               <p>{[...Array(Number(r.rating.value)).keys()].map((index) => (<RiStarFill size={20} style={{ fill: '#f2d349' }} key={index} />))}</p>
                <p>{r.rev}</p>
            </div>
            
             )
             
            
         })
        
    )
}