export interface IHistoryCommand {

  execute(): void;
  undo(): void;
  redo(): void;

}