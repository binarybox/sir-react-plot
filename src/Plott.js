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

  render(){
    s_line.y = this.props.s;
    i_line.y = this.props.i;
    r_line.y = this.props.r;
    d_line.y = this.props.d;
    const title = 'SIRD'
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
