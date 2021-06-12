import './App.css';
import NavBar from './components/nav bar/navBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateVehicle from './components/create vehicle/create.vehicle';
import Vehicles from './components/vehicles/vehicles';
import Categories from './components/categories/categories';
import Vehicle from './components/vehicles/vehicle';
import createCategory from './components/create category/createCategory';
import TripCharges from './components/trip charges/tripcharges';

function App() {
  return (
    <Router>
    <NavBar/>
    <section>
      <Switch>
        <Route path="/create-vehicle" component={CreateVehicle} />
        <Route path="/create-category" component={createCategory} />
        <Route path="/vehicles" component={Vehicles} />
        <Route path="/trip" component={TripCharges} />
        <Route path="/:id" component={Vehicle} />
        <Route path="/" component={Categories} exact />
      </Switch>
    </section>
  </Router>
  );
}

export default App;
