import * as _ from 'lodash';

import {
  ROOT,
  inArray,
  isFolder,
} from './helpers';

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

const isLastInFolder = (treeStructure, target) => {

  const afterTarget = treeStructure[target.treeOrder + 1];

  if (!target || target.parentId === ROOT) return false;
  if (!afterTarget) return true;

  return target.parentId !== afterTarget.parentId;
};

const getParentOptions = (treeStructure, treeOrder) => {

  let result = [];
  let target = treeStructure[treeOrder];

  if (!target) return [];

  while (target) {

    const targetIsLast = isLastInFolder(treeStructure, target);
    const isFirstTarget = treeOrder === target.treeOrder;
    const targetIsFolder = isFolder(target);
    const targetIsCollapsed = !target.expanded;
    const targetIsEmpty = target.empty;
    const canDropIntoFolder = targetIsFolder && (targetIsCollapsed || targetIsEmpty);

    if (canDropIntoFolder) {
      result = [
        ...result,
        {
          parentId: target.id,
          deep: target.deep + 1,
        },
        {
          parentId: target.parentId,
          deep: target.deep,
        }
      ];
    }

    if (targetIsFolder && !canDropIntoFolder && isFirstTarget) {
      result = [
        ...result,
        {
          parentId: target.id,
          deep: target.deep + 1,
        },
      ];
    }

    if (targetIsFolder && !canDropIntoFolder && !isFirstTarget) {
      result = [
        ...result,
        {
          parentId: target.parentId,
          deep: target.deep,
        },
      ];
    }

    if (!targetIsFolder) {
      result = [
        ...result,
        {
          parentId: target.parentId,
          deep: target.deep,
        },
      ];
    }

    if (!targetIsLast || !(canDropIntoFolder || !targetIsFolder)) {
      return result;
    }

    // eslint-disable-next-line no-loop-func
    target = treeStructure.find(x => x.id === target.parentId);
  }

  return result;
};

export const getPreparedData = (data) => {
  const grouppedData = groupeData(data);
  const sortedGroupes = _.mapValues(grouppedData, sortGroupes);
  return createList(sortedGroupes);
};

export const getTreeStructure = (data, expandedIds = []) => {

  const firstRun = data.map(x => ({ ...x, pathToRoot: getPathToRoot(data, x.id) }));
  const secondRun = firstRun.filter(({ parentId, pathToRoot }) => {

    const isRoot = parentId === ROOT;
    const shouldBeExpanded = pathToRoot.every(p => inArray(expandedIds, p));

    return isRoot || shouldBeExpanded;
  });

  const thirdRun = secondRun.map((x, treeOrder) => {

    const deep = x.pathToRoot.length;
    const expanded = inArray(expandedIds, x.id);
    const odd = (treeOrder + 1) % 2;
    const empty = !firstRun.some(y => y.parentId === x.id);

    return {
      ...x,
      treeOrder,
      deep,
      expanded,
      odd,
      empty,
    };
  });

  return thirdRun.map((x, treeOrder) => ({
    ...x,
    dropOptions: getParentOptions(thirdRun, treeOrder)
  }));
};
