import "./TeamCard.css";
import React from "react";

const TeamCard = ({ props }) => {
  return (
    <div
      className="card-wrapper"
      data-aos="fade-up"
      data-aos-delay="20"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
    >
      <img src={props.image} alt={props.name} />
      <div className="card-content">
        <h3>{props.name}</h3>
        <h4>{props.post}</h4>
      </div>
      <a href={props.linkdUrl} target="_blank" rel="noopener noreferrer">
        <i className="team-sm fab fa-linkedin" />
      </a>
    </div>
  );
};

export default TeamCard;
