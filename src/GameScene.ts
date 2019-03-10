import { Engine, Scene } from 'babylonjs';

import { createGUI } from './createGUI';
import { Combos } from './KeyTracker';
import { Skybox } from './Skybox';

export interface MySceneOptions {
  engine: Engine;
  combos: Combos;
}

export class GameScene extends Scene {
  public combos: Combos;
  public skybox: Skybox;
  constructor({ engine, combos }: MySceneOptions) {
    super(engine);
    this.combos = combos;

    this.skybox = new Skybox(this, 'sky');

    createGUI(this);
  }
}
