import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
  categories: [],
  vehicles: [],
  optionsc:[],
  optionv:[],
  duration:'',
  selectedCategories: '',
  selectedVehicle: '',
  totPrice: 0
}

class TripCharges extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onVehicleSelect = this.onVehicleSelect.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get('http://localhost:4000/category/')
    .then(response => {
      this.setState({ categories: response.data.data }, () => {
        let data = [];
        this.state.categories.map((item, index) => {
          let category = {
            value: item._id,
            label: item.name
          }
          data.push(category)
        });
        this.setState({ optionsc: data });

      })
    })


  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCategorySelect(e) { 
      this.setState({selectedCategories: e.value});
      const category = e.value
      axios.get(`http://localhost:4000/category/${category}`)
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
          this.setState({ optionsv: data });
  
        })
      })
    }

    onVehicleSelect(e){
        this.setState({selectedVehicle: e.value});
    }
  onSubmit(e) {
    e.preventDefault();
    let calculation = {
      cid: this.state.selectedCategories,
      vid: this.state.selectedVehicle,
      duration: this.state.duration
    };
    console.log('DATA TO SEND', calculation)
    axios.post('http://localhost:4000/vehicle/calculate', calculation)
    .then(response => {
        console.log(response)
        this.setState({totPrice: response.data.price});
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message)
    })
  }

  render() {
      

    return (
      <div className="container">
        <h1>Calculate charges </h1>
        <form onSubmit={this.onSubmit}>
            
          <label htmlFor="name" className="form-label">Category Name</label>
          <Select 
            options={this.state.optionsc}
            onChange={this.onCategorySelect}
            className="basic-multi-select"

          />
          <label htmlFor="name" className="form-label">Vehicle Type</label>
          <Select 
            options={this.state.optionsv}
            onChange={this.onVehicleSelect}
            className="basic-multi-select"
            
          />
            <div className="mb-3">
            <label htmlFor="code" className="form-label">Duration</label>
            <input 
              type="Number" 
              className="form-control" 
              id="duration" 
              name="duration" 
              value={this.state.duration} 
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
          <div className="m-5">
                <h1>Total Price : {this.state.totPrice}.00</h1>
                </div>
        </form>
      </div>
    )
  }
}

export default TripCharges;