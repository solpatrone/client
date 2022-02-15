import s from "./UserReserve.module.css"

export default function UserReserve(props) {

    const elem = props.elem;
    return (
        <div className={s.review}>
            <div className={s.topRow}>
                <div className={s.text}><b>Para el restaurant :</b> {elem.RestaurantId}</div>
                <div className={s.text}><b>A nombre de :</b>{elem.author}</div>
                <div className={s.text}><b>Dia de la reservas:</b> {elem.date.split("T", 1)[0].split("-").reverse().join("-")}</div>
                <div className={s.text}><b>Para las {elem.time} hs. </b></div>            
                <div className={s.text}><b>Para {elem.pax} personas</b></div>
            </div>                
        </div> 
    )
}
