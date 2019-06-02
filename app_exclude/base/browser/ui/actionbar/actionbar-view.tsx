import * as React from 'react'
import { ActionBar } from 'base/browser/ui/actionbar/actionbar';

export class ActionBarView extends React.Component<{
  actionbar: ActionBar
}> {

  render() {
    const actionbar = this.props.actionbar;
    return (
      <div>
        {actionbar.items.map(item => item.render())}
      </div>
    )
  }

}