import * as React from 'react';
import app from 'internal/app';

import TimelineItem from 'internal/timeline/timeline_item';

const style = require('./timeline_item.scss');

interface TimelineItemProps {
  timelineItem: TimelineItem;
}

@app.mobx.observer
class TimelineItemView extends React.Component<TimelineItemProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const item = this.props.timelineItem;
    return (
      <div className={`${style.component} timeline-item`}>
        {
          /*
          item.objects.map(object => {
            console.log(object);
            return Object.entries(object.propertyGroups).map(groupEntry => {
              console.log(group);
              var group = groupEntry[0];
              var properties = groupEntry[1];
              console.log(groupEntry, group, properties);
              return (
                <div className='group' key={group}>
                {
                  properties.map(property => 
                    React.cloneElement(property.property.dom, {
                      key: property.property.name
                    })
                  )
                }
                </div>
              )
            });
          })
          */
        }
      </div>
    )
  }

}

export default TimelineItemView;