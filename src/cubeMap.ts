import { allPass } from 'ramda';

import { LevelData } from './cubeLevel';

type Point = Record<'x' | 'y', number>;
type Size = Record<'width' | 'height', number>;

const inBounds = ({ width, height, ...pos }: Rect) => ({
  x,
  y,
}: Point): boolean => {
  x -= pos.x;
  y -= pos.y;
  return x >= 0 && x < width && y < height && y >= 0;
};

type Rect = Point & Size;
const rect = (data: Partial<Rect>): Rect => ({
  x: data.x || 0,
  y: data.y || 0,
  width: data.width || 0,
  height: data.height || 0,
});

/** _
 * |_|_ _ _     0
 * |_|_|_|_|    1 2 3 4
 * |_|          5
 * 0 top
 * 1 front
 * 2 right
 * 3 back
 * 4 left
 * 5 bottom
 */
export class CubeMap {
  /**
   * shapes used to check collision
   * efficiently with this cube's part of the map
   */
  private barShapes: {
    s015: Rect;
    s234: Rect;
  };

  private sides: {
    top: Rect;
    front: Rect;
    bottom: Rect;
    right: Rect;
    back: Rect;
    left: Rect;
  };

  private checkBarShapes: (pos: Point) => boolean;

  constructor(private data: LevelData) {
    const verticalBar = rect({
      width: 1,
      height: 3,
    });
    const horizontalBar = rect({
      x: 1,
      y: 1,
      width: 3,
      height: 1,
    });
    this.checkBarShapes = allPass([
      inBounds(horizontalBar),
      inBounds(verticalBar),
    ]);
    this.barShapes = {
      s015: verticalBar,
      s234: horizontalBar,
    };
    this.sides = {
      top: rect({}),
      front: rect({ y: 1 }),
      bottom: rect({ y: 2 }),
      right: rect({ x: 1, y: 1 }),
      back: rect({ x: 2, y: 1 }),
      left: rect({ x: 3, y: 1 }),
    };
  }

  // attempt a step starting at pos
  // pos must be contained in this map
  // result will be contained in this map
  public takeStep(pos: Point, step: Point): Point {
    if (!this.contains(pos)) {
      throw new Error('Start position outside of map');
    }
    const side = this.findSide(pos);
    if (!side) {
      throw new Error('WTF impossible');
    }
    // TODO: take step
    return pos;
  }
  public contains(point: Point): boolean {
    return this.checkBarShapes(point);
  }

  private findSide(pos: Point): [keyof CubeMap['sides'], Rect] | undefined {
    const entries = Object.entries(this.sides) as Array<
      [keyof CubeMap['sides'], Rect]
    >;
    return entries.find(([, bounds]) => inBounds(bounds)(pos));
  }
}
