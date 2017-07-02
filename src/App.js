import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      word: 'Getting new word...',
      active: true
    };

    this.getNewWord = this.getNewWord.bind(this)
    this.submitReaction = this.submitReaction.bind(this)
  }

  componentDidMount() {
    this.getNewWord()
  }

  getNewWord() {
    console.log('get new word called')
    axios.get("http://localhost:1337/word")
      .then(res => {
        let {word} = res.data
        this.setState({
          active: true,
          word
        })
      })
      .catch(e => {
        console.log('eerror', JSON.stringify(e))
      })
  }

  submitReaction(value) {

    const reaction = (value == 1) ? '+' : '-';
    const object = {
      word: this.state.word,
      reaction
    }

    this.setState({
      word: 'Getting new Word...',
      active: false
    })

    axios.post('http://localhost:1337/reaction', object)
      .then(this.getNewWord)
      .catch(e => {
        console.log('failed reacting ');
        this.setState({
          word: 'Click to reset', 
          active: true
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="word"> {this.state.word} </div>
        <div className="button-container">
          <button className="sexy-button green" onClick={() => this.submitReaction(1)} disabled={!this.state.active}>  + </button>
          <button className="sexy-button red" onClick={() => this.submitReaction(-1)} disabled={!this.state.active}> - </button>
        </div>
      </div>
    );
  }
}

export default App;
