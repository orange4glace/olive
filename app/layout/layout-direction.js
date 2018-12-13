const LayoutDirection = {
  VIEW: 0,
  HORIZONTAL: 1,
  VERTICAL: -1,
  isOrthogonal(dir1, dir2) {
    return dir1 * dir2 == -1;
  },
  getOrthogonalDirection(dir) {
    if (dir == LayoutDirection.HORIZONTAL) return LayoutDirection.VERTICAL;
    if (dir == LayoutDirection.VERTICAL) return LayoutDirection.HORIZONTAL;
  },
  fromString(str) {
    if (str == 'VIEW') return LayoutDirection.VIEW;
    if (str == 'HORIZONTAL') return LayoutDirection.HORIZONTAL;
    if (str == 'VERTICAL') return LayoutDirection.VERTICAL;
  },
  toString(layout) {
    if (layout == LayoutDirection.VIEW) return 'VIEW';
    if (layout == LayoutDirection.HORIZONTAL) return 'HORIZONTAL';
    if (layout == LayoutDirection.VERTICAL) return 'VERTICAL';
  }
}

const LayoutViewDirection = {
  CENTER: 0,
  TOP: -1,
  RIGHT: 1,
  BOTTOM: -2,
  LEFT: 2,
  isOrthogonalToLayoutDirection(viewDirection, layoutDirection) {
    return viewDirection * layoutDirection < 0;
  },
  isTopOrLeft(direction) {
    return direction == LayoutViewDirection.TOP || direction == LayoutViewDirection.LEFT;
  },
  toString(direction) {
    if (direction == LayoutViewDirection.CENTER) return 'center';
    if (direction == LayoutViewDirection.TOP) return 'top';
    if (direction == LayoutViewDirection.RIGHT) return 'right';
    if (direction == LayoutViewDirection.BOTTOM) return 'bottom';
    if (direction == LayoutViewDirection.LEFT) return 'left';
  }
}

export {
  LayoutDirection,
  LayoutViewDirection
};