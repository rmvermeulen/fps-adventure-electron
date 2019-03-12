import {
  DirectionalLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';
import { injectable } from 'inversify';

import { AssetMap } from './AssetMap';
import { createGUI } from './createGUI';
import { GameEngine } from './GameEngine';
import { logger } from './logger';
import { Skybox, SkyboxFactory } from './Skybox';
import { factory } from './util';

const debug = logger('scene');

@injectable()
export class GameScene extends Scene {
  // @inject('combos') public combos!: Combos;

  public skybox!: Skybox;

  constructor(
    engine: GameEngine,
    private assets: AssetMap,
    @factory(Skybox)
    createSkybox: SkyboxFactory,
  ) {
    super(engine);
    this.skybox = createSkybox('sky', this);
    debug('skybox', this.skybox);

    const floor = MeshBuilder.CreateGround(
      'floor',
      {
        width: 10,
        height: 10,
      },
      this,
    );
    const mat = new StandardMaterial('blocks', this);
    mat.diffuseTexture = new Texture(this.assets.get<string>('crate'), this);
    floor.material = mat;

    // tslint:disable-next-line: no-unused-expression
    new DirectionalLight('sun', Vector3.Down(), this);

    createGUI(this);
  }
}
