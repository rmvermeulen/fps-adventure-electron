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

    it.each(['nested.value', ['nested', 'value']])(
      'can use paths to get values',
      (prop) => {
        expect(config.get(prop)).toBeDefined();
        expect(config.get(prop)).toEqual((config as any).nested.value);
      },
    );

    it.each`
      badProp           | goodProp
      ${'foo.bar'}      | ${'nested.value'}
      ${['foo', 'bar']} | ${['nested', 'value']}
    `('has a sync callback api', ({ badProp, goodProp }) => {
      const cb = jest.fn();
      config.get(badProp, cb);
      expect(cb).not.toHaveBeenCalled();
      config.get(goodProp, cb);
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
