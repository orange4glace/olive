import { IStorageWidgetStorageDirectoryView } from "window/workbench/common/widgets/storage/view/storage-directory-view";
import { IProject } from "internal/project/project";
import { IComponent } from "window/workbench/common/component";

export interface IStorageWidgetView extends IComponent {

  readonly project: IProject;
  /*@observable*/ readonly targetStorageDirectoryView: IStorageWidgetStorageDirectoryView;

}