import Item from '../types/Item';

const Items: Item[] = [];

Items.push({
  id: '1',
  name: 'Iphone 13',
  price: 3500,
  description: "Apple's brand new Iphone!",
  imageUrl:
    'https://images.unsplash.com/photo-1634618776233-2e951832a5f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
});

Items.push({
  id: '2',
  name: 'Microsoft Surface Pro 7',
  price: 4000,
  description: "Microsoft's one of the best laptop",
  imageUrl:
    'https://images.unsplash.com/photo-1531421331102-e5124fed6bc0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1860&q=80',
});

Items.push({
  id: '3',
  name: 'Iphone 11',
  price: 2500,
  description: 'Classic Iphone',
  imageUrl:
    'https://images.unsplash.com/photo-1600541519467-937869997e34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
});

export default Items;
