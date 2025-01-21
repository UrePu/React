import React, { useState } from "react";
import Button from "./Button";

const InputForm = () => {
  const [countryName, setCountryName] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSilverMedal] = useState(0);
  const [bronzeMedal, setBronzeMedal] = useState(0);

  const addCountryHandler = () => {
    const getData = JSON.parse(localStorage.getItem("data"));
    let ifReturn = false;
    if (getData !== null) {
      getData.map((e) => {
        if (e.countryName === countryName) {
          ifReturn = true;
          return;
        }
      });
    }
    if (ifReturn) {
      alert("이미 존재하는 국가입니다.");
      return;
    }
    if (countryName === "") {
      alert("국가명을 입력해주십시오.");
      return;
    }
    const value = {
      countryName: countryName,
      goldMedal: goldMedal,
      silverMedal: silverMedal,
      bronzeMedal: bronzeMedal,
    };

    if (getData !== null) {
      let newData = [...getData, value];
      localStorage.setItem("data", JSON.stringify(newData));
    } else {
      localStorage.setItem("data", JSON.stringify([value]));
    }
  };
  const updateCountryHandler = () => {
    const getData = JSON.parse(localStorage.getItem("data"));
    if (countryName === "") {
      alert("국가명을 입력하여 주십시오.");
      return;
    }
    if (getData !== null) {
      let update = getData.filter((e) => e.countryName === countryName);
      if (!update[0]) {
        alert("일치하는 국가명이 없습니다.");
        return;
      }
      update = {
        countryName: countryName,
        goldMedal: goldMedal,
        silverMedal: silverMedal,
        bronzeMedal: bronzeMedal,
      };
      let newData = getData.map((d) => {
        if (d.countryName === countryName) {
          return update;
        } else return d;
      });

      localStorage.setItem("data", JSON.stringify(newData));
    }
  };
  return (
    <form style={{ display: "flex", gap: "10px", alignItems: "end" }}>
      <div>
        <div>국가명</div>
        <input
          type="text"
          value={countryName}
          placeholder="국가 입력"
          onChange={(e) => setCountryName(e.target.value)}
        />
      </div>
      <div>
        <div>금메달</div>
        <input
          type="number"
          value={goldMedal}
          onChange={(e) => setGoldMedal(Number(e.target.value))}
        />
      </div>
      <div>
        <div>은메달</div>
        <input
          type="number"
          value={silverMedal}
          onChange={(e) => setSilverMedal(Number(e.target.value))}
        />
      </div>
      <div>
        <div>동메달</div>
        <input
          type="number"
          value={bronzeMedal}
          onChange={(e) => setBronzeMedal(Number(e.target.value))}
        />
      </div>
      <Button font="black" color="#ffcc00" onClick={addCountryHandler}>
        국가 추가
      </Button>
      <Button font="black" color="#ffcc00" onClick={updateCountryHandler}>
        업데이트
      </Button>
    </form>
  );
};
export default InputForm;
