
import  { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie';

export default function Logout(){
    
    const history = useHistory()

    function handleSubmit(e){
        const cookies= new Cookies();
        cookies.set('user', '',{path:'/'})
        cookies.set('password', '',{path:'/'})
        cookies.set('name', '',{path:'/'})
        cookies.set('restoName', '',{path:'/'})
        history.push('/home')
        console.log(cookies)
    }

    return(
            <button onClick={handleSubmit}>Cerrar sessión</button>
    )
}