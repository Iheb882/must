import "./App.css";
import { Switch, Route } from "react-router-dom"; // Switch  to let each route work by itself
import Home from "./home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import Admin from "./admin/Admin";
import Chart from "./chart/Chart";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/chart" component={Chart} />
      </Switch>
    </div>
  );
}

export default App;
