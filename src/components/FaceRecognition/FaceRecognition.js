import React from 'react';
import './FaceRecognition.css'

function FaceRecognition({imageUrl,box}){
  return (
    <div className="center">
      <div className="absolute mt3">
        <img id='inputImage' alt="" width='500px' height='auto'  src={imageUrl}/>
        <div className='bounding-box' style={{top:box.topRow, right:box.rightColumn, bottom:box.bottomRow, left:box.leftColumn}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
