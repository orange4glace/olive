import * as React from 'react'
import { SplitViewView } from 'base/browser/ui/split-view/split-view-view';
import { IBranchNode, ILeafNode } from 'base/browser/ui/grid/grid-view';

export class BranchNodeView extends React.Component<{node: IBranchNode}> {

  render() {
    return <SplitViewView splitView={this.props.node.splitview}/>
  }

}

export class LeafNodeView extends React.Component<ILeafNode> {

  render(): any {
    return null;
  }

}