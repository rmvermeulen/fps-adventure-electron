import { Container } from 'inversify';

import { assetMap, AssetMap } from './asset-map';
import { GameEngine } from './GameEngine';
import { GameScene } from './GameScene';

const container = new Container({
  skipBaseClassChecks: true,
});

container.bind(AssetMap).toConstantValue(assetMap);

const addSingleton = (newable: NewableFunction) =>
  container
    .bind(newable)
    .toSelf()
    .inSingletonScope();

addSingleton(GameScene);
addSingleton(GameEngine);

export { container };
