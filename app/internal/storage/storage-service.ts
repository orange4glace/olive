// import { createDecorator } from "platform/instantiation/common/instantiation";
// import { IStorageDirectory, StorageDirectory } from "internal/storage/storage-directory";
// import { IStorageItem } from "internal/storage/storage-item";

// export const IStorageService = createDecorator<IStorageService>('olive.StorageService');

// export interface IStorageService {

//   readonly root: IStorageDirectory;

//   getItem(path: string): IStorageItem;

// }

// export class StorageService implements IStorageService {

//   readonly root: IStorageDirectory;
  
//   constructor() {
//     this.root = new StorageDirectory('');
//   }
  
//   getItem(path: string): IStorageItem {
//     return this.root.navigate(path);
//   }

// }