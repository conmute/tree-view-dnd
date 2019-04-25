const faker = require('faker');

export const getData = (n) => {

  const res = [{
    id: 'ROOT',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: faker.name.jobTitle(),
    parentId: 'ROOT',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  }];

  for (let i = 0; i < n; i += 1) {

    const folderList = res.filter(x => x.type === 'FOLDER');
    let number = Math.round(Math.random() * folderList.length) - 1;
    number = number < 0 ? 0 : number;

    const parentId = folderList[number].id;
    const type = Math.round(Math.random()) === 0 ? 'FOLDER' : 'PAGE';

    res.push({
      id: faker.random.uuid(),
      createdBy: 'rkoss',
      created: 1553514507370,
      name: faker.name.jobTitle(),
      parentId,
      type,
      modifiedBy: 'rkoss',
      modified: 1553514507370
    });
  }

  return res.splice(1, res.length - 1);
};

export default [
  {
    id: 'superPuperDuperRootFolderId',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Root 1',
    parentId: 'ROOT',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
  {
    id: 'superPuperRootFolderId',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Root 1.1',
    parentId: 'superPuperDuperRootFolderId',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
  {
    id: 'superRootFolderId',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Root 1.1.1',
    parentId: 'superPuperRootFolderId',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
  {
    id: 'rootFolderId',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Root 1.1.1.1',
    parentId: 'superRootFolderId',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
  {
    id: '216ab32e53254c7f91b29a2c81e2bfe8',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Screen 3',
    parentId: 'superPuperRootFolderId2',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
  {
    id: '144f805e46094a488284b7cb07340d51',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'Setup Complete',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1554208819984
  },
  {
    id: 'f6b5c05f01084983a1097fb2f5cf6694',
    createdBy: 'roman',
    created: 1553262463353,
    name: 'Screen 1',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'roman',
    modified: 1553262463353
  },
  {
    id: '9f11edd55e1147109497234f367d1dd3',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'Set up 2FA',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1550747690852
  },
  {
    id: '29ec257d0372414c9277bc21f34a996d',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'Set up Phone',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1550747690852
  },
  {
    id: '63d7fc8dbfc042e993a34a1a34882203',
    createdBy: 'roman',
    created: 1553262540516,
    name: 'Screen 2',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'roman',
    modified: 1553262540516
  },
  {
    id: '60e9dcf0d58e4a2797fa7a04cb2b213b',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'Sign-in',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1552474068749
  },
  {
    id: '339db985af024a7db05d2ca2cb041176',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'Verify Phone',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1554208819984
  },
  {
    id: 'a0bb1664d4ed44688caf785d9243211b',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'iPhone Search Locations',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1548787673002
  },
  {
    id: 'dceb4c9d1c6f4e918df217ab8bc3e0a7',
    createdBy: 'rkoss',
    created: 1546965677827,
    name: 'iPhone Locations w Swipe',
    parentId: 'rootFolderId',
    type: 'PAGE',
    modifiedBy: 'rkoss',
    modified: 1548778798366
  },
  {
    id: 'a8b89432fe9c48cbb36a6d22c127cc2e',
    createdBy: 'rkoss',
    created: 1554372686528,
    name: 'Root 2',
    parentId: 'ROOT',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1554372686528
  },
  {
    id: 'superPuperRootFolderId2',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: 'Root 1.2',
    parentId: 'superPuperDuperRootFolderId',
    type: 'FOLDER',
    modifiedBy: 'rkoss',
    modified: 1553514507370
  },
];
