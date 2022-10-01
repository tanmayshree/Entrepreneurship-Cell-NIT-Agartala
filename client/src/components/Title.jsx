import "./Title.css";
import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div>
      <div className="section-title-box">
        <span className="section-title">{title}</span>
      </div>
    </div>
  );
};

export default SectionTitle;
