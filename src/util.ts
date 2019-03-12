import { assert } from 'chai';
import { inject, interfaces } from 'inversify';
import { is } from 'ramda';

export const ensure = <T>(type: interfaces.Newable<T>, value: any): T => {
  assert(is(type)(value));
  return value as T;
};

export const factoryId = <T>({ name }: interfaces.Newable<T>) =>
  `factory<${name}>`;

export const factory = <T>(_class: interfaces.Newable<T>) =>
  inject(factoryId(_class));
