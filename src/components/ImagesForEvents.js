
import React from 'react';
import Upload from "../components/Upload"
const images = require.context('./imagesEvents', true);
const imageList = images.keys().map(image => images(image));

function ImagesForEvents() {
  return (
    <div>
      {imageList.map((image, index) => (
        <img style={{margin:"2%"}} key={index} src={image} alt={`image-${index}.png`} />

      ))} 
      <Upload></Upload>
    </div>
  );
}
export default ImagesForEvents;