import {
  DirectionalLight,
  Engine,
  Material,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';

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

    const floor = MeshBuilder.CreateGround(
      'floor',
      {
        width: 10,
        height: 10,
      },
      this,
    );
    const mat = new StandardMaterial('blocks', this);
    mat.diffuseTexture = new Texture('assets/block.png', this);
    floor.material = mat;

    // tslint:disable-next-line: no-unused-expression
    new DirectionalLight('sun', Vector3.Down(), this);

    createGUI(this);
  }
}
