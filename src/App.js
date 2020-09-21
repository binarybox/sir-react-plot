import React from 'react';
import logo from './logo.svg';
import Header from './Header.js';
import Plott from "./Plott.js";
import Sliders from './Sliders.js';
import Stats from './Stats.js'
import './App.scss';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      length: 400,
      beta: 0.23,
      theta: 0.17,
      mortal: 0.03
    }
  }

  s_dot(s, i , r){
    return -(this.state.beta * s * i);
  }

  i_dot(s, i, r){
    return this.state.beta * s * i - this.state.theta * i - this.state.mortal * i;
  }

  r_dot(s, i, r){
    return this.state.theta * i;
  }

  d_dot(s, i, r){
    return this.state.mortal * i;
  }

  setupData(){
    const s = [1.0]
    const i = [0.001]
    const r = [0.0]
    const d = [0.0]
    for(var j = 0; j < this.state.length; j++){
      s.push(s[j] + this.s_dot(s[j], i[j], r[j]));
      i.push(i[j] + this.i_dot(s[j], i[j], r[j]));
      r.push(r[j] + this.r_dot(s[j], i[j], r[j]));
      d.push(d[j] + this.d_dot(s[j], i[j], r[j]));
    }
    return {s: s, i: i, r: r, d: d}
  }

  render(){
    const {s, i, r, d} = this.setupData();
    const length = 400;
    return (
      <table className="modell">
        <tbody>
          <tr>
            <th>
            {/*<Header name="Test" menu={[{name: "first", link: "https//wasauchimmer.com"}, {name: "second", link:"https//wasauchsonst"}]}/>*/ }
            <Plott length={length} s={s} i={i} r={r} d={d}/>
            </th>
            <th>
            <Stats s={s} i={i} r={r} d={d} length={length}/>
            </th>
            <th>
              <ul id="sliders">
                <li>
                  <Sliders value={this.state.beta} name="beta" onChange={(e) => {this.setState({beta: e}); this.setupData()}}/>
                </li>
                <li>
                  <Sliders value={this.state.theta} name="theta" onChange={(e) => {this.setState({theta: e}); this.setupData()}}/>
                </li>
                <li>
                  <Sliders value={this.state.mortal} name="mortal"onChange={(e) => {this.setState({mortal: e}); this.setupData()}}/>
                </li>
              </ul>
            </th>
          </tr>
        </tbody>
      </table>
    );

  }
}
