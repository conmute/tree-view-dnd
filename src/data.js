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
    "id": "144f805e46094a488284b7cb07340d51",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Setup Complete",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1556006567824
  },
  {
    "id": "339db985af024a7db05d2ca2cb041176",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Verify Phone",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1556006567824
  },
  {
    "id": "ff750703c523473db6797083019f8fa4",
    "createdBy": "rkoss",
    "created": 1555581161085,
    "name": "Screen 2",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1555581161085
  },
  {
    "id": "30b9c4d0272c4722a29e80fffa3009ae",
    "createdBy": "rkoss",
    "created": 1555581205768,
    "name": "Screen 7",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1556203147928
  },
  {
    "id": "29ec257d0372414c9277bc21f34a996d",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Set up Phone",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1555498962345
  },
  {
    "id": "a0bb1664d4ed44688caf785d9243211b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "iPhone Search Locations",
    "parentId": "ROOT",
    "type": "PAGE",
    "modifiedBy": "rkoss",
    "modified": 1555592138919
  },
  {
    "id": "635c0ee7d4db44ec8441998734a1b899",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Logo",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1550747690852
  },
  {
    "id": "14a6aefa6d7248b29442300bcb1ac29d",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Main Menu",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1555412620446
  },
  {
    "id": "be8f8794e37845e7817aef433852abe1",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Find an Office",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "ea062a3b8d6b4c3d8cf9f44da3ee0494",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Share Icon",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "8e8617a89ede4e1ea1c5e333b9ace041",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Print Icon",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "b0dd01cc63af4373aabf0af82da9bff2",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Section Head",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "0d13908c20ba4ce38666dc2dc86f0bc6",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Label",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "99e4104adefc40b58580bc75ad87e573",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Heading 1",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "cac3eb45fc414a1e8ed25d67eca9eb39",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Link",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "d00d529b76b3470e95273329013ad3f7",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Paragraph",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "19d3f0fcbf334951bc2185c6dffc1b92",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Section",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "3669b163a7954682a1280dbcf022c6e2",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Small promo text",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "2aac22122d38498caffd07038dba0774",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Subtitle",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "103e59caf8a049b387bc6f57b1f6537b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Button - Primary",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548778787071
  },
  {
    "id": "0a91b23932bf450b8c86e73a0e5db7f2",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Button - Sedondary",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "14eae78e6c26425483c6fb9c823481f7",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Button - Read More",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "3ba99ac20ed74190aa1f253bd64cec36",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Location",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "05e139574ff540528345ea9d8a8bb6c9",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Box Collapsed",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548802187786
  },
  {
    "id": "444496724c55437cb4b9c21a858e4256",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Menu",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "972dc45df17846418b706fa6f8b02427",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Modal Form",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "e82a17000c644ae3b0db257f6ef9d085",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Popup Search",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "443263e1216d4564a7bb7ac70d051094",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Text Input",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "493e022491f44b03818f05aff223eba9",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Select / Dropdown",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "7332d433c7ad4b6780970c6626ad1a7c",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Select List",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "6fac7528261849eaba53eb5fc48d30e3",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Text Area",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "e70b2c6afa27434d8e038e2dbde86928",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Section Divider",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "e35a9acdd3434bd3a5d1d73485da794b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Box w/shadow",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1553684105156
  },
  {
    "id": "976bbdeab26941c59f25fc27c65acf82",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Video placeholder",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "9197e354435d486daf2c0d5856c694aa",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Talent Survey",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "87b6bccdeec343988d6af8b658717d2b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Location Search Results",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "419966bca2a140ee8e686f1e459a7eb6",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Footer",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548171041006
  },
  {
    "id": "a7ab7e702773460a8a585bbabba0ed2b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Hero Image 1",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "528de15ae21140cf8b9fddb10051c777",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Star for News Favorites",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "c516afbe332548b58d8e6ee1ac4f77e7",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "News Hero Image",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "0444a109b62e46aea9a2b94a4f93bee9",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Budget Hero Image",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548769224194
  },
  {
    "id": "7710322a87a64153a847f33f1d2711c4",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Search Hero Image",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "319ea2fd7f1c487fbb3a2cdf69ec9340",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Events Hero Image",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "3931b205b7e4458cb53f51ccb2041908",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Google Chart Master",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548688613333
  },
  {
    "id": "36b6fcd9ba554527879e34d7e4f78b91",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "FAQ Hero Image",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "3070d312c74e4d30925cd2740179ae3c",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Star rating",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "b578e2ca4eda4b278bdd4d35cd3aff42",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Top Menu",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "80ac89b307a34715a76ca223699e4aca",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "IPhone Search Drawer",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548787673002
  },
  {
    "id": "74770b333eda44a9b635bb8fe21f39d9",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Actor",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1554193538092
  },
  {
    "id": "20bfc096123d4e618576f49aa4e2c037",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Task",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "c9399bfde98e4b3888472e1024068a2b",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Success Condition",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677765
  },
  {
    "id": "8d73768c47944a0da98aadee55bf4a0a",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Error Condition",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "f8bb179c92984252b9dc781119a0a3d9",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "User Action",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "0039fa0d3eaf4f63855beec0a2c8f468",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Input Task",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1555412620446
  },
  {
    "id": "0ad3765006c243e5b5814a43999f076c",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Right Arrow",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "837a3fb73ac843f990d5845ae67ab769",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Right Branch",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1546965677759
  },
  {
    "id": "b3a7cc55f07844dfb901a2508d9977f2",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Down Arrow",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548778653470
  },
  {
    "id": "8062e8834dc44b22a8bc2b1e1c5a9511",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Up Arrow",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548779061350
  },
  {
    "id": "811b99776f3e4c0b817818af678380ee",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Horizontal Line",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rporczak",
    "modified": 1547574720707
  },
  {
    "id": "98adce8f9e0d4d0aa429d8ef01f525a2",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Back Arrow",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1553694699562
  },
  {
    "id": "f6370a3176b84cc5b5bea9ce440caac8",
    "createdBy": "rkoss",
    "created": 1546965677827,
    "name": "Drop Task",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1548169319918
  },
  {
    "id": "4e624e197d0d4edfa19a41f002ad42c0",
    "createdBy": "rkoss",
    "created": 1547459537586,
    "name": "No Parent",
    "parentId": "ROOT",
    "type": "NOTES",
    "modifiedBy": "rkoss",
    "modified": 1554804571943
  },
  {
    "id": "79d34f385b6a4533b9c513f44faa03d5",
    "createdBy": "roman",
    "created": 1552578213140,
    "name": "Widget 1",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1552578213140
  },
  {
    "id": "b4ac4c6a9b9a4dc585d4f8e034051aa3",
    "createdBy": "roman",
    "created": 1552578267610,
    "name": "Master 1",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1552578267610
  },
  {
    "id": "6affbd91f26a4e77ba4cf40e6eabaeaf",
    "createdBy": "rkoss",
    "created": 1552993717665,
    "name": "Master 2",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1552993717665
  },
  {
    "id": "97f597de57c3472794a6b9d8622b255e",
    "createdBy": "rkoss",
    "created": 1552993874669,
    "name": "Master 3",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1552993874669
  },
  {
    "id": "2ebe829b178647a0946d8e5023110712",
    "createdBy": "roman",
    "created": 1552993893193,
    "name": "Master 4",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1552993893193
  },
  {
    "id": "d694529e71b44c1692347f7272ca130a",
    "createdBy": "roman",
    "created": 1553011737490,
    "name": "Master 7",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553011737490
  },
  {
    "id": "5c1752ca99574484a6e5b88526c00382",
    "createdBy": "roman",
    "created": 1553011839241,
    "name": "Master 8",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553011839241
  },
  {
    "id": "0990a6b2257b401ea702a423cb2c8141",
    "createdBy": "rkoss",
    "created": 1553011165457,
    "name": "Master 5",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1553011165457
  },
  {
    "id": "c14bc746bebf478180187a3ce0e0748d",
    "createdBy": "roman",
    "created": 1553011569187,
    "name": "Master 6",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553011569187
  },
  {
    "id": "9a53787e600647e3bcf7cb82c1ba9095",
    "createdBy": "rkoss",
    "created": 1553011937957,
    "name": "Widget 2",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1553011937979
  },
  {
    "id": "10b66039dba64ffbab9955fd2af4fc78",
    "createdBy": "rkoss",
    "created": 1553011959589,
    "name": "Widget 3",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "rkoss",
    "modified": 1553011959589
  },
  {
    "id": "6e0aa39780eb4ee0844d682cd1474f2f",
    "createdBy": "roman",
    "created": 1553012018646,
    "name": "Widget 4",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553012018646
  },
  {
    "id": "5cccc57eec714314b19750ce9c4d05fc",
    "createdBy": "roman",
    "created": 1553097250491,
    "name": "Widget 5",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553097250491
  },
  {
    "id": "a65372d34dd5465da7ed2ad0a5e983aa",
    "createdBy": "roman",
    "created": 1553097311933,
    "name": "Widget 6",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553097311932
  },
  {
    "id": "5293f00edf5a4dae99bd16ee2620dc82",
    "createdBy": "roman",
    "created": 1553097432815,
    "name": "Widget 7",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553097432815
  },
  {
    "id": "7da6eb9636f14cc7afd1132c36c3350a",
    "createdBy": "roman",
    "created": 1553098073393,
    "name": "Widget 8",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553098073393
  },
  {
    "id": "62f9077f6dea4cdabc96aca1ebd0f7d0",
    "createdBy": "roman",
    "created": 1553262230194,
    "name": "Widget 9",
    "parentId": "ROOT",
    "type": "MASTER",
    "modifiedBy": "roman",
    "modified": 1553262230193
  },
  {
    "id": "7b11fd15b6244980b575c92d912a8675",
    "createdBy": "rkoss",
    "created": 1555686275151,
    "name": "New folder",
    "parentId": "ROOT",
    "type": "FOLDER",
    "modifiedBy": "rkoss",
    "modified": 1556115267847
  },
  {
    "id": "f378239a7dab49cab2a5a11cfcd80bfd",
    "createdBy": "rkoss",
    "created": 1555939545239,
    "name": "New folder 4",
    "parentId": "7b11fd15b6244980b575c92d912a8675",
    "type": "FOLDER",
    "modifiedBy": "rkoss",
    "modified": 1556114990369
  },
  {
    "id": "5dc3072982ac476584af67a59dfc5552",
    "createdBy": "rkoss",
    "created": 1555944436247,
    "name": "New folder 2",
    "parentId": "7b11fd15b6244980b575c92d912a8675",
    "type": "FOLDER",
    "modifiedBy": "rkoss",
    "modified": 1556005949748
  },
  {
    "id": "44ddd9c56d124aa59a415bba246de0ae",
    "createdBy": "rkoss",
    "created": 1556005949748,
    "name": "New folder 3",
    "parentId": "5dc3072982ac476584af67a59dfc5552",
    "type": "FOLDER",
    "modifiedBy": "rkoss",
    "modified": 1556005949748
  }
];
