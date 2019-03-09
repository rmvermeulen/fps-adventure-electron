import debug from 'debug';

const appName = 'app';

export const logger = (namespace: string) => debug(`${appName}:${namespace}`);
