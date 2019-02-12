import * as React from 'react'
import app from 'internal/app'

import Layout from 'window/layout/layout';
import LayoutDND from 'window/layout/global/layout-dnd';

import LayoutParser from 'window/layout/data';
 
interface LayoutRootProps {
  data: any;
}

@app.mobx.observer
class LayoutRoot extends React.Component<LayoutRootProps, {}> {
  
  data: any;

  constructor(props: any) {
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
                  views: ['Empty']
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
      <div className={`layout-root ${LayoutDND.targetView && 'dnd-active'}`}>
        <Layout data={this.data} index={0}/>
      </div>        
    )
  }
 
}

export default LayoutRoot;