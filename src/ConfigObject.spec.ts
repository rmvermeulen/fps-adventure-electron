import { ConfigObject } from './ConfigObject';
describe('ConfigObject', () => {
  let createInstance: () => ConfigObject;
  it('is a base class', () => {
    class Thing extends ConfigObject {
      public nested = {
        value: 'this is a value',
      };
    }
    expect(Thing).toBeDefined();
    createInstance = () => new Thing();
  });

  describe('instance', () => {
    let config: ConfigObject;
    beforeAll(() => {
      config = createInstance();
    });

    it('can use paths to get values', () => {
      expect(config.get('nested.value')).toBeDefined();
      expect(config.get('nested.value')).toEqual((config as any).nested.value);
    });

    it('has a sync callback api', () => {
      const cb = jest.fn();
      config.get('foo.bar', cb);
      expect(cb).not.toHaveBeenCalled();
      config.get('nested.value', cb);
      expect(cb).toHaveBeenCalledWith('this is a value');
    });

    it('can skip asserting', () => {
      expect.assertions(2);
      expect(() => {
        config.get('foo', false);
      }).not.toThrow();
      expect(() => {
        config.get('foo');
      }).toThrow();
    });
  });
});
