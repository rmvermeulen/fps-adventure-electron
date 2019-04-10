import { Container, interfaces } from 'inversify';

import { AssetMap } from './AssetMap';
import { GameEngine } from './GameEngine';
import { GameScene } from './GameScene';
import { Skybox } from './Skybox';
import { factoryId } from './util';

const testContainer = new Container({
  skipBaseClassChecks: true,
});

const addSingleton = <T>(newable: interfaces.Newable<T>, value?: any) =>
  value
    ? testContainer.bind<T>(newable).toConstantValue(value)
    : testContainer
        .bind<T>(newable)
        .toSelf()
        .inSingletonScope();

addSingleton(AssetMap);
addSingleton(GameScene);
addSingleton(GameEngine, {});

testContainer.bind(factoryId(Skybox)).toFactory(Skybox.factory);

export { testContainer };
