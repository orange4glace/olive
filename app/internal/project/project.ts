import { Sequence, SequenceBase } from "./sequence/sequence";
import { Postable, postable } from "worker-postable";

export interface IProject {
  readonly sequence: Sequence;
}

export interface ProjectBase {
  sequence: SequenceBase;
}

@Postable
export class Project implements IProject, ProjectBase {

  @postable sequence: Sequence;

  constructor() {
    this.sequence = new Sequence();
  }

}