import { createDecorator } from "platform/instantiation/common/instantiation";
import { IProjectService } from "internal/project/project-service";
import { MenuRegistry, MenuId } from "platform/actions/common/actions";

export const IStorageWidgetService = createDecorator<IStorageWidgetService>('olive.workbench.service.StorageWidgetService');

export interface IStorageWidgetService {

  _serviceBrand: any;

}