import { parseOpenApiToFormSchema } from '@/services/openapi/parseOpenApiToFormSchema';

describe('OpenAPI Parser', () => {
  const mockSchema = {
    components: {
      schemas: {
        TestDTO: {
          type: 'object',
          properties: {
            simpleString: { type: 'string' },
            simpleNumber: { type: 'number' },
            enumField: { 
              type: 'string', 
              enum: ['A', 'B'] 
            },
            vehicleBrand: { type: 'string' },
            objArray: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  innerVal: { type: 'number' }
                }
              }
            }
          },
          required: ['simpleString']
        }
      }
    }
  };

  it('должен корректно парсить простые поля и required', () => {
    const result = parseOpenApiToFormSchema(mockSchema, 'TestDTO');
    
    const stringField = result.find(f => f.key === 'simpleString');
    expect(stringField).toBeDefined();
    expect(stringField?.type).toBe('text');
    expect(stringField?.required).toBe(true);
    expect(stringField?.label).toContain('Simple String');

    const numberField = result.find(f => f.key === 'simpleNumber');
    expect(numberField?.type).toBe('number');
    expect(numberField?.required).toBe(false);
  });

  it('должен преобразовывать Enum в select', () => {
    const result = parseOpenApiToFormSchema(mockSchema, 'TestDTO');
    const enumField = result.find(f => f.key === 'enumField');
    
    expect(enumField?.type).toBe('select');
    expect(enumField?.items).toHaveLength(2);
    expect(enumField?.items?.[0].value).toBe('A');
  });

  it('должен обрабатывать специальные поля (vehicleBrand)', () => {
    const result = parseOpenApiToFormSchema(mockSchema, 'TestDTO');
    const brandField = result.find(f => f.key === 'vehicleBrand');
    
    expect(brandField?.type).toBe('select');
    expect(brandField?.source).toBe('NSI_046');
  });

  it('должен парсить массивы (FieldArray)', () => {
    const result = parseOpenApiToFormSchema(mockSchema, 'TestDTO');
    const arrayField = result.find(f => f.key === 'objArray');
    
    expect(arrayField?.type).toBe('array');
    expect(arrayField?.fields).toHaveLength(1);
    expect(arrayField?.fields?.[0].key).toBe('innerVal');
  });
});