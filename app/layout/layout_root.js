import React from 'react'

import Layout from 'layout/layout';

import LayoutParser from 'layout/data';
 
class LayoutRoot extends React.Component {
  
  constructor(props) {
    super(props);
    this.data = LayoutParser({
      direction: 'HORIZONTAL',
      children: [
        {
          direction: 'VERTICAL',
          children: [
            {
              direction: 'VIEW',
              views: ['Timeline']
            }, {
              direction: 'VIEW',
              views: ['Timeline']
            }
          ]
        }, {
          direction: 'VIEW',
          views: ['Resource']
        }
      ]
    })
    console.log(this.data);
  }

  render() {
    return (
      <Layout direction={this.data.direction}
              children={this.data.children}
              views={this.data.views}/>
    )
  }
 
}

export default LayoutRoot;