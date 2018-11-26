import React from 'react';

@observer
class EmptyWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div/>
    )
  }

}

export default EmptyWindow;