import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
  code: '',
  name: '',
  vehicles: [],
  options: [],
  selectedVehicles: []
}

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onVehicleSelect = this.onVehicleSelect.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get('http://localhost:4000/vehicle/')
    .then(response => {
      this.setState({ vehicles: response.data.data }, () => {
        let data = [];
        this.state.vehicles.map((item, index) => {
          let vehicle = {
            value: item._id,
            label: item.name
          }
          data.push(vehicle)
        });
        this.setState({ options: data });
      })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onVehicleSelect(e) {
    this.setState({ selectedVehicles: e ? e.map(item => item.value) : [] });
  }

  onSubmit(e) {
    e.preventDefault();
    let category = {
      code: this.state.code,
      name: this.state.name,
      vehicles: this.state.selectedVehicles
    };
    console.log('DATA TO SEND', category)
    axios.post('http://localhost:4000/category/create', category)
    .then(response => {
      alert('Category Data successfully inserted')
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Create Category</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Category Code</label>
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
            <label htmlFor="name" className="form-label">Category Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={this.state.name} 
              onChange={this.onChange}
            />
          </div>
          <Select 
            options={this.state.options}
            onChange={this.onVehicleSelect}
            className="basic-multi-select"
            isMulti
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateCourse;