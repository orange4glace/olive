import * as React from 'react'
import { assert } from 'base/common/assert';
import { ViewModel, ViewModelIdentifier } from 'window/view/view-model';

interface ViewType<PropType> {
  new (): React.Component<PropType, {}>;
}

export class ViewModelSelector<ViewPropType, ViewModelType extends ViewModel> {

  private factory_: Map<string | Symbol, ViewType<ViewPropType>>;

  constructor() {
    this.factory_ = new Map();
  }

  registerView(vm: ViewModelIdentifier<ViewModelType>, view: any) {
    this.factory_.set(vm.viewModelName, view);
  }

  getView(vm: ViewModel) {
    assert(this.factory_.has(vm.viewModelName), 'view not exists ' + vm.viewModelName);
    return this.factory_.get(vm.viewModelName);
  }

}

interface ViewModelSelectorRendererProps<ViewPropType, ViewModelType extends ViewModel> {
  selector: ViewModelSelector<ViewPropType, ViewModelType>;
  props: ViewPropType;
  viewModel: ViewModelType;
}

export class ViewModelSelectorView<ViewPropType, ViewModelType extends ViewModel>
    extends React.PureComponent<ViewModelSelectorRendererProps<ViewPropType, ViewModelType>, {}> {

  render() {
    const selector = this.props.selector;
    return React.createElement(selector.getView(this.props.viewModel), this.props.props);
  }

}