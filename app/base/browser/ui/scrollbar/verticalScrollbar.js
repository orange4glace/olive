/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { StandardWheelEvent } from 'base/browser/mouseEvent';
import { AbstractScrollbar } from 'base/browser/ui/scrollbar/abstractScrollbar';
import { ARROW_IMG_SIZE } from 'base/browser/ui/scrollbar/scrollbarArrow';
import { ScrollbarState } from 'base/browser/ui/scrollbar/scrollbarState';
import { ScrollbarVisibility } from 'base/common/scrollable';
export class VerticalScrollbar extends AbstractScrollbar {
    constructor(scrollable, options, host) {
        super({
            lazyRender: options.lazyRender,
            host: host,
            scrollbarState: new ScrollbarState((options.verticalHasArrows ? options.arrowSize : 0), (options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize), 
            // give priority to vertical scroll bar over horizontal and let it scroll all the way to the bottom
            0),
            visibility: options.vertical,
            extraScrollbarClassName: 'vertical',
            scrollable: scrollable
        });
        if (options.verticalHasArrows) {
            let arrowDelta = (options.arrowSize - ARROW_IMG_SIZE) / 2;
            let scrollbarDelta = (options.verticalScrollbarSize - ARROW_IMG_SIZE) / 2;
            this._createArrow({
                className: 'up-arrow',
                top: arrowDelta,
                left: scrollbarDelta,
                bottom: undefined,
                right: undefined,
                bgWidth: options.verticalScrollbarSize,
                bgHeight: options.arrowSize,
                onActivate: () => this._host.onMouseWheel(new StandardWheelEvent(null, 0, 1)),
            });
            this._createArrow({
                className: 'down-arrow',
                top: undefined,
                left: scrollbarDelta,
                bottom: arrowDelta,
                right: undefined,
                bgWidth: options.verticalScrollbarSize,
                bgHeight: options.arrowSize,
                onActivate: () => this._host.onMouseWheel(new StandardWheelEvent(null, 0, -1)),
            });
        }
        this._createSlider(0, Math.floor((options.verticalScrollbarSize - options.verticalSliderSize) / 2), options.verticalSliderSize, undefined);
    }
    _updateSlider(sliderSize, sliderPosition) {
        this.slider.setHeight(sliderSize);
        this.slider.setTop(sliderPosition);
    }
    _renderDomNode(largeSize, smallSize) {
        this.domNode.setWidth(smallSize);
        this.domNode.setHeight(largeSize);
        this.domNode.setRight(0);
        this.domNode.setTop(0);
    }
    onDidScroll(e) {
        this._shouldRender = this._onElementScrollSize(e.scrollHeight) || this._shouldRender;
        this._shouldRender = this._onElementScrollPosition(e.scrollTop) || this._shouldRender;
        this._shouldRender = this._onElementSize(e.height) || this._shouldRender;
        return this._shouldRender;
    }
    _mouseDownRelativePosition(offsetX, offsetY) {
        return offsetY;
    }
    _sliderMousePosition(e) {
        return e.posy;
    }
    _sliderOrthogonalMousePosition(e) {
        return e.posx;
    }
    writeScrollPosition(target, scrollPosition) {
        target.scrollTop = scrollPosition;
    }
}
//# sourceMappingURL=verticalScrollbar.js.map