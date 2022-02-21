import s from "./UserReview.module.css"
import {RiStarFill }from 'react-icons/ri'

export default function UserReview(props) {

    const elem = props.elem;
    return (
        <div className={s.review}>
            <div className={s.topRow} >
                <h4 >{elem.restaurant}</h4>
                    
                <div className={elem.rating} > 

                    {[...Array(Number(elem.rating)).keys()].map((index) => (
                        <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
                    ))}
                </div>
            </div>
            <div className={s.text}>
                <p>{elem.description}</p>
            </div>
        </div> 
    
    )
}
