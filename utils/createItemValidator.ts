import { StateType } from '../hooks/useFormReducer';
import { inputKeys } from '../components/ProductForm';

const isNotBlank = (value: string): boolean => {
  return value ? true : false;
};

const isMin = (value: string, length: number): boolean => {
  return value.length > length;
};

const isMax = (value: string, length: number): boolean => {
  return value.length < length;
};

const isValidNumber = (value: string): boolean => {
  return +value ? true : false;
};

export const allValuesExists = (
  value: string,
  state: StateType,
  title: inputKeys
): void => {
  if (!state.inputStatuses[title]) return;

  if (!isNotBlank(value)) {
    state.inputStatuses[title] = false;
    state.inputErrMessages[title] = `Value should't be blank.`;
  }
};

export const descAndUrlBoundaries = (
  value: string,
  state: StateType,
  title: inputKeys
): void => {
  if (title !== 'description' && title !== 'url') return;

  if (!isMin(value, 3) && isMax(value, 200)) {
    state.inputStatuses[title] = false;
    state.inputErrMessages[
      title
    ] = `${title.toUpperCase()} should be at least 3 characters long, but less than 100.`;
  }
};

export const checkPrice = (
  value: string,
  state: StateType,
  title: inputKeys
): void => {
  if (!state.inputStatuses[title]) return;
  if (title !== 'price') return;

  if (!isValidNumber(value)) {
    state.inputStatuses[title] = false;
    state.inputErrMessages[title] = `Please provide valid number`;
  }
};

export const checkOverallFormValidity = (state: StateType): void => {
  let overallFormValidity = false;
  // for (const valid in Object.values(state.inputStatuses)) {
  //   overallFormValidity = overallFormValidity && (valid as unknown as boolean);
  // }

  if (
    state.inputStatuses.description &&
    state.inputStatuses.price &&
    state.inputStatuses.title &&
    state.inputStatuses.url
  ) {
    overallFormValidity = true;
  }

  state.formValid = overallFormValidity;
};
