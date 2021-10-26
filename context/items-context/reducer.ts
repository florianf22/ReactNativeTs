import Item from '../../types/Item';

type AdjustmentActionSet = {
  type: 'set_items';
  payload: Item[];
};

type AdjustmentActionCrud = {
  type: 'get_item';
  payload: string;
};

export type AdjustmentAction = AdjustmentActionSet | AdjustmentActionCrud;

export interface StateType {
  items: Item[];
  item: Item | undefined;
}

export const reducer = (
  state: StateType,
  action: AdjustmentAction
): StateType => {
  switch (action.type) {
    case 'set_items': {
      state.items = action.payload;
      return state;
    }
    case 'get_item': {
      const item = state.items.find(it => it.id === action.payload);
      state.item = item;
      return state;
    }
    default: {
      return state;
    }
  }
};
