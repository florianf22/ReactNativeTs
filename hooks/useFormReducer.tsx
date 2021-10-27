import React, { useCallback, useLayoutEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { keys } from 'ts-transformer-keys';
//
import {
  allValuesExists,
  descAndUrlBoundaries,
  checkOverallFormValidity,
  checkPrice,
} from '../utils';

function useFormReducer<T>(inputs: T) {
  type StateType = {
    inputValues: {
      [key in keyof T]?: string;
    };
    inputStatuses: {
      [key in keyof T]?: boolean;
    };
    inputErrMessages: {
      [key in keyof T]?: string;
    };
    formValid: boolean;
  };

  let initialState: StateType = {
    inputValues: {},
    inputStatuses: {},
    inputErrMessages: {},
    formValid: false,
  };

  type AdjustmentAction = {
    type: 'update_input';
    payload: { title: keyof T; value: string };
  };

  const populateValues = useCallback(() => {
    for (const [key, value] of Object.entries(inputs)) {
      initialState.inputValues[key as keyof T] = value;
      initialState.inputStatuses[key as keyof T] = inputs[key as keyof T]
        ? true
        : false;
      initialState.inputErrMessages[key as keyof T] = '';
      initialState.formValid = inputs[key as keyof T] ? true : false;
    }
  }, [inputs]);

  useLayoutEffect(() => {
    populateValues();
  }, [inputs]);

  const reducer = useCallback(
    (state: StateType, action: AdjustmentAction): StateType => {
      switch (action.type) {
        case 'update_input': {
          const { title, value } = action.payload;

          state.inputValues[title] = value;
          state.inputStatuses[title] = true;
          state.inputErrMessages[title] = '';
          state.formValid = true;

          // TODO: VALIDATION

          return state;
        }
        default:
          return state;
      }
    },
    [inputs]
  );

  // @ts-ignore
  const [state, dispatch] = useImmerReducer(reducer, {
    ...initialState,
    inputValues: inputs,
  });

  return { state, dispatch };
}

export default useFormReducer;
