let express = require('express');
let router = express.Router();

function calculateSkip(page, size) {
  if (page <= 1) {
    return 0;
  } else {
    return ((page -1) * size);
  }
}

function calculatePageStart(page, size) {
  if (page <= 1) {
    return 1;
  } else {
    return ((page -1) * size) + 1;
  }
}

function buildPagedAssetListResponse(page, sort, assets) {
  return {
    page:page,
    sort:sort,
    assets:assets
  }
}

router.get('/', function(req, res, next) {
  let paginationCopy = JSON.parse(JSON.stringify(pagination));

  let page = paginationCopy.page;
  page.number = parseInt(isNaN(req.query.pageNumber) ? 1 : req.query.pageNumber);
  page.size = parseInt(isNaN(req.query.pageSize) ? 5 : req.query.pageSize);
  page.items = assetList.length;

  let sort = paginationCopy.sort;
  sort.direction = (req.query.sortDirection ? req.query.sortDirection : "asc");
  sort.attributes = (req.query.sortAttributes ? req.query.sortAttributes : ["name"]);

  let totalItems = assetList.length;
  let calculateSkip2 = calculateSkip(paginationCopy.page.number, paginationCopy.page.size);

  // res.send('Express REST API');
  res.setHeader('Content-Type', 'application/json');
  if (totalItems > calculateSkip2 ) {
    let end = calculateSkip2 + paginationCopy.page.size;
    let items;
    if (end >= totalItems) {
      items = assetList.slice(calculateSkip2);
    } else {
      items = assetList.slice(calculateSkip2, end);
    }

    let pagedAssetListResponse = buildPagedAssetListResponse(page, sort, items);
    res.send(JSON.stringify(pagedAssetListResponse));
  } else {
    let pagedAssetListResponse = buildPagedAssetListResponse(page, sort, []);
    res.send(JSON.stringify(pagedAssetListResponse));
  }
});

// var assetStates = {
//   page: {
//     number: 1,
//     size: 3,
//     items: 1
//   },
//   sort: {
//     direction: "asc",
//     attributes: ["name"]
//   },
//   assets: []
// };

var   pagination = {
  page: {
    number: 1,
    size: 3,
    items: 1
  },
  sort: {
    direction: "asc",
    attributes: [{
      name:"name"
    }]
  }
};

var assetList = [
  {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-1",
      description:"Pump-1"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-1",
      modelNumber:"9554b9f0-1",
      description:"Jonesco Model 1650 Pump-1",
      name:"Jonesco Model 1650 Pump-1",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-1",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-2",
      description:"Pump-2"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-2",
      modelNumber:"9554b9f0-2",
      description:"Jonesco Model 1650 Pump-2",
      name:"Jonesco Model 1650 Pump-2",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-2",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-3",
      description:"Pump-3"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-3",
      modelNumber:"9554b9f0-3",
      description:"Jonesco Model 1650 Pump-3",
      name:"Jonesco Model 1650 Pump-3",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-3",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-4",
      description:"Pump-4"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-4",
      modelNumber:"9554b9f0-4",
      description:"Jonesco Model 1650 Pump-4",
      name:"Jonesco Model 1650 Pump-4",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-4",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-5",
      description:"Pump-5"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-5",
      modelNumber:"9554b9f0-5",
      description:"Jonesco Model 1650 Pump-5",
      name:"Jonesco Model 1650 Pump-5",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-5",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-6",
      description:"Pump-6"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-6",
      modelNumber:"9554b9f0-6",
      description:"Jonesco Model 1650 Pump-6",
      name:"Jonesco Model 1650 Pump-6",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-6",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-7",
      description:"Pump-7"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-7",
      modelNumber:"9554b9f0-7",
      description:"Jonesco Model 1650 Pump-7",
      name:"Jonesco Model 1650 Pump-7",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-7",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-8",
      description:"Pump-8"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-8",
      modelNumber:"9554b9f0-8",
      description:"Jonesco Model 1650 Pump-8",
      name:"Jonesco Model 1650 Pump-8",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-8",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-9",
      description:"Pump-9"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-9",
      modelNumber:"9554b9f0-9",
      description:"Jonesco Model 1650 Pump-9",
      name:"Jonesco Model 1650 Pump-9",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-9",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-10",
      description:"Pump-10"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-10",
      modelNumber:"9554b9f0-10",
      description:"Jonesco Model 1650 Pump-10",
      name:"Jonesco Model 1650 Pump-10",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-10",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-11e7-abc4-cec278b6b50a",
      name:"Pump-11",
      description:"Pump-11"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-11e7-abc4-cec278b6b50a-11",
      modelNumber:"9554b9f0-11",
      description:"Jonesco Model 1650 Pump-11",
      name:"Jonesco Model 1650 Pump-11",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-11e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-11",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-12e7-abc4-cec278b6b50a",
      name:"Pump-12",
      description:"Pump-12"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-12e7-abc4-cec278b6b50a-12",
      modelNumber:"9554b9f0-12",
      description:"Jonesco Model 1650 Pump-12",
      name:"Jonesco Model 1650 Pump-12",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-12e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-12",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-13e7-abc4-cec278b6b50a",
      name:"Pump-13",
      description:"Pump-13"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-13e7-abc4-cec278b6b50a-13",
      modelNumber:"9554b9f0-13",
      description:"Jonesco Model 1650 Pump-13",
      name:"Jonesco Model 1650 Pump-13",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-13e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-13",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-14e7-abc4-cec278b6b50a",
      name:"Pump-14",
      description:"Pump-14"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-14e7-abc4-cec278b6b50a-14",
      modelNumber:"9554b9f0-14",
      description:"Jonesco Model 1650 Pump-14",
      name:"Jonesco Model 1650 Pump-14",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-14e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-14",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-15e7-abc4-cec278b6b50a",
      name:"Pump-15",
      description:"Pump-15"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-15e7-abc4-cec278b6b50a-15",
      modelNumber:"9554b9f0-15",
      description:"Jonesco Model 1650 Pump-15",
      name:"Jonesco Model 1650 Pump-15",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-15e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-15",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-16e7-abc4-cec278b6b50a",
      name:"Pump-16",
      description:"Pump-16"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-16e7-abc4-cec278b6b50a-16",
      modelNumber:"9554b9f0-16",
      description:"Jonesco Model 1650 Pump-16",
      name:"Jonesco Model 1650 Pump-16",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-16e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-16",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-17e7-abc4-cec278b6b50a",
      name:"Pump-17",
      description:"Pump-17"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-17e7-abc4-cec278b6b50a-17",
      modelNumber:"9554b9f0-17",
      description:"Jonesco Model 1650 Pump-17",
      name:"Jonesco Model 1650 Pump-17",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-17e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-17",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-18e7-abc4-cec278b6b50a",
      name:"Pump-18",
      description:"Pump-18"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-18e7-abc4-cec278b6b50a-18",
      modelNumber:"9554b9f0-18",
      description:"Jonesco Model 1650 Pump-18",
      name:"Jonesco Model 1650 Pump-18",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-18e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-18",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-19e7-abc4-cec278b6b50a",
      name:"Pump-19",
      description:"Pump-19"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-19e7-abc4-cec278b6b50a-19",
      modelNumber:"9554b9f0-19",
      description:"Jonesco Model 1650 Pump-19",
      name:"Jonesco Model 1650 Pump-19",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-19e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-19",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }, {
    assetTypeClass: {
      assetTypeClassId:"9554b784-b563-20e7-abc4-cec278b6b50a",
      name:"Pump-20",
      description:"Pump-20"
    },
    assetType: {
      assetTypeId:"9554b9f0-b563-20e7-abc4-cec278b6b50a-20",
      modelNumber:"9554b9f0-20",
      description:"Jonesco Model 1650 Pump-20",
      name:"Jonesco Model 1650 Pump-20",
      materialCode:"",
      unitOfMeasure:""
    },
    assetId:"9554baf4-b563-20e7-abc4-cec278b6b50a",
    serialNumber:"9554baf4-20",
    description:"",
    quantity:"1",
    unitOfMeasure:""
  }
];

module.exports = router;