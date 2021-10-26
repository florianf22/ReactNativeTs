export * from './createItemValidator';

export const currencyFormatter = (num: number): string => {
  // FIXME: this only works for 3 digit numbers
  const numArr = num.toString().split('');

  return [numArr[0], ',', ...numArr.slice(1)].join('');
};

export const capitalize = (str: string, lower = false): string =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match =>
    match.toUpperCase()
  );

export function handldeAsync<T, K>(fn: () => Promise<void>) {
  return (parOne: T, parTwo: K) => {
    try {
      fn();
    } catch (err) {}
  };
}

// return (req, res, next) => {
//   fn(req, res, next).catch(err => {
//     res.status(422).json({
//       status: 'error',
//       message: err.message,
//       err,
//     });
//   });
// };
