import 'reflect-metadata';

import { GameScene } from './GameScene';
import { Skybox } from './Skybox';

describe('game scene', () => {
  let scene: GameScene;
  beforeAll(async () => {
    const { testContainer } = await import('./test-container');

    scene = testContainer.get(GameScene);
  });
  it('comes with a skybox', () => {
    expect(scene).toHaveProperty('skybox', Skybox);
  });
});
