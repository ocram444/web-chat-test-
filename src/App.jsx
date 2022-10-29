import { useState } from 'react'
import './App.css'

function App() {
  const [conversation, setConversation] = useState('')

  //create a adds the message to the conversation, calls the 'send to server' function with the message
  const sendMessage = () => {
    //get the message from the input with the id 'textInput'
    let message = document.getElementById('textInput').value
    addToConversation(message);
    sendToServer(message);
  }

  const addToConversation = (message) => {
    //add the message to the conversation
    message = '\n\n Human: \n' + message
    setConversation(conversation + message);
  }



  //Front end side:

  //send the message to the server, and get the response back and log it to the console
  const sendToServer = async (message) => {
    console.log('about to call test POST - with message: ' + message)
    //send the message to the server
    const request = await fetch('http://localhost:5000/test', {
      method: 'POST',
      body: JSON.stringify({ myMessage: message})
    })
    const response = await request.json()
    console.log('test POST client side - response gotten: ' + response);
  }






  //create a function that adds the response to the conversation
  const addResponseToConversation = (response) => {
    //create a new message at the bottom

    //add the response to the conversation
    setConversation(conversation + 'input form bot' + response)
  }


  return (
    <div className="App">
      <div className='header'>Web Chat Test</div>
      <div className='chat'>
        <div className='conversationBox'>
          <div className='conversation'>
            {conversation}
          </div>
        </div>
        <div className='userInput'>
           <input type={'text'} id='textInput' className='textInput'></input> 
           <div className='sendButton' onClick={sendMessage}>Send</div>
        </div>
      </div>
      <div className='footer'>Footer</div>
    </div>
  )
}

export default App
