import { assert } from 'chai';
import { path } from 'ramda';

export abstract class ConfigObject {
  /** @method get
   *
   * retrieve a value by a path or path[]
   * if found, calls callback or returns it
   */
  public get<T = any>(prop: string | string[]): T | undefined;
  public get<T = any>(prop: string | string[], force: true): T;
  public get<T = any>(
    prop: string | string[],
    cb: (value: T) => any,
  ): undefined;
  public get<T = any>(
    prop: string | string[],
    cbOrForce?: true | ((value: T) => any),
  ): T | undefined {
    const segments = typeof prop === 'string' ? prop.split('.') : prop;
    const value: T | undefined = path(segments, this);

    if (cbOrForce === true) {
      assert(value, `No value at path '${segments.join('.')}'`);
      return value;
    }
    return value && cbOrForce ? cbOrForce(value) : value;
  }
}
