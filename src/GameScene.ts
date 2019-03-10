import {
  DirectionalLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';
import { injectable } from 'inversify';

import { AssetMap } from './asset-map';
import { createGUI } from './createGUI';
import { GameEngine } from './GameEngine';
import { Skybox } from './Skybox';

@injectable()
export class GameScene extends Scene {
  // @inject('combos') public combos!: Combos;
  public skybox: Skybox;

  constructor(engine: GameEngine, assetMap: AssetMap) {
    super(engine);

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
    mat.diffuseTexture = new Texture(assetMap.crate! as string, this);
    floor.material = mat;

    // tslint:disable-next-line: no-unused-expression
    new DirectionalLight('sun', Vector3.Down(), this);

    createGUI(this);
  }
}
