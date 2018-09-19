import React from 'react';

import style from './index.scss';

@observer
class Resource extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
      </div>
    )
  }

}

export default Resource;