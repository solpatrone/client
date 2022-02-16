import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUserReviews, getUserReservation, getUserFavorites} from '../../actions';
import s from './MyProfile.module.css'
import UserReview from '../UserReview/UserReview';
import Navbar from '../NavBar/Navbar';
import UserReserve from '../UserReserve/UseReserve';
import UserFavorite from '../UserFavorite/UserFavorite';


export default function MyProfile() {

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const id = cookies.get("id");
    const reviews = useSelector((state)=>state.userReviews);
    const reserves = useSelector((state)=>state.userReservation)
    const favorites = useSelector((state) => state.UserFavorites)
    console.log('accccccccccccccca',reviews)
    console.log("mis reservas",reserves)

    useEffect(() => {
        dispatch(getUserReviews(id))// eslint-disable-next-line
      }, [id]);

      useEffect(() => {      
        dispatch(getUserReservation(id))// eslint-disable-next-line
      }, [id]);  

      useEffect(() => {      
        dispatch(getUserFavorites(id))// eslint-disable-next-line
      }, [id]);

        
      const reservesInProgress = (reserves.length>0)?reserves.filter(elem => elem.status === "IN PROGRESS" ):[]
      console.log("reservassssss",reservesInProgress)
    return (
      
    <div>
      <Navbar />
      <h1>Mi perfil </h1>
      <div className={s.container}>

      <div className={s.uno}>
        <h1 className={s.bookings}>Mis reservas</h1>

        {
          reservesInProgress  ?
          reservesInProgress.map( (e, index) =>
              <UserReserve key={index} elem ={e}/>             
            )
            :
            <div className={s.review} >
                  <p>No hay reservas</p>
              </div>
        }
        
      </div>
      <div className={s.dos}>
        <h1 className={s.reviews}>Mis reseñas</h1>
        {
          reviews.length > 0 ?
            reviews.map( (e, index) =>
            <UserReview key={index} elem ={e}/>             
            )
            :
              <div className={s.review} >
                  <p>No hay reviews</p>
              </div>
        }
        </div>
        </div>
      
      <div className={s.tres}>
        <h1 className={s.favorites}>Resto favoritos</h1>
        {
          favorites.length > 0 ?
          favorites.map( (e, index) =>
              <UserFavorite key={index} elem ={e}/>             
            )
            :
              <div className={s.review} >
                  <p>No hay reservas</p>
              </div>
        }
      </div>
     
    </div>
    )
}

