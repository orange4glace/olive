export enum LayoutDirection {
  VIEW = 0,
  HORIZONTAL = 1,
  VERTICAL = -1,
}

export class LayoutDirectionUtil {
  static isOrthogonal(dir1: LayoutDirection, dir2: LayoutDirection) {
    return dir1 * dir2 == -1;
  }

  static getOrthogonalDirection(dir: LayoutDirection) {
    if (dir == LayoutDirection.HORIZONTAL) return LayoutDirection.VERTICAL;
    if (dir == LayoutDirection.VERTICAL) return LayoutDirection.HORIZONTAL;
  }
  
  static fromString(str: string) {
    if (str == 'VIEW') return LayoutDirection.VIEW;
    if (str == 'HORIZONTAL') return LayoutDirection.HORIZONTAL;
    if (str == 'VERTICAL') return LayoutDirection.VERTICAL;
  }

  static toString(layout: LayoutDirection) {
    if (layout == LayoutDirection.VIEW) return 'VIEW';
    if (layout == LayoutDirection.HORIZONTAL) return 'HORIZONTAL';
    if (layout == LayoutDirection.VERTICAL) return 'VERTICAL';
  }
}

export enum LayoutViewDirection {
  CENTER = 0,
  TOP = -1,
  RIGHT = 1,
  BOTTOM = -2,
  LEFT = 2,
}

export class LayoutViewDirectionUtil {
  static isOrthogonalToLayoutDirection(viewDirection: LayoutViewDirection, layoutDirection: LayoutDirection) {
    return viewDirection * layoutDirection < 0;
  }

  static isTopOrLeft(direction: LayoutViewDirection) {
    return direction == LayoutViewDirection.TOP || direction == LayoutViewDirection.LEFT;
  }

  static toString(direction: LayoutViewDirection) {
    if (direction == LayoutViewDirection.CENTER) return 'center';
    if (direction == LayoutViewDirection.TOP) return 'top';
    if (direction == LayoutViewDirection.RIGHT) return 'right';
    if (direction == LayoutViewDirection.BOTTOM) return 'bottom';
    if (direction == LayoutViewDirection.LEFT) return 'left';
  }
}