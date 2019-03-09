import { logger } from './logger';
import { setupEngine } from './setupEngine';

const debug = logger('index.ts');

declare global {
  interface Window {
    _game_loaded_?: boolean;
  }
}

if (window._game_loaded_) {
  window.location.reload();
}

window.onload = async () => {
  window._game_loaded_ = true;
  debug('window loaded');

  setupEngine();
};
