import React from "react";
import TabsUser from "../components/TabsUser";
import image from "../components/images/volonteer.png"

import data from "../data.json"




export default function UserInfo() { 
 
  return (< div>

  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            < div style={{textAlign:"left", margin:"2%"}}>
                <h1>{data.users[0].name}</h1>
                <p><strong>FIN:</strong>{data.users[0].fin}</p>
                <p><strong>Cinsi: </strong>{data.users[0].gender}</p>
                <p><strong>Doğulduğu tarix (gün, ay, il): </strong>{data.users[0].birthdate}</p>
                <p><strong>Doğulduğu yer (ölkə, şəhər və ya rayon, kənd):</strong> {data.users[0].passport.address}</p>
                <p><strong>Status:</strong>Fəaliyyəti dəvam edən</p>
                <p><strong>Fəaliyyətə başlama tarixi:</strong> 10.02.2024</p>
            </div> 
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>

<img src={image} style={{width:"180px", marginLeft:"20px"}}></img>

            </div>  
            </div>
<TabsUser/>
            </div>
       
  );


};

