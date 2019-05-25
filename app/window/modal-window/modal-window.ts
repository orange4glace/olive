import { IDisposable } from "base/common/lifecycle";

export interface IModalWindow extends IDisposable {

  render(): React.ReactNode;

}