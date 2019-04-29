import * as _ from 'lodash';

export const nodeTypes = {
  FOLDER: 'FOLDER',
  PAGE: 'PAGE',
};

export const ROOT = 'ROOT';

export const inRange = (n, from, to) => n >= from && n <= to;

export const inArray = (arr, el) => arr.indexOf(el) !== -1;

export const getShiftedRange = (shift, lastOrder, nextOrder) => ({
  from: shift > 0 ? lastOrder + 1 : nextOrder,
  to: shift > 0 ? nextOrder : lastOrder,
});

const getPathToRoot = (nodeList, nodeId) => {

  if (!nodeId || !nodeList) return null;

  const folderIdList = nodeList
    .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.parentId }), {});

  const path = [];
  let targetId = nodeId;

  while (folderIdList[targetId] !== ROOT) {
    targetId = folderIdList[targetId];
    path.push(targetId);
  }

  return path;
};

const groupeData = data => _.groupBy(data, x => x.parentId);

const sortGroupes = group => group
  .map((x, i) => (_.isUndefined(x.order) ? { ...x, order: i } : x)) // temp
  .sort((a, b) => a.order - b.order);

const createList = (groupes, key = 'ROOT', res = []) => {

  groupes[key].forEach((x) => {

    res.push(x);

    if (groupes[x.id] && groupes[x.id].length) {
      createList(groupes, x.id, res);
    }

  });

  return res;
};

export const cookData = (nextData, expandedIds = []) => {

  const grouppedData = groupeData(nextData);
  const sortedGroupes = _.mapValues(grouppedData, sortGroupes);
  const data = createList(sortedGroupes);

  return data
    .map((x, order) => {

      const pathToRoot = getPathToRoot(nextData, x.id);
      const deep = pathToRoot.length;
      const expanded = inArray(expandedIds, x.id);
      const odd = (order + 1) % 2;
      const cookOrder = order;

      return {
        ...x, pathToRoot, deep, expanded, odd, cookOrder
      };
    })
    .filter(({ parentId, pathToRoot }) => {
      const isRoot = parentId === ROOT;
      const shouldBeExpanded = pathToRoot.every(p => inArray(expandedIds, p));
      return isRoot || shouldBeExpanded;
    });
};
