import CANNON from 'cannon';
import Combokeys from 'combokeys';

import { GameEngine } from './GameEngine';
import { GameScene } from './GameScene';
import { container } from './inversify.config';
import { Combos } from './KeyTracker';
import { logger } from './logger';
import { setupCamera } from './setupCamera';

const debug = logger('engine');

window.CANNON = CANNON;

const getRenderCanvas = (): HTMLCanvasElement => {
  const maybeCanvas = document.getElementById('renderCanvas');
  if (maybeCanvas instanceof HTMLCanvasElement) {
    return maybeCanvas;
  }
  const canvas = new HTMLCanvasElement();
  canvas.id = 'renderCanvas';
  document.body.append(canvas);
  return canvas;
};

export const setupEngine = () => {
  debug('setup');

  container.bind('canvas').toConstantValue(getRenderCanvas());

  const canvas = container.get<HTMLCanvasElement>('canvas');
  debug(canvas);

  container.bind('combos').toConstantValue(new Combokeys(canvas));

  const keys = container.get<Combos>('combos');
  debug(keys);

  const engine = container.get(GameEngine);
  debug(engine);

  const scene = container.get(GameScene);
  debug(scene);

  // const gravity = new Vector3(0, -9.81, 0);
  // const physicsPlugin = new CannonJSPlugin();

  // scene.enablePhysics(gravity, physicsPlugin as any);

  setupCamera(scene, canvas);

  // const engine = container.get(GameEngine);

  engine.runRenderLoop(() => {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener('resize', () => {
    debug('resizing');
    engine.resize();
  });

  return { canvas };
};
