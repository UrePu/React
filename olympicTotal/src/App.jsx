import { useState } from "react";

import "./App.css";
import InputForm from "../components/InputForm";
import ShowForm from "../components/ShowForm";

function App() {
  const [formData, setFormData] = useState({
    countryName: "",
    goldMedal: 0,
    silverMedal: 0,
    bronzeMedal: 0,
  });

  return (
    <div className="container">
      <h2>2024 파리 올림픽</h2>
      <InputForm formData={formData} setFormData={setFormData}></InputForm>
      <ShowForm formData={formData} setFormData={setFormData}></ShowForm>
    </div>
  );
}

export default App;
