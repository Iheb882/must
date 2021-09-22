import "./App.css";
import { Switch, Route } from "react-router-dom"; // Switch  to let each route work by itself
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Admin from "./components/admin/Admin";
import Chart from "./components/chart/Chart";
import PublicRoute from "./components/publicRoute/PublicRoute";
import WrongPath from "./components/wrong/WrongPath";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AdminRoute from "./components/adminRoute/AdminRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/wrong" component={WrongPath} />
        <PublicRoute path="/register" restricted={true} component={Register} />
        <PublicRoute path="/login" restricted={true} component={Login} />
        <PrivateRoute path="/chart" component={Chart} />
        <AdminRoute path="/admin" restricted={true} component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
