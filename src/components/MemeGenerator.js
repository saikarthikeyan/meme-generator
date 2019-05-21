import React from 'react';


class MemeGenerator extends  React.Component {
  constructor(){
    super()
    this.state = {
    topText:"",
    bottomText:"",
    randomImage:"https://i.imgflip.com/1g8my4.jpg",
    allMemeImgs:[]
  }
  this.handlechange =this.handlechange.bind(this);
  this.handlegenerate =this.handlegenerate.bind(this)
  }

  componentDidMount(){
    return fetch("https://api.imgflip.com/get_memes", {
                                 method: 'GET',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 headers: {
                                     //'Content-Type': 'application/json',

                                 }
                 })
                 .then(response => response.json())
                 .then(data => {

                   const memes = data.data.memes

                   this.setState({
                     allMemeImgs:memes
                   })

                 }

              )
  }

  handlechange(e){
    const {name,value} = e.target
    this.setState({
        [name]:value
    })
  }

  handlegenerate(event){

    event.preventDefault();
    const random =Math.floor(Math.random()* this.state.allMemeImgs.length)

    const randMemeImg =  this.state.allMemeImgs[random].url
    
    this.setState({
        randomImage:randMemeImg
    })

  }

  render(){
    return (
      <React.Fragment>
      <form className="meme-form" onSubmit={this.handlegenerate} >
      <div className="top_text">
       <label>Top Text</label>
       <input type="text"
       name="topText"
       placeholder="Top Text"
       value={this.state.topText}
       onChange={this.handlechange} />
      </div>
      <div className="bottom_text">
       <label>Top Text</label>
       <input type="text"
       name="bottomText"
       placeholder="Bottom Text"
       value={this.state.bottomText}
       onChange={this.handlechange} />
      </div>
      <button>GENERATE</button>
      </form>
      <div>
      <img src={this.state.randomImage} />
      <h2>{this.state.topText}</h2>
      <h2>{this.state.bottomText}</h2>

      </div>
      </React.Fragment>
    )
  }
}

export default MemeGenerator;
