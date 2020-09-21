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
        beta: 0.23,
        theta: 0.17,
        mortal: 0.03
    }
    this.handleBeta = this.handleBeta.bind(this)
  }

  handleBeta(e){
    this.setState({beta: e})
  }

  render(){
    const length = 400;
    return (
      <table className="modell">
        <tbody>
          <tr>
            <th>
            {/*<Header name="Test" menu={[{name: "first", link: "https//wasauchimmer.com"}, {name: "second", link:"https//wasauchsonst"}]}/>*/ }
            <Plott length={length} beta={this.state.beta} theta={this.state.theta} mortal={this.state.mortal}/>
            </th>
            <th>
            <Stats beta={this.state.beta} theta={this.state.theta} mortal={this.state.mortal} length={length}/>
            </th>
            <th>
              <ul id="sliders">
                <li>
                  <Sliders value={this.state.beta} name="beta" onChange={(e) => this.setState({beta: e})}/>
                </li>
                <li>
                  <Sliders value={this.state.theta} name="theta" onChange={(e) => this.setState({theta: e})}/>
                </li>
                <li>
                  <Sliders value={this.state.mortal} name="mortal"onChange={(e) => this.setState({mortal: e})}/>
                </li>
              </ul>
            </th>
          </tr>
        </tbody>
      </table>
    );

  }
}
