import { decorate, injectable, unmanaged } from 'inversify';

import { logger } from './logger';

const debug = logger('inheritable');

export const makeInheritable = (
  base: NewableFunction,
  debugName = base.name,
) => {
  debug('decorating %s (%s) %i', base.name, debugName, base.length);

  decorate(injectable(), base);
  // mark each constructor argument as @unmanaged
  for (let argN = 0; argN < base.length; ++argN) {
    decorate(unmanaged(), base, argN);
  }
};
