import { ResourceBase, ResourceIdentifier } from "internal/resource/base/resource";
import { Posted } from "worker-postable";

@Posted('Resource')
export class ResourceRenderer implements ResourceBase {
  
  id: ResourceIdentifier;
  path: string;

}