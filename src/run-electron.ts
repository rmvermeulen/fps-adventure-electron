import { app, BrowserWindow } from 'electron';

import { logger } from './logger';

const debug = logger('main');

const { NODE_ENV = 'development' } = process.env;
Object.assign(process.env, { NODE_ENV });

app.on('ready', async () => {
  const window: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
    fullscreen: true,
    useContentSize: true,
  });
  window.webContents.openDevTools();
  debug('opening dev tools');

  Object.assign(global, { window });
  debug('window created (global)');

  if (NODE_ENV === 'development') {
    window.loadURL('http://localhost:1234');
  } else {
    // load build bundle?
    throw new Error('CANNOT ENV SRS');
  }
});
