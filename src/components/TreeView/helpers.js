import * as _ from 'lodash';

export const nodeTypes = {
  FOLDER: 'FOLDER',
  PAGE: 'PAGE',
};

export const ROOT = 'ROOT';

export const inRange = (n, from, to) => n >= from && n <= to;

export const inArray = (arr, el) => arr.indexOf(el) !== -1;

export const isFolder = node => node.type === nodeTypes.FOLDER;

export const cutNumber = (n, min = 0, max) => {
  const firstCut = n < min ? min : n;
  return firstCut > max ? max : firstCut;
};

export const getShiftedRange = (shift, lastOrder, nextOrder) => ({
  from: shift > 0 ? lastOrder + 1 : nextOrder,
  to: shift > 0 ? nextOrder : lastOrder,
});

const getClothestNumber = (arr, n) => {

  let clothest = arr[0];

  for (let i = 1, ln = arr.length; i < ln; i += 1) {
    if (Math.abs(n - arr[i]) < Math.abs(n - clothest)) {
      clothest = arr[i];
    }
  }

  return clothest;
};

export const getDeepValue = (dropOptions, nodeDeep, xShift) => {

  const deepValuesList = dropOptions
    .map(({ deep }) => deep)
    .sort((a, b) => a - b);

  const clothestDeepValue = getClothestNumber(deepValuesList, nodeDeep);

  const minDeepValue = deepValuesList[0];
  const maxDeepValue = deepValuesList[deepValuesList.length - 1];

  return cutNumber(clothestDeepValue + xShift, minDeepValue, maxDeepValue);
};
