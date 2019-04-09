import { ResourceBase } from "internal/resource/resource";
import { Posted, PostableEventListener } from "worker-postable";
import { renderer } from "../renderer";

@Posted('Resource')
export class ResourceRenderer implements ResourceBase, PostableEventListener {
  
  id: number;
  path: string;

  __onPostableInstanceCreated() {
    console.log('__onPostableInstanceCreated')
  }

}