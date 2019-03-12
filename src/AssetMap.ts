import { injectable } from 'inversify';

import { ConfigObject } from './ConfigObject';

// import { IAssetMap } from './interfaces';

@injectable()
export class AssetMap extends ConfigObject {
  public crate = 'assets/block.png';
  public skybox = {
    sky: 'assets/skybox',
    storm: 'assets/stormydays',
  };
}
