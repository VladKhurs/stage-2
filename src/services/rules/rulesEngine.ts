import { rules } from './rules-map';

interface RuleResult {
  visible: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function evaluateRules(fieldKey: string, model: any): RuleResult {
  const ruleKey = Object.keys(rules).find(key => {
    const regex = new RegExp('^' + key.replace('[]', '\\[\\d+\\]').replace(/\./g, '\\.') + '$');
    return regex.test(fieldKey);
  });

  const rule = ruleKey ? rules[ruleKey] : null;

  const result: RuleResult = {
    visible: true,
  };

  if (!rule) {
    return result;
  }

  if (rule.visibleIf) {
    result.visible = rule.visibleIf(model);
  }
  if (rule.requiredIf) {
    result.required = rule.requiredIf(model);
  }
  if (rule.disabledIf) {
    result.disabled = rule.disabledIf(model);
  }

  return result;
}