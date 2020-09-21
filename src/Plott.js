import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import './Plott.scss'

const s_line={
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  marker: {color: 'red'},
  name: "Susceptible"
}
const i_line={
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  marker: {color: 'blue'},
  name: "Infected"
}
const r_line={
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  marker: {color: 'green'},
  name: "Recovered"
}
const d_line={
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  marker: {color: 'black'},
  name: "deceased"
}

export default class Plott extends Component{
  constructor(props){
    super(props)
    const x = new Array(props.length);
    for(var i = 0; i < props.length; i++){
      x[i] = i;
    }
    s_line.x = x;
    i_line.x = x;
    r_line.x = x;
    d_line.x = x;

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
    const s = [1.0];
    const i = [0.001];
    const r = [0.0];
    const d = [0.0];

    for(var j = 0; j < this.props.length-1; j++){
      s.push(s[j] + this.s_dot(s[j], i[j], r[j]));
      i.push(i[j] + this.i_dot(s[j], i[j], r[j]));
      r.push(r[j] + this.r_dot(s[j], i[j], r[j]));
      d.push(d[j] + this.d_dot(s[j], i[j], r[j]));
    }
    s_line.y = s;
    i_line.y = i;
    r_line.y = r;
    d_line.y = d;
  }

  render(){
    this.setupData();

    const title = 'SIRD with r0: ' + this.props.beta / this.props.theta;
    return(
      <div id="line-plot">
      <Plot
        data={[
          s_line,
          i_line,
          r_line,
          d_line
        ]}
        layout={ {width: 620, height: 480, title: title} }
      />
      </div>
    )
  }
}
