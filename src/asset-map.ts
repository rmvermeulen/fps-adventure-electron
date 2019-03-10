// import { IAssetMap } from './interfaces';

type IAssetMap = typeof assetMap;

export abstract class AssetMap implements IAssetMap {
  [key: string]: string | IAssetMap;
}

export const assetMap: AssetMap = {
  crate: 'assets/block.png',
  skybox: {
    sky: 'assets/skybox',
    storm: 'assets/stormydays',
  },
};
