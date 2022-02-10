import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Widget } from "@uploadcare/react-widget";
import { addImagesToRestos } from '../../actions';



export default function LoadImage() {
 
    const params = useParams();

    let [input, setInput] = useState ({
        newPhoto: '',
        idRestaurant: params.id
        //images: []
    })

    function handleChange(e){
        setInput({newPhoto: 'https://ucarecdn.com/' + e.uuid + '/nth/' + 0 + '/'})
      //  for (let index = 0; index < e.count ; index++) {
           // setInput({images: input.images.push(('https://ucarecdn.com/' + e.uuid + '/nth/' + index + '/').toString())})          
     //   }
    }

    function handleClick(e){
        e.preventDefault()
        addImagesToRestos(input)
    }

//     cdnUrl: "https://ucarecdn.com/4db5c95e-31f9-4008-9c28-f18e5afffa3a~1/"
// count: 1
// isImage: true
// isStored: true
// name: "1 archivo"
// size: 53887
// uuid: "4db5c95e-31f9-4008-9c28-f18e5afffa3a~1"
// 4db5c95e-31f9-4008-9c28-f18e5afffa3a~1/nth/0/

  return (
    <div>

        <Widget publicKey='0a91ec69631fd28d2d4a' multiple='true' imagesOnly='true' locale='es' onChange={handleChange}/>
       <div>
           <button onClick={e => handleClick(e)}>
                Subir imagenes
           </button>
       </div>
    </div>
  )
}