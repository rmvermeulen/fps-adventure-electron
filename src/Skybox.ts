import {
  CubeTexture,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
} from 'babylonjs';

import { assetMap } from './asset-map';
import { logger } from './logger';

// @ts-ignore
const debug = logger('skybox');

type SkyboxType = 'sky' | 'storm';

export class Skybox {
  private mesh: Mesh;
  private _name!: string;
  constructor(private scene: Scene, name: SkyboxType) {
    debug('creating skybox', name);
    this.mesh = MeshBuilder.CreateBox('skybox' + name, { size: 1000.0 }, scene);
    this.setMaterial(name);
  }
  public get name() {
    return this._name;
  }

  public setMaterial(name: SkyboxType) {
    if (name === this._name) {
      return;
    }
    this._name = name;
    const mat = new StandardMaterial('skybox' + name, this.scene);

    mat.reflectionTexture = new CubeTexture(
      assetMap[name]! as string,
      this.scene,
    );

    // only the inside matters for a skybox
    mat.sideOrientation = 0;
    mat.backFaceCulling = true;
    mat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    this.mesh.material = mat;
  }
}
