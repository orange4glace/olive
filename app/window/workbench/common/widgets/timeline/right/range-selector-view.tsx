import * as React from 'react'
import { TimelineContentViewProps } from 'window/workbench/common/widgets/timeline/right/timeline-view';
import { observer } from 'window/app-mobx';

@observer
export class TimelineWidgetRangeSelectorView extends React.Component<TimelineContentViewProps> {

  render() {
    const rangeSelectorVM = this.props.widget.rangeSelector;
    if (!rangeSelectorVM.active) return null;
    const style = {
      top: rangeSelectorVM.top + 'px',
      left: rangeSelectorVM.left + 'px',
      width: rangeSelectorVM.width + 'px',
      height: rangeSelectorVM.height + 'px',
    }
    return (
      <div className='range-selector' style={style}>
      </div>
    )
  }

}