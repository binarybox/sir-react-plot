import React, {Component} from 'react';
import './Header.scss'


export default class Header extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <header>
      <div id="logo">{this.props.name}</div>
      <nav id="menu" id="primary-nav">
      <div>
        <ul>
          {this.props.menu.map((value, index) => {
            return <li key={index}><a href={value.link}>{value.name}</a></li>
          })}
        </ul>
      </div>
      </nav>
      </header>
    )
  }
}
