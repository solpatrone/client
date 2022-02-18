import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import { postReservation } from '../../actions';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router';



export default function MercadoPago(){

   
     const cookies = new Cookies();
     const id = cookies.get("id")
    // const resto = cookies.get("RestoNameReserv", restoId.name,{ path: "/" })
    // const time = cookies.get("time", reservations.time.value ,{ path: "/" })
    // const day = cookies.get("date", date ,{ path: "/" })
    // const pax = cookies.get("pax", reservations.pax ,{ path: "/" })
    // const email = cookies.get("email", reservations.email ,{ path: "/" })
    
    const history = useHistory()
    
    const [show, setShow] = useState(true);

    const handleClose = () =>{
         setShow(false);
         history.push(`/restaurants/${id}`)
        }

    
return ( 

      <>
       
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reserva Cancelada</Modal.Title>
          </Modal.Header>
          <Modal.Body>El pago de su reserva no pudo ser procesado, intente nuevamente </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

}
