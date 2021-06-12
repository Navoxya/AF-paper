import React, { Component} from 'react';
import axios from 'axios';


const initialState = {
  code: '',
  model: '',
  type: '',
  name:'',
  cost: 0
}
class CreateVehicle extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = initialState;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    let vehicle = {
      code: this.state.code,
      model: this.state.model,
      type: this.state.type,
      name: this.state.name,
      cost: this.state.cost
    }
    console.log('DATA TO SEND', vehicle);
    axios.post('http://localhost:4000/vehicle/create', vehicle)
    .then(response => {
      alert('Data successfully inserted')
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Create Vehicle</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Vehicle Code</label>
            <input 
              type="text" 
              className="form-control" 
              id="code" 
              name="code" 
              value={this.state.code} 
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="model" className="form-label">Vehicle Model</label>
            <input 
              type="text" 
              className="form-control" 
              id="model" 
              name="model" 
              value={this.state.model} 
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Vehicle Type</label>
            <input 
              type="text" 
              className="form-control" 
              id="type" 
              name="type" 
              value={this.state.type} 
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Vehicle Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={this.state.name} 
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectAmount" className="form-label">Cost</label>
            <input 
              type="number" 
              className="form-control" 
              id="cost" 
              name="cost" 
              value={this.state.cost}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateVehicle;