import { Disposable } from "base/common/lifecycle";
import { MenuBar } from "base/browser/ui/menu/menubar";
import { IMenu, IMenuService, MenuId, SubmenuItemAction } from "platform/actions/common/actions";
import { localize } from "nls";
import { IContextKeyService } from "platform/contextkey/common/contextkey";
import { RunOnceScheduler } from "base/common/async";
import { IKeybindingService } from "platform/keybinding/common/keybinding";
import { Emitter, Event } from "base/common/event";
import { IAction } from "base/common/actions";
import { SubmenuAction } from "base/browser/ui/menu/menu";
import { mnemonicMenuLabel } from "base/common/labels";
import { Separator } from "base/browser/ui/actionbar/actionbar";
import { isMacintosh } from "base/common/platform";

export class MenubarControl extends Disposable {

  private topLevelMenus: {
		[title: string]: IMenu;
  }

	private topLevelTitles: {
    [title: string]: string
  } = {
		'File': localize({ key: 'mFile', comment: ['&& denotes a mnemonic'] }, "&&File"),
		'View': localize({ key: 'mView', comment: ['&& denotes a mnemonic'] }, "&&View"),
  }

  private menubar: MenuBar;
  private menuUpdater: RunOnceScheduler;
  private container: HTMLElement;
  private alwaysOnMnemonics: boolean;

  private readonly onVisibilityChange_: Emitter<boolean>;
  private readonly onFocusStateChange_: Emitter<boolean>;

	public get onVisibilityChange(): Event<boolean> {
		return this.onVisibilityChange_.event; }

	public get onFocusStateChange(): Event<boolean> {
		return this.onFocusStateChange_.event; }


  constructor(
    @IContextKeyService private readonly contextKeyService: IContextKeyService,
    @IMenuService private readonly menuService: IMenuService,
    @IKeybindingService private readonly keybindingService: IKeybindingService,
  ) {
    super();

    this.topLevelMenus = {
      'File': this._register(this.menuService.createMenu(MenuId.MenubarFileMenu, this.contextKeyService)),
      'View': this._register(this.menuService.createMenu(MenuId.MenubarViewMenu, this.contextKeyService))
    }

    this.container = document.createElement('div');
    this.menuUpdater = this._register(new RunOnceScheduler(() => this.doUpdateMenubar(false), 200));

    this.onVisibilityChange_ = this._register(new Emitter<boolean>());
    this.onFocusStateChange_ = this._register(new Emitter<boolean>());

    this.doUpdateMenubar(true);
  }

	private get currentEnableMenuBarMnemonics(): boolean {
		// let enableMenuBarMnemonics = this.configurationService.getValue<boolean>('window.enableMenuBarMnemonics');
    let enableMenuBarMnemonics = false;
		if (typeof enableMenuBarMnemonics !== 'boolean') {
			enableMenuBarMnemonics = true;
		}

		return enableMenuBarMnemonics;
	}

	private get currentMenubarVisibility(): string {
    return 'default';
		// return this.configurationService.getValue<MenuBarVisibility>('window.menuBarVisibility');
	}

  private registerListeners(): void {

  }

  private doUpdateMenubar(firstTime: boolean): void {
    this.setupCustomMenubar(firstTime);
  }

  private setupCustomMenubar(firstTime: boolean): void {
    if (firstTime) {
      this.menubar = this._register(new MenuBar(
        this.container, {
          enableMnemonics: this.currentEnableMenuBarMnemonics,
          visibility: 'default',
          getKeybinding: action => this.keybindingService.lookupKeybinding(action.id)
        }
      ));

			this.menubar.update({
        enableMnemonics: this.currentEnableMenuBarMnemonics,
        visibility: this.currentMenubarVisibility,
        getKeybinding: (action) => this.keybindingService.lookupKeybinding(action.id), alwaysOnMnemonics: this.alwaysOnMnemonics
      });

      this._register(this.menubar.onFocusStateChange(e => this.onFocusStateChange_.fire(e)));
      this._register(this.menubar.onVisibilityChange(e => this.onVisibilityChange_.fire(e)));

      this.menubar.style({})
			// this._register(attachMenuStyler(this.menubar, this.themeService));
    } else {
			this.menubar.update({
        enableMnemonics: this.currentEnableMenuBarMnemonics,
        visibility: this.currentMenubarVisibility,
        getKeybinding: (action) => this.keybindingService.lookupKeybinding(action.id), alwaysOnMnemonics: this.alwaysOnMnemonics
      });
    }

    const updateActions = (menu: IMenu, target: IAction[]) => {
      target.splice(0);
      let groups = menu.getActions();
      for (let group of groups) {
        const [, actions] = group;
      
        for (let action of actions) {
          this.insertActionsBefore(action, target);
          if (action instanceof SubmenuItemAction) {
            const submenu = this.menuService.createMenu(action.item.submenu, this.contextKeyService);
            const submenuActions: SubmenuAction[] = [];
            updateActions(submenu, submenuActions);
            target.push(new SubmenuAction(mnemonicMenuLabel(action.label), submenuActions));
            submenu.dispose();
          }
          else {
            action.label = mnemonicMenuLabel(this.calculateActionLabel(action));
            target.push(action)
          }
        }

        target.push(new Separator());
      }

      target.pop();
    }

    for (const title of Object.keys(this.topLevelMenus)) {
      const menu = this.topLevelMenus[title];
      if (firstTime && menu) {
        this._register(menu.onDidChange(() => {
          const actions: IAction[] = [];
          updateActions(menu, actions);
          this.menubar.updateMenu({
            actions: actions,
            label: mnemonicMenuLabel(this.topLevelTitles[title])
          });
        }))
      }

      const actions: IAction[] = [];
      if (menu) updateActions(menu, actions);

			if (!firstTime) {
				this.menubar.updateMenu({ actions: actions, label: mnemonicMenuLabel(this.topLevelTitles[title]) });
			} else {
				this.menubar.push({ actions: actions, label: mnemonicMenuLabel(this.topLevelTitles[title]) });
			}
    }
  }

  private insertActionsBefore(nextAction: IAction, target: IAction[]): void {
    return;
  }

  private calculateActionLabel(action: IAction) {
    return action.label;
  }

  public create(parent: HTMLElement): HTMLElement {
    this.container = parent;

		// Build the menubar
		if (this.container) {

			if (!isMacintosh) {
				this.doUpdateMenubar(true);
			}
		}

		return this.container;
	}

}