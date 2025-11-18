import { evaluateRules } from '@/services/rules/rulesEngine';

describe('Rules Engine', () => {
  it('должен скрывать vehicleLengthMeasure, если индикатор false', () => {
    const model = { containerParametersIndicator: false };
    const result = evaluateRules('vehicleLengthMeasure[0].value', model);
    expect(result.visible).toBe(false);
  });

  it('должен показывать и делать обязательным vehicleLengthMeasure, если индикатор true', () => {
    const model = { containerParametersIndicator: true };
    const result = evaluateRules('vehicleLengthMeasure[0].value', model);
    expect(result.visible).toBe(true);
    expect(result.required).toBe(true);
  });

  it('должен делать ownerName обязательным и видимым только для LADA', () => {
    const ladaModel = { vehicleBrand: 'LADA' };
    const bmwModel = { vehicleBrand: 'BMW' };

    const resLada = evaluateRules('ownerName', ladaModel);
    const resBmw = evaluateRules('ownerName', bmwModel);

    expect(resLada.visible).toBe(true);
    expect(resLada.required).toBe(true);

    expect(resBmw.visible).toBe(false);
  });

  it('должен блокировать maxSpeed для LADA', () => {
    const model = { vehicleBrand: 'LADA' };
    const result = evaluateRules('maxSpeed', model);
    expect(result.disabled).toBe(true);
  });
});