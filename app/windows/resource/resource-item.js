import React from 'react';

import style from './resource-item.scss';

@observer
class ResourceItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const resource = this.props.resource;
    return (
      <div className={style.component}>
        <div className='name'>{resource.path}</div>
      </div>
    )
  }

}

export default ResourceItem;