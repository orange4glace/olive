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
              direction: 'HORIZONTAL',
              children: [
                {
                  direction: 'VIEW',
                  views: ['Renderer']
                }, {
                  direction: 'VIEW',
                  views: ['Timeline']
                }
              ]
            }, {
              direction: 'HORIZONTAL',
              children: [
                {
                  direction: 'VIEW',
                  views: ['Empty']
                }, {
                  direction: 'VERTICAL',
                  children: [
                    {
                      direction: 'VIEW',
                      views: ['Empty']
                    }, {
                      direction: 'HORIZONTAL',
                      children: [
                        {
                          direction: 'VIEW',
                          views: ['Empty']
                        }, {
                          direction: 'VIEW',
                          views: ['Empty']
                        }
                      ]
                    }
                  ]
                }
              ]
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
      <Layout data={this.data} index={0}/>
    )
  }
 
}

export default LayoutRoot;