
import  { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie';
import style from './Logout.module.css'

export default function Logout(){
    
    const history = useHistory()

    function handleSubmit(e){
        const cookies= new Cookies();
        cookies.set('username', '',{path:'/'})
        cookies.set('password', '',{path:'/'})
        cookies.set('name', '',{path:'/'})
        cookies.set('restoName', '',{path:'/'})
        cookies.set("id", '', { path: "/" });
        history.push('/home')
        console.log(cookies)
    }

    return(
            <button className={style.btn} onClick={handleSubmit}>Cerrar sessión</button>
    )
}