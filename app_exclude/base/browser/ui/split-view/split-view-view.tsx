import * as React from 'react'
import { SplitView, ISplitView } from 'base/browser/ui/split-view/split-view';
import { Orientation } from 'base/browser/ui/sash/sash';
import { observer } from 'mobx-react';

@observer
export class SplitViewView extends React.Component<{splitView: ISplitView}> {

  render() {
    const splitView = this.props.splitView;

    const orientation = splitView.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal';
    return (
      <div className={`split-view ${orientation}`}>
        <div className='sash-container'>
        </div>
        <div className='split-view-container'>
          {splitView.viewItems.map(viewItem => (
            <div className='split-view-view' ref={viewItem.container}>
              {viewItem.view.render()}
            </div>
          ))}
        </div>
      </div>
    )
  }

}