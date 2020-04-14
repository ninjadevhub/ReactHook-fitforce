import React from "react";
import {Route} from "react-router-dom";

// Pages
import Countries from "./pages/Countries";
import Trainer from "./pages/Trainer";
import Trainers from "./pages/Trainers";

export default (
    <Route>
      <Route exact path="/" component={Countries} />
      <Route exact path="/trainers-country/:country" component={Trainers} />
      <Route exact path="/trainers-city/:country/:city" component={Trainers} />
      <Route exact path="/trainers-service/:service/" component={Trainers} />
      <Route exact path="/trainers-category/:category/" component={Trainers} />
      <Route exact path="/trainer-profile/:id" component={Trainer} />
    </Route>

  );
