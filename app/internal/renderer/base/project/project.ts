import { Posted, posted } from "worker-postable";
import { ProjectBase } from "internal/project/project";

@Posted('Project')
export class ProjectRenderer implements ProjectBase {

}