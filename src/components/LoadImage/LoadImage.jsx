import React, {useState} from 'react';
import { Widget } from "@uploadcare/react-widget";



export default function LoadImage() {
 

    let [input, setInput] = useState ({
        images: []
    })

    function handleChange(e){
        for (let index = 0; index < e.count ; index++) {
            setInput({images: input.images.push(('https://ucarecdn.com/' + e.uuid + '/nth/' + index + '/').toString())})          
        }
        console.log(e.uuid)
        console.log(input)
        
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
       
    </div>
  )
}