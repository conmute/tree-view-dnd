const faker = require('faker');

export const getData = (n) => {

  const res = [{
    id: 'ROOT',
    createdBy: 'rkoss',
    created: 1553514507370,
    name: faker.name.firstName(),
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
      name: faker.name.firstName(),
      parentId,
      type,
      modifiedBy: 'rkoss',
      modified: 1553514507370
    });
  }

  return res.splice(1, res.length - 1);
};
