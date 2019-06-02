// import { Disposable } from "base/common/lifecycle";
// import { IWorkbenchLayoutService } from "window/workbench/services/layout/browser/layout-service";
// import { ServiceIdentifier } from "platform/instantiation/common/instantiation";
// import { Part } from "window/workbench/browser/part";
// import { Event, Emitter } from "base/common/event";
// import { IDimension } from "platform/layout/browser/layout-service";

// export abstract class Layout extends Disposable implements IWorkbenchLayoutService {

//   _serviceBrand: ServiceIdentifier<any>;

// 	private readonly _onLayout = this._register(new Emitter<IDimension>());
// 	get onLayout(): Event<IDimension> { return this._onLayout.event; }

// 	private _dimension: IDimension;
// 	get dimension(): IDimension { return this._dimension; }

// 	private _container: HTMLElement = document.createElement('div');
// 	get container(): HTMLElement { return this._container; }

//   private parts_: Map<string, Part> = new Map<string, Part>();

//   private disposed_: boolean;

//   constructor() {
//     super();
//   }

// }