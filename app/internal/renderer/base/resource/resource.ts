import { ResourceBase } from "internal/resource/resource";
import { Posted } from "worker-postable";

@Posted('Resource')
export class ResourceRenderer implements ResourceBase {
  
  id: number;
  path: string;

}