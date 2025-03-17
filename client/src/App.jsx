
import { useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client";
function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);




const socket = useMemo(() => io("http://localhost:3000"), []);
  socket.on("connect", () => {
    console.log(socket.id)
  });

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log(socket.id, "connected")
     
    })
socket.on("welcome", (data) => {
  console.log(data)
})
    socket.on("receive-message", (data) => {
      setReceivedMessage(prevState => [...prevState, data]);
    
 console.log(data)
}
  )
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("message", { message ,room});
    setMessage("");
    setRoom("");
  }

  return (
    <>
      <h1>App</h1>
      <h2>Socket ID: {socketId}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <input type="text" name="" id=""  placeholder="room id" value={room} onChange={e=>setRoom(e.target.value)}/>
        <button type="submit">Send</button>
      </form>
      <ul>
        {receivedMessage.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </>
  )
}

export default App
