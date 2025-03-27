import React from "react";
import "../CssFolder/Contact.css";
import Navpage from "./Navpage";
import Footer from "./Footer";

function Contact() {
  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="contactdiv">
            <h2>Send Us Your Valuable Feedback !</h2>
            <input type="text" placeholder="Your Name" />
            <br />
            <input type="email" placeholder="Your Email" />
            <br />
            <input type="text" placeholder="PhoneNumber" />
            <br />
            <textarea name="textarea" placeholder="Your Message"></textarea>
            <br />
            <button type="button">Send Message</button>
            <a href="/" className="goback">
              Go Back
            </a>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Contact;
