import React from 'react'

import Layout from 'layout/layout';
import LayoutDND from 'layout/global/layout-dnd';

import LayoutParser from 'layout/data';
 
@observer
class LayoutRoot extends React.Component {
  
  constructor(props) {
    super(props);
    this.data = LayoutParser({
      direction: 'HORIZONTAL',
      children: [
        {
          direction: 'VIEW',
          views: ['Empty']
        },
        {
          direction: 'VIEW',
          views: ['Empty']
        }
      ]
    })
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
                  views: ['Timeline']
                }, {
                  direction: 'VIEW',
                  views: ['Renderer']
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
  }

  render() {
    return (
      <div className={`layout-root ${LayoutDND.targetWindow && 'dnd-active'}`}>
        <Layout data={this.data} index={0}/>
      </div>        
    )
  }
 
}

export default LayoutRoot;