import { useState } from "react";

import "./App.css";
import InputForm from "../components/InputForm";
import ShowForm from "../components/ShowForm";

function App() {
  return (
    <div className="container">
      <h2>2024 파리 올림픽</h2>
      <InputForm></InputForm>
      <ShowForm></ShowForm>
    </div>
  );
}

export default App;
