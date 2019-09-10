import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';




const particlesOptions={
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area:400
      }
    }
  }
}

const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:'',
    joined:''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

onSearchChange=(event) => {
  this.setState({input:event.target.value});
}

searchForFace=(data) => {
  console.log(data);
  const face=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById('inputImage');
  const width=Number(image.width);
  const height=Number(image.height);
  const obj = {
    leftColumn:face.left_col*width,
    topRow:face.top_row*height,
    rightColumn:width-face.right_col*width,
    bottomRow:height-face.bottom_row*height
  }
  this.setState({box:obj});
}

onButtonSubmit=() => {
  this.setState({imageUrl:this.state.input});
  fetch('https://boiling-shore-09025.herokuapp.com/imageurl',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      input:this.state.input
    })
  })
  .then(response=>response.json())
  .then(response=>{
    this.searchForFace(response);
    if(response){
      fetch('https://boiling-shore-09025.herokuapp.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
        })
      }).then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
    }
    })
}

onRouteChange=(route) => {
  if(route==='home'){
    this.setState({isSignedIn:true});
  }
  else if(route==='signout'){
    this.setState(initialState);
  }
  this.setState({route:route});
}

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { (this.state.route==='home')
          ?<div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onSearchChange={this.onSearchChange} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            :(this.state.route==='signin')
              ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

        }

      </div>
    );
  }

}

export default App;
