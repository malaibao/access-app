import React from "react";
import { Link } from "react-router-dom";

import "./About.scss";

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
      <Link to="/map">SEARCH</Link>
    </div>
  );
};

export default Landing;
