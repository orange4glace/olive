import * as React from 'react'
import app from 'internal/app'

import Layout from 'window/layout/layout';
import LayoutDND from 'window/layout/global/layout-dnd';

import LayoutParser from 'window/layout/data';
import { TimelineWidgetImpl } from 'window/view/timeline/widget_impl';
import { ResourceWidgetImpl } from 'window/view/resource/widget-impl';
import { EffectControlWidgetImpl } from 'window/view/effect-control/widget_impl';
import { MonitorWidgetImpl } from 'window/view/monitor/widget';
import { getService } from 'window/service/services';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { WidgetRegistry } from 'window/view/widget-registry';
 
interface LayoutRootProps {
  data: any;
}

@app.mobx.observer
class LayoutRoot extends React.Component<LayoutRootProps, {}> {
  
  data: any;

  constructor(props: any) {
    super(props);
    this.data = LayoutParser({
      direction: 'VERTICAL',
      children: [
        {
          direction: 'HORIZONTAL',
          children: [
            {
              direction: 'VIEW',
              views: [WidgetRegistry.createWidget('TimelineWidget', {
                timeline: app.project.timelineManager.getTimeline(0)
              })]
            }, {
              direction: 'VIEW',
              views: [new ResourceWidgetImpl(app.resource)]
            }, {
              direction: 'VIEW',
              views: [new EffectControlWidgetImpl(
                getService(ITimelineWidgetService))]
            }
          ],
        }, {
          direction: 'VIEW',
          views: [new MonitorWidgetImpl(app.project.timelineManager)]
        }
      ]
    })
    // this.data = LayoutParser({
    //   direction: 'HORIZONTAL',
    //   children: [
    //     {
    //       direction: 'VERTICAL',
    //       children: [
    //         {
    //           direction: 'HORIZONTAL',
    //           children: [
    //             {
    //               direction: 'VIEW',
    //               views: ['Timeline']
    //             }, {
    //               direction: 'VIEW',
    //               views: ['Property']
    //             }
    //           ]
    //         }, {
    //           direction: 'HORIZONTAL',
    //           children: [
    //             {
    //               direction: 'VIEW',
    //               views: ['Empty']
    //             }, {
    //               direction: 'VERTICAL',
    //               children: [
    //                 {
    //                   direction: 'VIEW',
    //                   views: ['Renderer']
    //                 }, {
    //                   direction: 'HORIZONTAL',
    //                   children: [
    //                     {
    //                       direction: 'VIEW',
    //                       views: ['Empty']
    //                     }, {
    //                       direction: 'VIEW',
    //                       views: ['Empty']
    //                     }
    //                   ]
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }, {
    //       direction: 'VIEW',
    //       views: ['Resource']
    //     }
    //   ]
    // })
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