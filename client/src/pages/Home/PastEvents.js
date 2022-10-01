import './PastEvents.css'
import React from "react";

import Event from "./../../assets/Past Events/Vector.png";
// import Speaker from "./../../assets/Past Events/Speaker-1.png";
import SectionTitle from '../../components/Title';
import { PastEventsData } from './PastEventsData';
const PastEvents = () => {
  return (
    <>
      <SectionTitle title={"Past Events"} />
      {
        PastEventsData.map((Events) => {
          return (
            <div className="events-wrapper" key={Events.index}
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center">
              <img className="events-image" src={Event} alt="" />
              <div className="events-details">
                <div className="events-content">
                  <h3 className="events-title">{Events.title} <a href={Events.ytlink} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube" /></a></h3>
                  <h4 className="events-date-time">
                    <i className="fa-solid fa-calendar-minus" />&nbsp;
                    {Events.date}
                    &nbsp;&nbsp;&nbsp;
                    <span className="date-time-gap"><br /></span>
                    <i className="fa-solid fa-clock" />&nbsp;
                    {Events.time} IST
                  </h4>
                </div>
                <div className="events-guest">
                  <img className="guest-image" src={Events.guestimg} alt="" />
                  <h4 className="guest-title">{Events.guest}</h4>
                  <h3 className="guest-desgn">{Events.desgn1}</h3>
                  <h3 className="guest-desgn">{Events.desgn2}</h3>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  );
}

export default PastEvents;