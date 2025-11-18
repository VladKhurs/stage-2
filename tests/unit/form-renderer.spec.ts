import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import FormRenderer from '@/components/form/FormRenderer.vue';
import FieldText from '@/components/form/fields/FieldText.vue';

const localVue = createLocalVue();

describe('FormRenderer & Field Validation', () => {
  let vuetify: any;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('должен отрисовывать компоненты согласно схеме', () => {
    const schema = [
      { key: 'name', type: 'text', label: 'Name' },
      { key: 'age', type: 'number', label: 'Age' }
    ];
    
    const wrapper = mount(FormRenderer, {
      localVue,
      vuetify,
      propsData: {
        schema,
        value: { name: '', age: null }
      }
    });

    expect(wrapper.findComponent(FieldText).exists()).toBe(true);
    const numberFields = wrapper.findAllComponents({ name: 'FieldNumber' });
    expect(numberFields.length).toBe(1);
  });

  it('должен скрывать поле, если rulesEngine возвращает visible: false', () => {
    const schema = [{ key: 'secret', type: 'text', label: 'Secret' }];
    
    const rulesEngineMock = jest.fn().mockReturnValue({ visible: false });

    const wrapper = mount(FormRenderer, {
      localVue,
      vuetify,
      propsData: {
        schema,
        value: {},
        rulesEngine: rulesEngineMock
      }
    });

    expect(wrapper.findComponent(FieldText).exists()).toBe(false);
  });

  it('FieldText: должен возвращать ошибку валидации, если поле required и пустое', () => {
    const wrapper = mount(FieldText, {
      localVue,
      vuetify,
      propsData: {
        value: '',
        label: 'Test Field',
        required: true
      }
    });

    const rules = (wrapper.vm as any).rules;
    
    expect(rules.length).toBeGreaterThan(0);
    
    const validator = rules[0];
    
    expect(validator('')).toBe('Это поле обязательно');
    expect(validator('Any text')).toBe(true);
  });
});