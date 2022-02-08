import React from 'react';
import {useSelector} from 'react-redux'
import {RiStarFill }from 'react-icons/ri'
import s from './Review.module.css'

export default function ReviewsComments(){

    const reviews = useSelector((state) => state.reviews);
    console.log(reviews)

    return(
         reviews && reviews.map(r =>{
             return(
                <div className={s.review}>
               <p>{[...Array(Number(r.rating.value)).keys()].map(() => (<RiStarFill />))}</p>
                <p>{r.rev}</p>
            </div>
            
             )
             
            
         })
        
    )
}