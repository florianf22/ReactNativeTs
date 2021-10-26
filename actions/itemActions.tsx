import React, { useCallback, useContext, useState } from 'react';
//
import { ItemContext } from '../context/items-context/ItemsContext';
import Item from '../types/Item';
import fireBaseApi from '../api/fireBase';

interface FetchedDataType {
  [key: string]: Item;
}

const itemActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch, items } = useContext(ItemContext);

  const setItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fireBaseApi.get('/products.json');
      setLoading(false);

      if (response.status !== 200) {
        throw Error('Something went wrong whilst fetching. Try again');
      }

      let dataToAdd: Item[] = [];
      for (const [key, value] of Object.entries(
        response.data as FetchedDataType
      )) {
        dataToAdd.push({
          id: key,
          name: value.name,
          price: +value.price,
          description: value.description,
          imageUrl: value.imageUrl,
        });
      }

      dispatch({
        type: 'set_items',
        payload: dataToAdd,
      });
    } catch (err) {
      setLoading(false);
      setError('Something went wrong whilst fetching. Try again');
    }
  }, [dispatch]);

  const addItem = async (item: Item, callback: () => void): Promise<void> => {
    try {
      setLoading(true);
      const res = await fireBaseApi.post('/products.json', item);
      setLoading(false);

      if (res.status !== 200) {
        return setError(
          'Something went wrong whilst trying to add the item. Please try again'
        );
      } else {
        callback();
      }
    } catch (err) {
      setLoading(false);
      setError(
        'Something went wrong whilst trying to add the item. Please try again'
      );
    }
  };

  // handleAsync function could be created with generic types
  const editItem = async (item: Item, callback: () => void): Promise<void> => {
    try {
      setLoading(true);
      const res = await fireBaseApi.patch(`/products/${item.id}.json`, item);
      setLoading(false);

      if (res.status !== 200) {
        return setError(
          'Something went wrong whilst trying to add the item. Please try again'
        );
      } else {
        callback();
      }
    } catch (err) {
      setError(
        'Something went wrong whilst trying to add the item. Please try again'
      );
    }
  };

  const deleteItem = async (
    id: string
    // callback: () => void
  ): Promise<void> => {
    try {
      setLoading(true);
      const res = await fireBaseApi.delete(`/products/${id}.json`);
      setLoading(false);

      if (res.status !== 200) {
        return setError(
          'Something went wrong whilst trying to delete the item. Please try again'
        );
      } else {
        // TODO: make the page refresh
      }
    } catch (err) {
      setError(
        'Something went wrong whilst trying to delete the item. Please try again'
      );
    }
  };

  return { addItem, setItems, error, loading, editItem, deleteItem };
};

export default itemActions;
