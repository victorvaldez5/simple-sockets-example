import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';

const Message = React.memo(({message}) => {
  return <h4>{message}</h4>
})
const socket = socketIOClient('http://localhost:4001');
function App() {
  const [stream, setStream] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    socket.on('streaming', data => {
      setStream(data);
    });
    socket.on('serverMessage', data => {
      setMessages([...messages, data])
    })
  }, [messages]);
  const onClickHanlder = () =>  {
    socket.emit('clientMessage');
  }

  return (
    <div>
      <button onClick={onClickHanlder}>Talk To Server</button>
      <h1>Server Messages: </h1>
      {messages.map((message, index) => {
        return <Message message={message} key={index} />
      })}
    </div>
  );
}

export default App;
