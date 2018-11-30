import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return(
    <div >
      <p className="f3">
        {'Face Detector Online!'}
      </p>
      <div className="center">
        <div className="center pa4 br3 form shadow-5-l">
          <input className="f4 pa2 w-70 center shadow-4-l" id="input" type="text" placeholder="Enter image url" onChange={onInputChange} />
          <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple shadow-5-l" id="Detect">Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;