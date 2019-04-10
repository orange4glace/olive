import { ResourceBase } from "internal/resource/resource";
import { Posted, PostableEventListener } from "worker-postable";

@Posted('Resource')
export class ResourceRenderer implements ResourceBase, PostableEventListener {
  
  id: number;
  path: string;

  __onPostableInstanceCreated() {
    console.log('__onPostableInstanceCreated')
  }

}