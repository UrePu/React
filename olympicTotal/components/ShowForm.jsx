import React, { useState } from "react";
import Button from "./Button";

const ShowForm = () => {
  const [gotData, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const deleteControl = (name) => {
    const filteredData = gotData.filter((d) => d.countryName !== name);
    setData(filteredData);
    localStorage.setItem("data", JSON.stringify(filteredData));
  };

  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    width: "1000px",
    marginTop: "20px",
  };

  const headStyle = {
    display: "flex",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    height: "45px",
    backgroundColor: "#00367f",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "15px 15px 0 0",
    overflow: "hidden",
  };

  const cellStyle = {
    flex: 1,
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={tableStyle}>
      {gotData.length > 0 ? (
        <>
          <div style={headStyle}>
            <div style={{ ...cellStyle, fontWeight: "700" }}>국가명</div>
            <div style={{ ...cellStyle, fontWeight: "700" }}>금메달</div>
            <div style={{ ...cellStyle, fontWeight: "700" }}>은메달</div>
            <div style={{ ...cellStyle, fontWeight: "700" }}>동메달</div>
            <div style={{ ...cellStyle, fontWeight: "700" }}>액션</div>
          </div>
          {gotData.map((d, index) => (
            <FormAdd
              key={d.countryName}
              data={d}
              index={index}
              isLast={index === gotData.length - 1}
              deleteControl={deleteControl}
            />
          ))}
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#555",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "15px",
          }}
        >
          데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ShowForm;

const FormAdd = ({ data, index, isLast, deleteControl }) => {
  const rowStyle = {
    display: "flex",
    height: "45px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: index % 2 === 0 ? "#e5e6fa" : "#f5f4f9",
    fontWeight: "700",
    fontSize: "16px",
    borderRadius: isLast ? "0px 0px 15px 15px" : "0px",
  };

  const cellStyle = {
    flex: 1,
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={rowStyle}>
      <div style={cellStyle}>{data.countryName}</div>
      <div style={cellStyle}>{data.goldMedal}</div>
      <div style={cellStyle}>{data.silverMedal}</div>
      <div style={cellStyle}>{data.bronzeMedal}</div>
      <div style={{ ...cellStyle, borderRight: "none" }}>
        <Button onClick={() => deleteControl(data.countryName)}>삭제</Button>
      </div>
    </div>
  );
};
