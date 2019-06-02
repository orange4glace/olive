// import { IStorageDirectory } from "internal/storage/storage-directory";
// import { IProject } from "internal/project/project";
// import { IStorageFile } from "internal/storage/storage-file";
// import { MediaResourceStorageFile, AudioResourceStorageFile } from "internal/resource/resource-storage-file";
// import { IHistoryCommand } from "internal/history/command";

// export class ImportResourceCommand implements IHistoryCommand {

//   constructor(
//     private readonly project: IProject,
//     private readonly path: string,
//     private readonly directory: IStorageDirectory) {

//   }

//   async executresourcese(): Promise<void> {
//     const  = await this.project.resourceService.createResource(this.path);
//     console.log(this.path, this.directory, resources);

//     let storageFile: IStorageFile = null;
//     if (resources.video && resources.audio) {
//       const storageFile = new MediaResourceStorageFile(this.path, resources.video, resources.audio);
//       this.directory.addItem(storageFile);
//     }
//     else if (resources.audio) {
//       const storageFile = new AudioResourceStorageFile(this.path, resources.audio);
//       this.directory.addItem(storageFile);
//     }
//   }

//   undo() {
    
//   }

//   redo() {
//     this.execute();
//   }

// }