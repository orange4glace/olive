const LayoutDirection = {
  VIEW: 0,
  HORIZONTAL: 1,
  VERTICAL: -1,
  isOrthogonal(dir1, dir2) {
    return dir1 * dir2 == -1;
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
  RIGHT: 2,
  BOTTOM: -3,
  LEFT: 4,
  isOrthogonalToLayoutDirection(viewDirection, layoutDirection) {
    return viewDirection * layoutDirection < 0;
  }
}

export {
  LayoutDirection,
  LayoutViewDirection
};