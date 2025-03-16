
import { useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client";
function App() {
const socket = useMemo(() => io("http://localhost:3000"), []);
  socket.on("connect", () => {
    console.log(socket.id)
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id, "connected")
     
    })
socket.on("welcome", (data) => {
  console.log(data)
})
    socket.on("receive-message", (data) => {
 console.log(data)
}
  )
  }, []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("message", message);
    setMessage("");
  }

  return (
    <>
      <h1>App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={e=>setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
