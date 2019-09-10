import React from 'react';
import './ImageLinkForm.css'

function ImageLinkForm({onSearchChange,onButtonSubmit}){
  return(
    <div>
      <p>{'This Smart Brain will detect faces in your pictures. Give it a try.'}</p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input placeholder={'Enter a URL'} className='center f4 pa2 w-70 ' type='text' onChange={onSearchChange}/>
          <button onClick={onButtonSubmit} className=' w-30 grow link pointer ph3 pv2 dib white bg-blue'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
