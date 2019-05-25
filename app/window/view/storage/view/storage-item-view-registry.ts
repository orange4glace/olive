import { WindowRegistry } from "window/registry";
import { ViewSelectorRegistry } from "window/base/common/view-selector-registry";
import { StorageWidgetStorageItemViewProps } from "window/view/storage/view/storage-item-view";

export type StorageWidgetStorageItemViewSelector = ViewSelectorRegistry<StorageWidgetStorageItemViewProps>;

export const Extensions = {
  StorageWidgetStorageItemViewSelector: 'olive.StorageWidgetStorageItemViewSelector'
}

WindowRegistry.add(Extensions.StorageWidgetStorageItemViewSelector, new ViewSelectorRegistry<StorageWidgetStorageItemViewProps>());