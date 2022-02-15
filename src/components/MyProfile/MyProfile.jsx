import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUserReviews, getUserReservation } from '../../actions';
import s from './MyProfile.module.css'
import UserReview from '../UserReview/UserReview';
import Navbar from '../NavBar/Navbar';
import UserReserve from '../UserReserve/UseReserve';

export default function MyProfile() {

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const id = cookies.get("id");
    const reviews = useSelector((state)=>state.userReviews);
    const reserves = useSelector((state)=>state.userReservation)
    console.log('accccccccccccccca',reviews)
    console.log("mis reservas",reserves)

    useEffect(() => {      
        dispatch(getUserReviews(id))// eslint-disable-next-line
      }, [id]);

      useEffect(() => {      
        dispatch(getUserReservation(id))// eslint-disable-next-line
      }, [id]);  

    return (
      
    <div>
      <Navbar />
      <h1>Mi perfil </h1>
      <div className={s.res}>
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
      <div>
        <h1 className={s.bookings}>Mis reservas</h1>
        {
          reserves.status =  "IN PROGRESS" ?
          reserves.map( (e, index) =>
              <UserReserve key={index} elem ={e}/>             
            )
            :
              <div className={s.review} >
                  <p>No hay reservas</p>
              </div>
        }
      </div>
      
      <div>
        <h1 className={s.favorites}>Resto favoritos</h1>
      </div>

     
    </div>)
}

