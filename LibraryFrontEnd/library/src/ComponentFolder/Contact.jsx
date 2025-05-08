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
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="on"
              required="true"
              placeholder="Your Name"
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="on"
              required="true"
              placeholder="Your Email"
            />
            <br />
            <input
              type="number"
              id="number"
              name="number"
              autoComplete="on"
              required="true"
              placeholder="Phone Number"
            />
            <br />
            <textarea
              name="textarea"
              autoComplete="on"
              required="true"
              placeholder="Your Message"
            ></textarea>
            <br />
            <button type="button">Send Message</button>
            <a href="/" className="goback">
              Go Back
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
