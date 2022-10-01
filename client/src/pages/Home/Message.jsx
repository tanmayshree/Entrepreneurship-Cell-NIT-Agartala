import React from "react";
import SectionTitle from "../../components/Title";
import "./Message.css";
import sumandeb from "./../../assets/ecellimages/suman-deb.png";
import rajkhushkumar from "./../../assets/ecellimages/rajkhush-kumar-1.jpg";

export default function Message() {
  return (
    <div
      className="message-page"
      data-aos="fade"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <SectionTitle title={"Our Faculty Advisor"} />
      <div className="message-wrapper">
        <div className="message-faculty">
          <img src={sumandeb} alt="" />
          <p className="faculty-name">Dr. Suman Deb</p>
          <p className="faculty-desgn">Chairman & Faculty Advisor</p>
          <p className="faculty-desgn">Institute Innovation Cell & E-Cell</p>
        </div>
        <div className="message-content">
          <p className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            veniam hic ducimus, excepturi optio ipsa eaque inventore, laboriosam
            cupiditate nesciunt a earum omnis quo? Dolorem consectetur aut
            reprehenderit earum fugiat obcaecati saepe. Totam eaque consequuntur
            neque cumque aperiam vitae non, laboriosam nam animi odio
            repellendus aliquam autem, quibusdam aut earum. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Saepe, quam? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Porro esse explicabo
            quae dolore vitae quibusdam. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Soluta, vero.
          </p>
        </div>
      </div>

      <SectionTitle title={"Presidential Note"} />
      <div className="message-wrapper">
        <div className="message-faculty">
          <img src={rajkhushkumar} alt="" />
          <p className="faculty-name">Rajkhush Kumar</p>
          <p className="faculty-desgn">President, E-Cell</p>
          {/* <p className="faculty-desgn">E-Cell</p> */}
        </div>
        <div className="message-content">
          <p className="message">
            Entrepreneurship is the creation or extraction of value.
            Entrepreneurship is viewed as change, generally entailing risk
            beyond what is normally encountered in starting a business, which
            may include other values than simply economic ones. An entrepreneur
            is an individual who creates a new business, bearing most of the
            risks and enjoying most of the rewards. The process of setting up a
            business is known as entrepreneurship. The entrepreneur is commonly
            seen as an innovator, a source of new ideas, goods, services, and
            business/or procedures.
          </p>
        </div>
      </div>
    </div>
  );
}
