import React from 'react';
import { Link } from 'react-router';

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
	      <h2><Link to="/" >Instragm</Link></h2>
	      {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;