import { Posted, posted } from "worker-postable";
import { ProjectBase } from "internal/project/project";
import { TimelineManagerRenderer } from "internal/renderer/base/timeline/timeline-manager";

@Posted('Project')
export class ProjectRenderer implements ProjectBase {

  @posted timelineManager: TimelineManagerRenderer;

}