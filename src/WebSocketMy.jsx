import { useEffect, useState } from "react";
import ObjectList from "./ObjectList";

const WebSocketComponent = () => {
  const [websocket, setWebsocket] = useState(null);
  const [students, setStudents] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("Połączono z WebSocketem");
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Otrzymano dane z WebSocket:", data);
      if (data.event === "update") {
        console.log("Otrzymano dane z WebSocket:", data.data);
        setStudents(data.data);
      }
    };

    ws.onclose = () => {
      console.log("Rozłączono z WebSocketem");
      setWebsocket(null);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Lista Studentów:</h1>
      <ul>
        <ObjectList obj={students} />
      </ul>
    </div>
  );
};

export default WebSocketComponent;
