import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUserReviews, getUserReservation, getUserFavorites} from '../../actions';
import s from './MyProfile.module.css'
import UserReview from '../UserReview/UserReview';
import Navbar from '../NavBar/Navbar';
import UserReserve from '../UserReserve/UseReserve';
import UserFavorite from '../UserFavorite/UserFavorite';

import { Tab, Row, Col, Nav } from "react-bootstrap";

export default function MyProfile() {

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const id = cookies.get("id");
    const reviews = useSelector((state)=>state.userReviews);
    const reserves = useSelector((state)=>state.userReservation);
    const favorites = useSelector((state) => state.userFavorites);

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
    
    return (
      
    <div>
      <Navbar />
      <div className={s.centeredContainer}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
          <Row>
          <Col sm={3}>
                <Nav className="flex-column" variant="">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className={s.option} >Mis reservas</Nav.Link >
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className={s.option} >Mis reseñas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" className={s.option}>Mis favoritos</Nav.Link>
                  </Nav.Item>
                </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
              <div className={s.reviewsContainer}>
                  {
                    reservesInProgress >0 ?
                    reservesInProgress.map( (e, index) =>
                        <UserReserve key={index} elem ={e}/>             
                        )
                      :
                      <div className={s.review} >
                            <p>No hay reservas</p>
                        </div>
                  }        
                      </div>
                </Tab.Pane >

                <Tab.Pane eventKey="second">
                <div className={s.reservationsContainer}>
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
                </Tab.Pane>

                <Tab.Pane eventKey="third">
                {
          favorites.length > 0 ?
          favorites.map( (e, index) =>
              <UserFavorite key={index} elem ={e}/>             
            )
            :
              <div className={s.review} >
                  <p>No hay favoritos</p>
              </div>
        }
                </Tab.Pane>
              </Tab.Content>
              </Col>
          </Row>
      </Tab.Container>     
      </div>
    </div>
    )
}

