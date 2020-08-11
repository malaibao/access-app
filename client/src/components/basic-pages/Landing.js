import React from "react";
// import { Link } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import "./About.scss";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Landing = () => {
  return (
    <div className="about">
      <h2>Our Mission</h2>
      <p>
        Access for You focuses on sharing accessibility information on places in
        your community. 1 in 5 Canadians has a disability that adds additional
        planning and consideration ahead of common activities such as sharing a
        meal with friends at a restaurant or going to a concert. With a
        community approach to mapping locations and the features that make a
        place accessible, we advocate the need for accessibility while providing
        answers to the people that need it.
      </p>
      {/* <Link to="/map">SEARCH</Link> */}
      <AnimatedButton />
    </div>
  );
};

export default Landing;
