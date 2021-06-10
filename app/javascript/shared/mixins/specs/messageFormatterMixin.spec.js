import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>bnk2 is an opensource tool. https://www.op2.com</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'bnk2 is an opensource tool. https://www.op2.com'
    );
  });
});
