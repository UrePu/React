import React, { useState, useEffect } from "react";
import Button from "./Button";

// 공통 스타일 정의
const styles = {
  table: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "1020px",
    marginTop: "20px",
    marginLeft: "15px",
  },
  head: {
    display: "flex",
    color: "white",
    width: " 100%",
    fontWeight: "700",
    fontSize: "16px",
    height: "45px",
    backgroundColor: "#00367f",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "15px 15px 0 0",
    cursor: "pointer",
    userSelect: "none",
  },
  cell: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
  },
  row: (index, isLast) => ({
    display: "flex",
    height: "45px",
    width: " 100%",
    alignItems: "center",
    backgroundColor: index % 2 === 0 ? "#e5e6fa" : "#f5f4f9",
    fontWeight: "700",
    fontSize: "16px",
    borderRadius: isLast ? "0px 0px 15px 15px" : "0px",
  }),
  noData: {
    width: "990px",
    textAlign: "center",
    fontSize: "20px",
    color: "#555",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "15px",
  },
};

// ShowForm 컴포넌트
const ShowForm = ({ formData, setFormData }) => {
  const [gotData, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [sortConfig, setSortConfig] = useState({
    key: "countryName",
    direction: "asc",
  });

  // 기본 정렬: 이름 오름차순
  useEffect(() => {
    if (gotData.length > 0) {
      const sortedData = [...gotData].sort((a, b) =>
        a.countryName > b.countryName ? 1 : -1
      );
      setData(sortedData);
    }
  }, []);

  // 데이터 정렬 함수
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else if (key !== "countryName") {
      // 메달 정렬은 첫 클릭 시 내림차순
      direction = "desc";
    }

    const sortedData = [...gotData].sort((a, b) => {
      const aValue =
        key === "totalMedal"
          ? Number(a.goldMedal) + Number(a.silverMedal) + Number(a.bronzeMedal)
          : a[key];

      const bValue =
        key === "totalMedal"
          ? Number(b.goldMedal) + Number(b.silverMedal) + Number(b.bronzeMedal)
          : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // 데이터 삭제 함수
  const deleteControl = (name) => {
    const filteredData = gotData.filter((d) => d.countryName !== name);
    setData(filteredData);
    localStorage.setItem("data", JSON.stringify(filteredData));
  };

  const IntoInput = (name) => {
    const filteredData = gotData.filter((d) => d.countryName === name);
    setFormData(filteredData[0]);
  };

  return (
    <div style={styles.table}>
      {gotData.length > 0 ? (
        <>
          <TableHeader sortData={sortData} sortConfig={sortConfig} />
          {gotData.map((data, index) => (
            <TableRow
              key={data.countryName}
              IntoInput={IntoInput}
              data={data}
              index={index}
              isLast={index === gotData.length - 1}
              deleteControl={deleteControl}
            />
          ))}
        </>
      ) : (
        <div style={styles.noData}>데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default ShowForm;

// 헤더 컴포넌트
const TableHeader = ({ sortData, sortConfig }) => (
  <div style={styles.head}>
    <div style={styles.cell} onClick={() => sortData("countryName")}>
      국가명
      {sortConfig.key === "countryName" &&
        (sortConfig.direction === "asc" ? "▲" : "▼")}
    </div>
    <div style={styles.cell} onClick={() => sortData("goldMedal")}>
      금메달
      {sortConfig.key === "goldMedal" &&
        (sortConfig.direction === "asc" ? "▲" : "▼")}
    </div>
    <div style={styles.cell} onClick={() => sortData("silverMedal")}>
      은메달
      {sortConfig.key === "silverMedal" &&
        (sortConfig.direction === "asc" ? "▲" : "▼")}
    </div>
    <div style={styles.cell} onClick={() => sortData("bronzeMedal")}>
      동메달
      {sortConfig.key === "bronzeMedal" &&
        (sortConfig.direction === "asc" ? "▲" : "▼")}
    </div>
    <div style={styles.cell} onClick={() => sortData("totalMedal")}>
      총합
      {sortConfig.key === "totalMedal" &&
        (sortConfig.direction === "asc" ? "▲" : "▼")}
    </div>
    <div style={styles.cell}>액션</div>
  </div>
);

// 행 컴포넌트
const TableRow = ({
  data,
  index,
  isLast,
  deleteControl,
  IntoInput,
  totalMedal,
}) => (
  <div style={styles.row(index, isLast)}>
    <div onClick={() => IntoInput(data.countryName)} style={styles.cell}>
      {data.countryName}
    </div>
    <div style={styles.cell}>{data.goldMedal}</div>
    <div style={styles.cell}>{data.silverMedal}</div>
    <div style={styles.cell}>{data.bronzeMedal}</div>
    <div style={styles.cell}>
      {Number(data.goldMedal) +
        Number(data.silverMedal) +
        Number(data.bronzeMedal)}
    </div>
    <div style={styles.cell}>
      <Button color="red" onClick={() => deleteControl(data.countryName)}>
        삭제
      </Button>
    </div>
  </div>
);
