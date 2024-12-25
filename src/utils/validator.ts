export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export function validate(data: any, rules: ValidationRules): string[] {
  const errors: string[] = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    if (rule.required && !value) {
      errors.push(rule.message || `${field} is required`);
      continue;
    }

    if (value) {
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(
          rule.message || `${field} must be at least ${rule.minLength} characters`
        );
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(
          rule.message || `${field} must be no more than ${rule.maxLength} characters`
        );
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(rule.message || `${field} is invalid`);
      }
    }
  }

  return errors;
} 