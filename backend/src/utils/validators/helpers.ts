export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

export const isNumber = (number: unknown): number is number => {
 return typeof number === 'number';
}

export const isArrayOfStrings = (array: unknown[], maxLength?: number): array is string[] => {
  if(array.every(i => (!isString(i) || (maxLength && (i.length > maxLength))))){
    return false
  } else {
    return true
  }
}