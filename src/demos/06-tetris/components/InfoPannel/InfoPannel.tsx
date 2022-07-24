import React from "react";
import { useSelector } from "react-redux";
import { selectInfo } from "../../pannelSlice";
import "./InfoPannel.less";

export default function InfoPannel() {
  const { level, score, record } = useSelector(selectInfo);

  return (
    <div className="info-pannel">
      <section className="highest-score">record: {record}</section>
      <section className="level">level: {level}</section>
      <section className="score">score: {score}</section>
    </div>
  );
}
