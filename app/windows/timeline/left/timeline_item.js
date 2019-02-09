import React from 'react';

import style from './timeline_item.scss';

@observer
class TimelineItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.timelineItem;
    return (
      <div className={`${style.component} timeline-item`}>
        {
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
        }
      </div>
    )
  }

}

export default TimelineItem;