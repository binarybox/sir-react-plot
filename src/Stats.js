import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import Sliders from './Sliders.js';
import './Stats.scss'

const s_g = [1.0];
const i_g = [0.001];
const r_g = [0.0];
const d_g = [0.0];

export default class Stats extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: 1.0,
      people: 72900000000,
    }
  }

  s_dot(s, i , r){
    return -(this.props.beta * s * i);
  }

  i_dot(s, i, r){
    return this.props.beta * s * i - this.props.theta * i - this.props.mortal * i;
  }

  r_dot(s, i, r){
    return this.props.theta * i;
  }

  d_dot(s, i, r){
    return this.props.mortal * i;
  }

  setupData(){
    for(var j = 0; j < this.props.length; j++){
      s_g.push(s_g[j] + this.s_dot(s_g[j], i_g[j], r_g[j]));
      i_g.push(i_g[j] + this.i_dot(s_g[j], i_g[j], r_g[j]));
      r_g.push(r_g[j] + this.r_dot(s_g[j], i_g[j], r_g[j]));
      d_g.push(d_g[j] + this.d_dot(s_g[j], i_g[j], r_g[j]));
    }
  }

  render(){
    this.setupData();
    return (
      <div>
      <h2>Stats</h2>
      <input type="number" value={this.state.people} onChange={(e) => this.setState({people: e.target.value})}/>
        <div><Sliders value={this.state.time} name="time" onChange={(e) => this.setState({time: e})} /></div>
      <table>
        <thead>
        <tr>
          <td>
          Susceptible
          </td>
          <td>
          Infected
          </td>
          <td>
          Removed
          </td>
          <td>
          Died
          </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            {Math.round(s_g[Math.round(this.state.time * this.props.length)] * this.state.people)}
            </td>
            <td>
            {Math.round(i_g[Math.round(this.state.time * this.props.length)] * this.state.people)}
            </td>
            <td>
            {Math.round(r_g[Math.round(this.state.time * this.props.length)] * this.state.people)}
            </td>
            <td>
            {Math.round(d_g[Math.round(this.state.time * this.props.length)] * this.state.people)}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
