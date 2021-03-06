import s from "./UserReserve.module.css"
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

export default function UserReserve(props) {

    const elem = props.elem;
    return (
        <div className={s.container}>
            <div className={s.header}>
                <div className={s.resto}>
                    {elem.restaurant}
                </div>

                </div>
                <div className={s.inputContainer}>
             
                <div className={s.input}>
                    <p>
                        <FaRegCalendarAlt style={{ color: "var(--bright-color)" }} /> Fecha
                    </p>  
                    <span>
                        {elem.date}
                    </span>  
                </div>
                <div className={s.input}>
                    <p>
                        <FaClock style={{ color: "var(--bright-color)" }} /> Horario
                    </p>
                    <span>
                        {elem.time}
                    </span>
                    </div>            
                <div className={s.input}>
                    <p>
                        <MdGroups style={{ color: "var(--bright-color)" }} /> Personas
                    </p>
                    <span>
                        {elem.pax} 
                    </span>
                 </div>                
            </div>
        </div> 
    )
}
