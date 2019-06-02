import { Event } from "base/common/event";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const ITitleService = createDecorator<ITitleService>('titleService');

export interface ITitleProperties {
	isPure?: boolean;
	isAdmin?: boolean;
}

export interface ITitleService {
  _serviceBrand: any;

  readonly onMenubarVisibilityChanged: Event<boolean>;

  updateProperties(properties: ITitleProperties): void;
}