import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import Sliders from './Sliders.js';
import './Stats.scss'

export default class Stats extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: 1.0,
      people: 72.900,
    }
  }

  render(){
    return (
      <div>
      <h2>Stats</h2>
      People in million <input type="number" value={this.state.people} onChange={(e) => this.setState({people: e.target.value})}/>
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
            {(this.props.s[Math.round(this.state.time * this.props.length)] * this.state.people).toFixed(2)}
            </td>
            <td>
            {(this.props.i[Math.round(this.state.time * this.props.length)] * this.state.people).toFixed(2)}
            </td>
            <td>
            {(this.props.r[Math.round(this.state.time * this.props.length)] * this.state.people).toFixed(2)}
            </td>
            <td>
            {(this.props.d[Math.round(this.state.time * this.props.length)] * this.state.people).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
