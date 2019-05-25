import * as React from 'react'
import { ViewModel, ViewModelIdentifier } from 'window/view/view-model';

interface ViewType<Props> {
  new (): React.Component<Props>;
}

export enum ViewSelectorPriority {
  HIGH,
  NORMAL,
  LOW
}

type Rule<T> = (props: T) => boolean;

export class ViewSelectorRegistry<ViewProps> {

  private factoryHigh_: Map<Rule<ViewProps>, ViewType<ViewProps>>;
  private factoryNormal_: Map<Rule<ViewProps>, ViewType<ViewProps>>;
  private factoryLow_: Map<Rule<ViewProps>, ViewType<ViewProps>>;

  constructor() {
    this.factoryHigh_ = new Map();
    this.factoryNormal_ = new Map();
    this.factoryLow_ = new Map();
  }

  registerView(rule: (props: ViewProps)=>boolean, view: any, priority = ViewSelectorPriority.NORMAL) {
    let factory =
      priority == ViewSelectorPriority.HIGH ? this.factoryHigh_ :
      priority == ViewSelectorPriority.NORMAL ? this.factoryNormal_ : this.factoryLow_;
    factory.set(rule, view);
  }

  getView(props: ViewProps) {
    let result: ViewType<ViewProps> = null;
    this.factoryHigh_.forEach((view, rule) => {
      if (rule.call(rule, props)) result = view;
    })
    if (result) return result;
    this.factoryNormal_.forEach((view, rule) => {
      if (rule.call(rule, props)) result = view;
    })
    if (result) return result;
    this.factoryLow_.forEach((view, rule) => {
      if (rule.call(rule, props)) result = view;
    })
    return result;
  }

}

interface SelectorViewRendererProps<ViewProps> {
  selector: ViewSelectorRegistry<ViewProps>;
  props: ViewProps;
}

export class SelectorView<ViewProps>
    extends React.PureComponent<SelectorViewRendererProps<ViewProps>, {}> {

  render() {
    const selector = this.props.selector;
    return React.createElement(selector.getView(this.props.props), this.props.props);
  }

}