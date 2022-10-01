import SectionTitle from '../../components/Title';
import './Contact.css'
import React from "react";

const Contact = () => {
  return (
    <div style={{marginTop: "150px"}} className='contact-page'>
      <SectionTitle title={"Contact Us"} />
      <div className="contact-persons">
        <div className="contact-person">
          <h4 className='contact-name'>Rajkhush Kumar</h4>
          <div><a href="tel:+917008640589"><i className="fa-solid fa-phone contact-sm" /></a>
          <a href = "mailto: rajkhush.ecell@gmail.com"><i className="fa-solid fa-envelope contact-sm" /></a></div>
        </div>
        <div className="contact-person">
          <h4 className='contact-name'>Kartikeya Singh</h4>
          <div><a href="tel:+919368935647"><i className="fa-solid fa-phone contact-sm" /></a>
          <a href = "mailto: kartikeya.singh.ecell@gmail.com"><i className="fa-solid fa-envelope contact-sm" /></a></div>
        </div>
        <div className="contact-person">
          <h4 className='contact-name'>Rashmita Chakraborty</h4>
          <div><a href="tel:+918258947677"><i className="fa-solid fa-phone contact-sm" /></a>
          <a href = "mailto: rashmita.ecell@gmail.com"><i className="fa-solid fa-envelope contact-sm" /></a></div>
        </div>
      </div>
      <h3 className='contact-other'>Or</h3>
      <h4 className='contact-other'>Contact us at:</h4>
      <a className='ecell-mail-link' href = "mailto: nitaecell@gmail.com"><i className="fa-solid fa-envelope contact-sm ecell-mail" /><span className="ecell-mail">nitaecell@gmail.com</span></a>
    </div>
  );
}

export default Contact;