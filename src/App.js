import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai'

const particlesConfig = {
  "particles":{
    "number":{
      "value":100,
      "density":{
        "enable":true,
        "value_area":600
      }
    },
    "color":{
      "value":"#ffffff"
    },
    "shape":{
      "type":"circle",
      "stroke":{
        "width":0,
        "color":"#000000"
      },
      "polygon":{
        "nb_sides":5
      },"image":{
        "src":"img/github.svg",
        "width":100,"height":100
      }
    },
    "opacity":{
      "value":.5,
      "random":false,
      "anim":{
        "enable":false,
        "speed":1,
        "opacity_min":0.1,
        "sync":false
      }
    },
    "size":{
      "value":2,
      "random":true,
      "anim":{
        "enable":false,
        "speed":40,
        "size_min":0.1,
        "sync":false
      }
    },
    "line_linked":{
      "enable":true,
      "distance":150,
      "color":"#ffffff",
      "opacity":0.6,
      "width":.8
    },
    "move":{
      "enable":true,
      "speed":2,
      "direction":"none",
      "random":false,
      "straight":false,
      "out_mode":"out",
      "bounce":true,
      "attract":{
        "enable":false,
        "rotateX":600,
        "rotateY":1200
      }
    }
  },
  "interactivity":{
    "detect_on":"window",
    "events":{
      "onhover":{
        "enable":true,
        "mode":"grab"
      },
      "onclick":{
        "enable":true,
        "mode":"bubble"
      },
      "resize":true
    },
    "modes":{
      "grab":{
        "distance":400,
        "line_linked":{
          "opacity":1
        }
      },
      "bubble":{
        "distance":350,
        "size":14,
        "duration":.35,
        "opacity":.7,
        "speed":3
      },
      "repulse":{
        "distance":200,
        "duration":0.4
      },
      "push":{
        "particles_nb":4
      },
      "remove":{
        "particles_nb":2
      }
    }
  },
  "retina_detect":true
}

const app = new Clarifai.App({
  apiKey: '634919bd88774d0eaa45178bd098f741'
});


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(res) {
        console.log(res.outputs[0].data.regions)
      },
      function(err) {
        console.log(err)
      }
    );
  }


  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank /> 
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Particles className="particles" params={particlesConfig} />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
