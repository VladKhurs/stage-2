interface Rule {
  visibleIf?: (model: any) => boolean;
  requiredIf?: (model: any) => boolean;
  disabledIf?: (model: any) => boolean;
}

interface RulesMap {
  [key: string]: Rule;
}


export const rules: RulesMap = {
  "vehicleLengthMeasure[].value": {
    visibleIf: (model: any) => model.containerParametersIndicator === true,
    requiredIf: (model: any) => model.containerParametersIndicator === true,
  },
  "ownerName": {
    visibleIf: (model: any) => model.vehicleBrand === 'LADA',
    requiredIf: (model: any) => model.vehicleBrand === 'LADA',
  },
  "maxSpeed": {
    disabledIf: (model: any) => model.vehicleBrand === 'LADA',
  }
};