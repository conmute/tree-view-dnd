import * as _ from 'lodash';

import { pipe } from '../../fp';

export const nodeTypes = {
  FOLDER: 'FOLDER',
  PAGE: 'PAGE',
};

export const ROOT = 'ROOT';

export const isFolder = node => node.type === nodeTypes.FOLDER;

export const isPage = node => node.type === nodeTypes.PAGE;

export const getOverStatus = (p, folder) => {
  if (!folder) return p - 0.5 > 0 ? 'bottom' : 'top';
  if (p - 0.3 < 0) return 'top';
  if (p - 0.3 > 0.3) return 'bottom';
  return 'middle';
};

export const createDragImage = (nodeElement, id, parrentSelector) => {

  const dragImage = nodeElement.cloneNode(true);
  dragImage.id = `dragged-${id}`;

  let parrentElement;

  if (parrentSelector) {
    parrentElement = document.querySelector(parrentSelector);
  } else {
    parrentElement = document.body;
  }

  if (!parrentElement) return null;

  parrentElement.append(dragImage);

  return dragImage;
};

export const removeDragImage = (id) => {
  const dragImage = document.getElementById(`dragged-${id}`);
  dragImage.parentNode.removeChild(dragImage);
};

export const getFirstChapterId = (data, tree) => {

  for (let i = 0, ln = tree.length; i < ln; i += 1) {

    const { id, children } = tree[i];

    if (children && children.length) {
      return getFirstChapterId(data, children);
    }

    const chapter = data.find(item => item.id === id);

    if (chapter && !isFolder(chapter)) {
      return chapter.id;
    }
  }

  return null;
};

const createTree = (groupes, key = 'ROOT') => {

  if (!groupes[key]) return [];

  return groupes[key].map(({ id, type }) => {

    const node = { id };

    if (type === nodeTypes.FOLDER) {
      node.children = createTree(groupes, id);
    }

    return node;
  });
};

const groupeData = data => _.groupBy(data, x => x.parentId);

const sortGroupe = group => group
  .map((x, i) => (_.isUndefined(x.order) ? { ...x, order: i } : x)) // temp
  .sort((a, b) => a.order - b.order);

const getPathToRoot = (nodeId, nodeList) => {

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

const setOrders = (data, groupes) => data
  .map(x => ({ ...x, order: groupes[x.parentId].find(y => y.id === x.id).order, }));

const expandFolders = (data, ids) => data
  .map(x => ({ ...x, expanded: ids.indexOf(x.id) !== -1 }));

const selectChapters = (data, ids) => data
  .map(x => ({ ...x, selected: ids.indexOf(x.id) !== -1 }));

const chooseChapter = (data, id) => data
  .map(x => ({ ...x, current: x.id === id }));

const editChapter = (data, id) => data
  .map(x => ({ ...x, editing: x.id === id }));

export const getPreparedData = (nextData, prevData, currentId) => {

  const grouppedData = groupeData(nextData);
  const sortedGroupes = _.mapValues(grouppedData, sortGroupe);
  const treeData = createTree(sortedGroupes);

  const prevExpandedIds = prevData
    .filter(x => x.expanded)
    .map(x => x.id);

  const prevSelectedIds = prevData
    .filter(x => x.selected)
    .map(x => x.id);

  const prevEditing = prevData.find(x => x.editing);
  const prevEditingId = prevEditing && prevEditing.id;

  const currentChapterId = currentId || getFirstChapterId(nextData, treeData);
  let expandIds = prevExpandedIds;

  if (!prevData.length) {
    const pathToRoot = getPathToRoot(currentChapterId, nextData);
    expandIds = [...expandIds, ...pathToRoot];
  }

  const preparedData = pipe(
    nd => setOrders(nd, sortedGroupes),
    nd => expandFolders(nd, expandIds),
    nd => selectChapters(nd, prevSelectedIds),
    nd => chooseChapter(nd, currentChapterId),
    nd => nd.map(x => ({ ...x, draggable: false, dragOver: null })),
    nd => editChapter(nd, prevEditingId),
  )(nextData);

  return { preparedData, treeData, currentChapterId };
};

export const findParentElement = (element, parnetSelector, boundSelector = 'body') => {

  const parent = element.parentElement;

  if (parent.matches(boundSelector) || parent.matches('body')) {
    return null;
  }

  if (element.matches(parnetSelector)) {
    return element;
  }

  if (parent.matches(parnetSelector)) {
    return parent;
  }

  return findParentElement(parent, parnetSelector, boundSelector);
};

const shiftOrders = (data, parentId, order, n) => ([
  ..._.filter(data, x => x.parentId !== parentId),
  ..._
    .filter(data, x => x.parentId === parentId)
    .map(x => (x.order >= order ? { ...x, order: x.order + n } : x)),
]);

const changePosition = (data, nodeId, parentId, order) => data
  .map(x => (x.id !== nodeId ? x : { ...x, parentId, order }));

export const reorder = (data, id, targetId) => {

  const node = data.find(x => x.id === id);
  const shiftedData = shiftOrders(data, node.parentId, node.order, -1);
  const target = shiftedData.find(x => x.id === targetId);

  let targetFolderId;
  let targetOrder;

  if (target.dragOver === 'middle') {
    targetFolderId = target.id;
    targetOrder = data.filter(x => x.parentId === targetFolderId).length;
  } else {
    targetFolderId = target.parentId;
    const fix = target.dragOver === 'bottom' ? 1 : 0;
    console.log('dragOver, fix: ', target.dragOver, fix);
    targetOrder = target.order + fix;
  }

  const shiftedData2 = shiftOrders(
    shiftedData,
    targetFolderId,
    targetOrder,
    1
  );

  const res = changePosition(shiftedData2, node.id, targetFolderId, targetOrder);

  console.log('target', node.order, target.order);
  console.log('shiftedData: ', shiftedData.map(x => ({ name: x.name, order: x.order })));
  console.log('shiftedData2: ', shiftedData2.map(x => ({ name: x.name, order: x.order })));
  console.log('res: ', res.map(x => ({ name: x.name, order: x.order })));

  return res;
};
