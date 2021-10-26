import React from 'react';
import { useImmerReducer } from 'use-immer';
//
import { inputKeys, inputNames } from '../components/ProductForm';
import {
  allValuesExists,
  descAndUrlBoundaries,
  checkOverallFormValidity,
  checkPrice,
} from '../utils';

type AdjustmentAction = {
  type: 'update_input';
  payload: { title: inputKeys; value: string };
};

export type StateType = {
  inputValues: inputNames;
  inputStatuses: {
    [key in inputKeys]: boolean;
  };
  inputErrMessages: {
    [key in inputKeys]: string;
  };
  formValid: boolean;
};

const reducer = (state: StateType, action: AdjustmentAction): StateType => {
  switch (action.type) {
    case 'update_input': {
      const { title, value } = action.payload;

      state.inputValues[title] = value;
      state.inputStatuses[title] = true;
      state.inputErrMessages[title] = '';

      // Validation
      descAndUrlBoundaries(value, state, title);
      checkPrice(value, state, title);
      allValuesExists(value, state, title);
      checkOverallFormValidity(state);

      return state;
    }
    default:
      return state;
  }
};

// STRONGLY CONNECTED TO PRODUCT FORM
const useFormReducer = (inputs: inputNames) => {
  const initialState: StateType = {
    inputValues: {
      title: '',
      price: '',
      description: '',
      url: '',
    },
    inputStatuses: {
      title: inputs.title ? true : false,
      price: inputs.title ? true : false,
      description: inputs.title ? true : false,
      url: inputs.title ? true : false,
    },
    inputErrMessages: {
      title: '',
      price: '',
      description: '',
      url: '',
    },
    // if one of the incoming value is defined, we are editing then so form is valid
    formValid: inputs.title ? true : false,
  };

  const [state, dispatch] = useImmerReducer(reducer, {
    ...initialState,
    inputValues: inputs,
  });

  return { state, dispatch };
};

export default useFormReducer;
