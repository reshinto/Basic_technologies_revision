import React, { useEffect } from "react";
import * as api from "./services/api";

export default function App() {
  useEffect(async () => {
    const res = await api.users.get();
    console.log(res);
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
