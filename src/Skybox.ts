import {
  CubeTexture,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from 'babylonjs';
import { injectable, interfaces } from 'inversify';

import { AssetMap } from './AssetMap';
import { GameScene } from './GameScene';
import { logger } from './logger';
import { ensure } from './util';

// @ts-ignore
const debug = logger('skybox');

export type SkyboxType = 'sky' | 'storm';

export type SkyboxFactory = ReturnType<typeof Skybox.factory>;

@injectable()
export class Skybox {
  public static factory({ container }: interfaces.Context) {
    return (name: SkyboxType, scene: GameScene) =>
      new Skybox(scene, container.get(AssetMap), name);
  }

  private mesh: Mesh;

  constructor(
    private scene: GameScene,
    private assets: AssetMap,
    private type: string,
  ) {
    debug('creating skybox', type);
    this.scene = scene;
    this.mesh = MeshBuilder.CreateBox('skybox' + type, { size: 1000.0 }, scene);
    this.createMaterial();
  }

  public getName() {
    return this.type;
  }
  public setMaterial(type: SkyboxType) {
    if (!this.scene || type === this.type) {
      return;
    }
    this.type = type;
    this.createMaterial();
  }
  private createMaterial() {
    const matName = `skybox-mat-${this.type}`;
    const mat = ensure(
      StandardMaterial,
      this.scene.getMaterialByName(matName) ||
        new StandardMaterial(matName, this.scene),
    );

    const texPath = this.assets.get(['skybox', this.type]);
    console.assert(texPath);
    mat.reflectionTexture = new CubeTexture(texPath!, this.scene);

    // only the inside matters for a skybox
    mat.sideOrientation = 0;
    mat.backFaceCulling = true;
    mat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    this.mesh.material = mat;
  }
}
