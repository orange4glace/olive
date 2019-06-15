export interface IOperation {

  execute(): void;
  undo(): void;
  redo(): void;

}