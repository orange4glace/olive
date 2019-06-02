import * as React from 'react'
import { ITitleService } from "window/workbench/services/title/title-service";
import { Event, Emitter } from "base/common/event";
import { isMacintosh } from 'base/common/platform';
import { MenubarControl } from 'window/workbench/browser/parts/titlebar/menubar-control';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Disposable } from 'base/common/lifecycle';

export class TitlebarPart {

	//#endregion

  menubarPart: MenubarControl;

  constructor(
    @IInstantiationService private readonly instantiationService: IInstantiationService
  ) {

    // this._register(this.menubarPart.onVisibilityChange(e => this.onMenubarVisibilityChange(e)));
    // this._register(this.menubarPart.onFocusStateChange(e => this.onMenubarFocusChange(e)));

  }

  renderMenubar(el: HTMLElement) {
    this.menubarPart = this.instantiationService.createInstance(MenubarControl);
    this.menubarPart.create(el);
  }

}

export class TitlebarPartView extends React.Component<{titlebarPart: TitlebarPart}> {

  menubarRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const titlebarPart = this.props.titlebarPart;
    titlebarPart.renderMenubar(this.menubarRef.current);
  }

  render() {
    return (
      <div className='titlebar'>
        <div className='titlebar-drag-region'/>
        <div className='window-appicon'/>
        <div className='menubar' ref={this.menubarRef}>
        </div>
      </div>
    )
  }

}