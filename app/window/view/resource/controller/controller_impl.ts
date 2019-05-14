import { ResourceWidgetController } from "window/view/resource/controller/controller";
import { IDragAndDropData, StaticDND } from "base/view/dnd";
import { DesktopDragAndDropData } from "window/view/dnd/dnd";
import { ResourceWidgetModel } from "window/view/resource/model/model";

export class ResourceWidgetControllerImpl implements ResourceWidgetController {

  private model_: ResourceWidgetModel;
  currentDragData: IDragAndDropData;
  
  constructor(model: ResourceWidgetModel) {
    this.model_ = model;
    this.currentDragData = null;

    this.widgetViewDragOverHandler = this.widgetViewDragOverHandler.bind(this);
    this.widgetViewDropHandler = this.widgetViewDropHandler.bind(this);
  }

  widgetViewDragOverHandler(e: React.DragEvent): void {
    e.preventDefault();
    if (StaticDND.CurrentDragAndDropData) return;

    if (!this.currentDragData) {
      this.currentDragData = new DesktopDragAndDropData();
    }
  }

  widgetViewDropHandler(e: React.DragEvent): void {
    if (StaticDND.CurrentDragAndDropData) return;
    const dragData = this.currentDragData;
    if (!dragData || !e.dataTransfer) return;
    dragData.update(e.dataTransfer);
    console.log(dragData.getData());
    const resourceManager = this.model_.resourceManager;
    dragData.getData().files.forEach((file: File) => {
      console.log('Add resource', file.path);
      console.log(resourceManager)
      resourceManager.addResource(file.path);
    })
  }

}