import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import s from './Nosotros.module.css'
export default function Nosotros(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Quines somos?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Team Hero</h4>
          <div>
            <a href="https://www.linkedin.com/in/erikaberenicemasini/" target="_blank"  rel="noreferrer" className={s.link}> Erika Masini</a><br></br>
            <a href="https://www.linkedin.com/in/florenciaperezduarte/" target="_blank"  rel="noreferrer" className={s.link}> Florencia Pereze Duarte</a><br></br>
            <a href="https://www.linkedin.com/in/sol-patrone/" target="_blank"  rel="noreferrer" className={s.link}> Sol Patrone</a><br></br>
            <a href="https://www.linkedin.com/in/christian-hampel88/" target="_blank"  rel="noreferrer" className={s.link}> Christian Hampel</a><br></br>
            <a href="https://www.linkedin.com/in/sergio-cepeda-dev/" target="_blank"  rel="noreferrer" className={s.link}> Sergio Cepeda</a><br></br>
            <a href="https://www.linkedin.com/in/juanmurillop/" target="_blank"  rel="noreferrer" className={s.link}> Juan Carlos Murrillo </a><br></br>
            <a href="https://www.linkedin.com/in/mprecelle/" target="_blank"  rel="noreferrer" className={s.link}> Martin Precelle</a><br></br>
            <a href="https://www.linkedin.com/in/josecossibracho/" target="_blank"  rel="noreferrer" className={s.link}> Jose Cossi</a><br></br>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }