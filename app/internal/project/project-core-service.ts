import { IStorageDirectory } from "internal/storage/storage-directory";
import { ITimeline } from "internal/timeline/timeline";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { IStorageFile } from "internal/storage/storage-file";

export const IProjectCoreService = createDecorator<IProjectCoreService>('olive.ProjectCoreService');

export interface IProjectCoreService {

  importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile>;
  createTimeline(directory: IStorageDirectory): ITimeline;

}