import { MeshBuilder } from 'babylonjs';
import { Container, decorate, injectable, interfaces } from 'inversify';

import { AssetMap } from './AssetMap';
import { GameEngine } from './GameEngine';
import { GameScene } from './GameScene';
import { logger } from './logger';
import { Skybox } from './Skybox';
import { factoryId } from './util';

// tslint:disable max-classes-per-file

// @ts-ignore
const debug = logger('inversify-config');

const container = new Container({
  skipBaseClassChecks: true,
});

const addSingleton = <T>(newable: interfaces.Newable<T>) =>
  container
    .bind<T>(newable)
    .toSelf()
    .inSingletonScope();

addSingleton(AssetMap);
addSingleton(GameScene);
addSingleton(GameEngine);

decorate(injectable(), MeshBuilder);
container.bind(MeshBuilder).toConstantValue(MeshBuilder);

container.bind(factoryId(Skybox)).toFactory(Skybox.factory);

export { container };
