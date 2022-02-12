import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUserReviews } from '../../actions';
import s from './MyProfile.module.css'
import UserReview from '../UserReview/UserReview';

export default function MyProfile() {

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const id = cookies.get("id")
    const reviews = useSelector((state)=>state.userReviews)
   
    console.log(reviews)
    useEffect(() => {
        dispatch(getUserReviews(id))
      }, [dispatch]);

    return (
      
    <div>
      <h1>Mi perfil {cookies.get('username')}</h1>
    
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
      </div>
      
      <div>
        <h1 className={s.favorites}>Resto favoritos</h1>
      </div>

    </div>)
}

