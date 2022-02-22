import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { postReservation } from '../../actions';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router';
import emailjs from "emailjs-com"


export default function MercadoPago(){

    const dispatch = useDispatch()
    const cookies = new Cookies();
    const id = cookies.get("idR")
    const resto = cookies.get("RestoNameReserv")
    const time = cookies.get("time")
    const day = cookies.get("date")
    const pax = cookies.get("pax")
    const fullDate = cookies.get("fullDate")
    const email = cookies.get("email")

    const history = useHistory()
    
    
    const show = useState(true);

    const handleClose = () =>{
         dispatch(postReservation(fullDate, time, pax, email, id))
         let templateParams = {
           resto_name: resto,
           pax: pax,
           time: time,
           date: fullDate,
           user_email: email,
         };
         console.log(templateParams)
         emailjs.send(
             "service_vwcqene",
             "template_zn5kw4j",
             templateParams,
             "user_xvn5dt907bREXqYpY0YPa"
           )
           .then(
             (result) => {
               console.log(result.text);
               history.push('/myProfile')
             },
             (error) => {
               console.log(error.text);
             }
           );
         


        
        }

      

    
return ( 

      <>
       
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Su reserva fue confirmada</Modal.Title>
          </Modal.Header>
          <Modal.Body>Para {resto} el dia {day} para {pax} personas. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

}

