import {
  AdvancedDynamicTexture,
  Button,
  Control,
  StackPanel,
} from 'babylonjs-gui';
import { call, is, when } from 'ramda';

import { GameScene } from './GameScene';
import { logger } from './logger';

const debug = logger('gui');

const createButtonStackFactory = (texture: AdvancedDynamicTexture) => {
  const layout = new StackPanel('buttons');
  layout.width = '200px';
  texture.addControl(layout);
  let buttons = 0;
  const updateStackPos = () => {
    ++buttons;
    layout.top = buttons * 20 - texture.getSize().height / 2;
    layout.left = layout.widthInPixels / 2 - texture.getSize().width / 2;
  };
  return ({ text, click }: { text: string; click(): void }) => {
    const button = Button.CreateSimpleButton('but', text);
    button.width = '200px';
    button.height = '40px';
    button.color = 'white';
    button.background = 'green';
    button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

    layout.addControl(button);
    button.onPointerUpObservable.add(click);

    updateStackPos();
    return button;
  };
};

const transCall = (
  adt: AdvancedDynamicTexture,
  mapper: {
    [text: string]: () => void;
  },
) => {
  const addStackButton = createButtonStackFactory(adt);
  return Object.entries(mapper).map(([text, click]) =>
    addStackButton({ text, click }),
  );
};

export const createGUI = (scene: GameScene) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    'UI',
    true,
    scene,
  );
  // const addButton = ButtonStackFactory(advancedTexture);

  transCall(advancedTexture, {
    'Toggle camera controls'() {
      when(is(Function), call)(window.toggleCameraControl);
    },
    'Change skybox'() {
      debug('changing skybox');
      scene.skybox.setMaterial(scene.skybox.name === 'sky' ? 'storm' : 'sky');
    },
    Reload() {
      debug('reload');
      window.location.reload();
    },
  });
};
