// import { IKeybindings, KeybindingsRegistry } from "platform/keybinding/common/keybindingsRegistry";
// import { ContextKeyExpr } from "platform/contextkey/common/contextkey";
// import { ICommandHandlerDescription, CommandsRegistry } from "platform/commands/common/commands";
// import { MenuId, MenuRegistry } from "platform/actions/common/actions";
// import { ServicesAccessor } from "platform/instantiation/common/instantiation";

// export interface ICommandKeybindingsOptions extends IKeybindings {
//   kbExpr?: ContextKeyExpr | null;
//   weight: number;
// }
// export interface ICommandMenubarOptions {
//   menuId: MenuId;
//   group: string;
//   order: number;
//   when?: ContextKeyExpr;
//   title: string;
// }
// export interface ICommandOptions {
//   id: string;
//   precondition: ContextKeyExpr | null;
//   kbOpts?: ICommandKeybindingsOptions | null;
//   description?: ICommandHandlerDescription;
//   menubarOpts: ICommandMenubarOptions;
// }
// export abstract class Command {
//   public readonly id: string;
//   public readonly precondition: ContextKeyExpr | null;
//   private readonly _kbOpts: ICommandKeybindingsOptions | null | undefined;
//   private readonly _menubarOpts: ICommandMenubarOptions | null | undefined;
//   private readonly _description: ICommandHandlerDescription | null | undefined;

//   constructor(opts: ICommandOptions) {
//     this.id = opts.id;
//     this.precondition = opts.precondition;
//     this._kbOpts = opts.kbOpts;
//     this._menubarOpts = opts.menubarOpts;
//     this._description = opts.description;
//   }

//   public register(): void {
//     if (this._menubarOpts) {
//       MenuRegistry.appendMenuItem(this._menubarOpts.menuId, {
//         group: this._menubarOpts.group,
//         command: {
//           id: this.id,
//           title: this._menubarOpts.title
//         },
//         when: this._menubarOpts.when,
//         order: this._menubarOpts.order
//       })
//     }

//     if (this._kbOpts) {
//       let kbWhen = this._kbOpts.kbExpr;
//       if (this.precondition) {
//         if (kbWhen) kbWhen = ContextKeyExpr.and(kbWhen, this.precondition);
//         else kbWhen = this.precondition;
//       }

//       KeybindingsRegistry.registerCommandAndKeybindingRule({
//         id: this.id,
//         handler: (accessor: ServicesAccessor, args: any) => this.runCommand(accessor, args),
//         weight: this._kbOpts.weight,
//         when: kbWhen,
// 				primary: this._kbOpts.primary,
// 				secondary: this._kbOpts.secondary,
// 				win: this._kbOpts.win,
// 				linux: this._kbOpts.linux,
// 				mac: this._kbOpts.mac,
// 				description: this._description
//       })
//     }
//     else {
//       CommandsRegistry.registerCommand({
//         id: this.id,
//         handler: (accessor: ServicesAccessor, args: any) => this.runCommand(accessor, args),
//         description: this._description
//       })
//     }
//   }

// 	public abstract runCommand(accessor: ServicesAccessor, args: any): void | Promise<void>;
// }

// export interface IContributionCommandOptions<T> extends ICommandOptions {
//   handler: (controller: T, args: any) => void;
// }
// export interface EditorControllerCommand<T extends IEditorContribution