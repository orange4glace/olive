import { Posted, posted } from "worker-postable";
import { SequenceRenderer } from "internal/renderer/base/project/sequence/sequence";
import { ProjectBase } from "internal/project/project";

@Posted('Project')
export class ProjectRenderer implements ProjectBase {

  @posted sequence: SequenceRenderer;

}