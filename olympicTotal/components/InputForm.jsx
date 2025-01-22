import React from "react";
import Button from "./Button";
import Input from "./Input";

const InputForm = ({ formData, setFormData }) => {
  const addCountryHandler = () => {
    const getData = JSON.parse(localStorage.getItem("data")) || [];
    const isDuplicate = getData.some(
      (item) => item.countryName === formData.countryName
    );

    if (isDuplicate) {
      alert("이미 존재하는 국가입니다.");
      return;
    }

    if (!formData.countryName) {
      alert("국가명을 입력해주십시오.");
      return;
    }

    if (
      formData.goldMedal < 0 ||
      formData.silverMedal < 0 ||
      formData.bronzeMedal < 0
    ) {
      alert("메달 숫자에 음수가 들어갈 수 없습니다.");
      return;
    }

    const newEntry = { ...formData };
    localStorage.setItem("data", JSON.stringify([...getData, newEntry]));
    alert("국가가 성공적으로 추가되었습니다!");
  };

  const updateCountryHandler = () => {
    const getData = JSON.parse(localStorage.getItem("data")) || [];
    const existingEntryIndex = getData.findIndex(
      (item) => item.countryName === formData.countryName
    );

    if (!formData.countryName) {
      alert("국가명을 입력하여 주십시오.");
      return;
    }

    if (existingEntryIndex === -1) {
      alert("일치하는 국가명이 없습니다.");
      return;
    }

    getData[existingEntryIndex] = { ...formData };
    localStorage.setItem("data", JSON.stringify(getData));
    alert("국가 정보가 성공적으로 업데이트되었습니다!");
  };

  return (
    <form
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <Input
        label="국가명"
        type="text"
        value={formData.countryName}
        placeholder="국가 입력"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, countryName: e.target.value }))
        }
      />
      <Input
        label="금메달"
        type="number"
        value={formData.goldMedal}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            goldMedal: Number(e.target.value),
          }))
        }
      />
      <Input
        label="은메달"
        type="number"
        value={formData.silverMedal}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            silverMedal: Number(e.target.value),
          }))
        }
      />
      <Input
        label="동메달"
        type="number"
        value={formData.bronzeMedal}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            bronzeMedal: Number(e.target.value),
          }))
        }
      />
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
