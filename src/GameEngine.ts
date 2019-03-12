import { Engine } from 'babylonjs';
import { inject, injectable } from 'inversify';

import { logger } from './logger';

const debug = logger('game-engine');

@injectable()
export class GameEngine extends Engine {
  constructor(@inject('canvas') canvas: HTMLCanvasElement) {
    debug('creating game engine', canvas);
    super(canvas, true, {});

    // Watch for browser/canvas resize events
    window.addEventListener('resize', () => {
      debug('resizing');
      this.resize();
    });
  }
}
