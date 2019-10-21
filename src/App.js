import React,{ Component }from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';
//import Rank from './Components/Rank/Rank.js';
import Register from './Components/Register/Register.js';
import SignIn from './Components/SignIn/SignIn.js';
import './App.css';


const app = new Clarifai.App({
 apiKey: '1429bcfac364459e94a1b00dc7bffa83'
});

const particlesOptions = {
	particles: {
    number: {
    value: 30,
    density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}    			


class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'SignIn',
			isSignedIn: false
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		//console.log(width, height);
		return{
			  leftCol: clarifaiFace.left_col * width,
		      topRow: clarifaiFace.top_row * height,
		      rightCol: width - (clarifaiFace.right_col * width),
		      bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		//console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		//console.log('click');
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL, //"a403429f2ddf4b49b307e318f00e528b", 
				this.state.input)
				.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			    .catch(err => console.log(err)); 
	}

	onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

	render() {
	  return (
	    <div className="App">
	    	 <Particles className='particles'
	              params={particlesOptions}
	            />
	      <Navigation onRouteChange={ this.onRouteChange } />
	      { this.state.route === 'home'
	      	? <div>
			      <Logo />
			      {/*<Rank />*/}
			      <ImageLinkForm 
			      		onInputChange={this.onInputChange} 
			      		onButtonSubmit={this.onButtonSubmit}
			      />
			      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
		      </div>
		    : (
		    	this.state.route === 'SignIn'
		    	? <SignIn onRouteChange={this.onRouteChange}/>
		    	: <Register onRouteChange={this.onRouteChange}/>
		    	)
		  }
		 </div>
	  );
	}
}

export default App;

