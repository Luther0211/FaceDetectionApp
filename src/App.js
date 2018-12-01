import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';


const app = new Clarifai.App({
  apiKey: '634919bd88774d0eaa45178bd098f741'
});

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

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)
    console.log(clarifaiFace)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then( res => this.displayFaceBox(this.calculateFaceLocation(res)))
    .catch(err => console.log(err))
    }


  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Navigation />
        <Logo />
        <Rank /> 
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
