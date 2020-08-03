import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

//COMPONENT IMPORTS
import Navbar from "../components/layout/Navbar";

//STORIES
storiesOf("Navbar", module).add("Navbar", () => <Navbar />);
