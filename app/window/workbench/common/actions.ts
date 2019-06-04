import { SyncActionDescriptor, ICommandAction, MenuRegistry } from "platform/actions/common/actions";
import { ContextKeyExpr } from "platform/contextkey/common/contextkey";
import { IDisposable, combinedDisposable } from "base/common/lifecycle";
import { Registry } from "platform/registry/common/platform";
import { CommandsRegistry, ICommandHandler } from "platform/commands/common/commands";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ILifecycleService, LifecyclePhase } from "platform/lifecycle/common/lifecycle";
import { KeybindingWeight, KeybindingsRegistry } from "platform/keybinding/common/keybindingsRegistry";

export const Extensions = {
  WorkbenchActions: 'olive.workbench.contributions.actions'
}

export interface IWorkbenchActionRegistry {
  
	/**
	 * Registers a workbench action to the platform. Workbench actions are not
	 * visible by default and can only be invoked through a keybinding if provided.
	 */
  registerWorkbenchAction(descriptor: SyncActionDescriptor, alias: string, category?: string, when?: ContextKeyExpr): IDisposable;
}

Registry.add(Extensions.WorkbenchActions, new class implements IWorkbenchActionRegistry {

  registerWorkbenchAction(descriptor: SyncActionDescriptor, alias: string, category?: string, when?: ContextKeyExpr): IDisposable {
    return this.registerWorkbenchCommandFromAction(descriptor, alias, category, when);
  }

  private registerWorkbenchCommandFromAction(descriptor: SyncActionDescriptor, alias: string, category?: string, when?: ContextKeyExpr) {
    let registrations: IDisposable[] = [];

    // command
    registrations.push(CommandsRegistry.registerCommand(descriptor.id, this.createCommandHandler(descriptor)));

    // keybinding
    const weight = (typeof descriptor.keybindingWeight === 'undefined' ? KeybindingWeight.WorkbenchContrib : descriptor.keybindingWeight);
    const keybindings = descriptor.keybindings;
    KeybindingsRegistry.registerKeybindingRule({
      id: descriptor.id,
      weight: weight,
      when: (descriptor.keybindingContext || when ? ContextKeyExpr.and(descriptor.keybindingContext, when) : null),
      primary: keybindings ? keybindings.primary : 0,
      secondary: keybindings && keybindings.secondary,
      win: keybindings && keybindings.win,
      mac: keybindings && keybindings.mac,
      linux: keybindings && keybindings.linux
    });

    // menu item
		// TODO(From VSCode)@Rob slightly weird if-check required because of
		// https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/contrib/search/electron-browser/search.contribution.ts#L266
    if (descriptor.label) {
      let idx = alias.indexOf(': ');
      let categoryOriginal = '';
      if (idx > 0) {
        categoryOriginal = alias.substr(0, idx);
        alias = alias.substr(idx + 2);
      }

      const command: ICommandAction = {
        id: descriptor.id,
        title: { value: descriptor.label, original: alias },
        category: category ? { value: category, original: categoryOriginal } : undefined
      };

      MenuRegistry.addCommand(command);

			// registrations.push(MenuRegistry.appendMenuItem(MenuId.CommandPalette, { command, when }));
    }

		// TODO@alex,joh
		// support removal of keybinding rule
		// support removal of command-ui
		return combinedDisposable(registrations);
  }

  private createCommandHandler(descriptor: SyncActionDescriptor): ICommandHandler {
    return (accessor, args) => {
      const instantiationService = accessor.get(IInstantiationService);
      const lifecycleService = accessor.get(ILifecycleService);

      Promise.resolve(this.triggerAndDisposeAction(instantiationService, lifecycleService, descriptor, args)).then(undefined, err => {
        // Todo: Use NotificationService
        console.error(err);
      })
    }
  }

  private triggerAndDisposeAction(
      instantiationService: IInstantiationService,
      lifecycleService: ILifecycleService,
      descriptor: SyncActionDescriptor, args: any): Promise<void> {
    // run action when workbench is created
    return lifecycleService.when(LifecyclePhase.Ready).then(() => {
      const actionInstance = instantiationService.createInstance(descriptor.syncDescriptor);
      try {
        actionInstance.label = descriptor.label || actionInstance.label;

        // don't run the action when not enabled
        if (!actionInstance.enabled) {
          actionInstance.dispose();

          return null;
        }

        const from = args && args.from || 'keybinding';

        return Promise.resolve(actionInstance.run(null, { from })).then(() => {
          actionInstance.dispose();
        }, err => {
          actionInstance.dispose();

          return Promise.reject(err);
        });
      } catch (err) {
        actionInstance.dispose();

        return Promise.reject(err);
      }
    })
  }

});