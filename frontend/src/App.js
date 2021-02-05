import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./pages/Register";
import Instruction from "./pages/Instruction";
import Sound from "./pages/Sound";
import Rating from "./pages/Rating";
import End from "./pages/End";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center m-auto">
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
