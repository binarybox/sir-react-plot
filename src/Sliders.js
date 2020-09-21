import React, {Component} from 'react';
import './Sliders.scss'

export default class Sliders extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      value: props.value,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onChange(e.target.value);
  }

  render(){
    return (
      <span>
        <label htmlFor="beta_slider">{this.props.name} Slider: {this.props.value}</label>
        <input type="range" min="0" max="1" step="0.01" onChange={(e) => this.props.onChange(e.target.value)} value={this.props.value} className="slider" id={this.props.name + "_slider"} />
      </span>
    )

  }

}
