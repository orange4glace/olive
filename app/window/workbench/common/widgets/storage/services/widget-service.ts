import { createDecorator } from "platform/instantiation/common/instantiation";
import { IProjectsService } from "internal/project/projects-service";
import { MenuRegistry, MenuId } from "platform/actions/common/actions";

export const IStorageWidgetService = createDecorator<IStorageWidgetService>('olive.workbench.service.StorageWidgetService');

export interface IStorageWidgetService {

  _serviceBrand: any;

}