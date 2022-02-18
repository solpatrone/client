import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { postReservation } from '../../actions';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router';



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

