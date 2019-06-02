import { INotificationService, INotificationHandle, NoOpNotification, Severity, IPromptChoice, IPromptOptions, INotification } from "platform/notification/common/notification";
import { registerSingleton } from "platform/instantiation/common/extensions";

export class SimpleNotificationService implements INotificationService {

	public _serviceBrand: any;

	private static readonly NO_OP: INotificationHandle = new NoOpNotification();

	public info(message: string): INotificationHandle {
		return this.notify({ severity: Severity.Info, message });
	}

	public warn(message: string): INotificationHandle {
		return this.notify({ severity: Severity.Warning, message });
	}

	public error(error: string | Error): INotificationHandle {
		return this.notify({ severity: Severity.Error, message: error });
	}

	public notify(notification: INotification): INotificationHandle {
		switch (notification.severity) {
			case Severity.Error:
				console.error(notification.message);
				break;
			case Severity.Warning:
				console.warn(notification.message);
				break;
			default:
				console.log(notification.message);
				break;
		}

		return SimpleNotificationService.NO_OP;
	}

	public prompt(severity: Severity, message: string, choices: IPromptChoice[], options?: IPromptOptions): INotificationHandle {
		return SimpleNotificationService.NO_OP;
	}
}

registerSingleton(INotificationService, SimpleNotificationService);