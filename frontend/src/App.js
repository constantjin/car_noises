import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./pages/Register";
import Instruction from "./pages/Instruction";
import Sound from "./pages/Sound";
import Rating from "./pages/Rating";
import End from "./pages/End";

function App() {
  const resize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log("resized");
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", () => resize());
  }, []);

  return (
    <div
      className="flex flex-col h-screen justify-center items-center text-center"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Register} />
          <Route exact={true} path="/instruction" component={Instruction} />
          <Route exact={true} path="/sound" component={Sound} />
          <Route exact={true} path="/rating" component={Rating} />
          <Route exact={true} path="/end" component={End} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
