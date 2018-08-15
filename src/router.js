import React from "react";
import {BrowserRouter as Router, Route } from 'react-router-dom'
import  Home  from "./Component/Home";
import  login  from "./Component/login";
import  signup  from "./Component/signup";




const Routes = () => (
<Router>
  <div>
    <Route exact path="/" component={login}/>
    <Route path="/home" component={Home}/>
    <Route path="/signup" component={signup}/>
  </div>
</Router>
)
    

export default Routes;