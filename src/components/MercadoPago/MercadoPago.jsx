import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { postReservation } from '../../actions';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router';
// import emailjs from "emailjs-com"


export default function MercadoPago(){

    const dispatch = useDispatch()
    const cookies = new Cookies();
    const id = cookies.get("id")
    const resto = cookies.get("RestoNameReserv")
    const time = cookies.get("time")
    const day = cookies.get("date")
    const pax = cookies.get("pax")
    const email = cookies.get("email")
    
    const history = useHistory()
    
    
    const [show, setShow] = useState(true);

    const handleClose = () =>{
         dispatch(postReservation(day, time, pax, email, id))
        //  let templateParams = {
        //    resto_name: resto,
        //    pax: pax,
        //    time: time,
        //    date: day,
        //    user_email: email,
        //  };
        //  emailjs
        //    .send(
        //      "service_vwcqene",
        //      "template_zn5kw4j",
        //      templateParams,
        //      "user_xvn5dt907bREXqYpY0YPa"
        //    )
        //    .then(
        //      (result) => {
        //        console.log(result.text);
        //      },
        //      (error) => {
        //        console.log(error.text);
        //      }
        //    );
         setShow(false);
         history.push('/myProfile')
        }

    
return ( 

      <>
       
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Su reserva fue confirmada</Modal.Title>
          </Modal.Header>
          <Modal.Body>Para {resto}, el dia {day} para {pax} personas. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

}

