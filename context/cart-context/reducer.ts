import Item from '../../types/Item';

type AdjustmentActionAdd = {
  type: 'add_to_cart';
  payload: Item;
};

type AdjustmentActionRemove = {
  type: 'remove_from_cart';
  payload: number;
};

type AdjustmentActionQuantity = {
  type: 'increment' | 'decrement';
  payload: number;
};

type AdjustmentActionSort = {
  type: 'sort';
};

export type AdjustmentAction =
  | AdjustmentActionAdd
  | AdjustmentActionRemove
  | AdjustmentActionQuantity
  | AdjustmentActionSort;

export interface StateType {
  items: { item: Item; quantity: number }[];
  totalSum: number;
}

export const reducer = (
  state: StateType,
  action: AdjustmentAction
): StateType => {
  switch (action.type) {
    case 'add_to_cart': {
      state.items.push({ item: action.payload, quantity: 1 });
      state.totalSum += action.payload.price;

      return state;
    }
    case 'remove_from_cart': {
      const itemToRemove = state.items.find(
        it => it.item.id === action.payload
      );

      if (itemToRemove) {
        const id = state.items.indexOf(itemToRemove);
        state.totalSum -= itemToRemove.item.price * itemToRemove.quantity;
        state.items.splice(id, 1);
      }

      return state;
    }
    case 'increment': {
      const itemObj = state.items.find(it => it.item.id === action.payload);

      if (itemObj) {
        itemObj.quantity += 1;
        state.totalSum += itemObj.item.price;
      }

      return state;
    }
    case 'decrement': {
      const itemObj = state.items.find(it => it.item.id === action.payload);

      if (itemObj) {
        itemObj.quantity -= 1;
        state.totalSum -= itemObj.item.price;

        if (itemObj.quantity <= 0) {
          const id = state.items.indexOf(itemObj);
          state.items.splice(id, 1);
        }
      }

      return state;
    }
    case 'sort': {
      state.items = state.items.sort((a, b) => b.item.price - a.item.price);

      return state;
    }
    default:
      return state;
  }
};
