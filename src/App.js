import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./Routes";

import "./App.scss";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          {Routes}
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
