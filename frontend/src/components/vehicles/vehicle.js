import React, { Component } from 'react';
import axios from 'axios';

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/category/${this.props.match.params.id}`)
    .then(response => {
      this.setState({ vehicles: response.data.data })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Category Vehicles</h1>
        {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="p-3">
              <h4>Vehicle Name: {item.name}</h4>
              <h5>Vehicle code: {item.code}</h5>
              <h5>Vehicle type: {item.type}</h5>
              <h5>Vehicle cost: {item.cost}</h5>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Vehicle;