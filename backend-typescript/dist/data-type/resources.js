let express = require('express');
let router = express.Router();
let assetTypeClassesOrchestrator = require('./orchestrator');
let orchestrator = new assetTypeClassesOrchestrator();
router.get("/", function (req, res, next) {
    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");
    orchestrator
        .getAssetTypeClasses(number, size, field, direction)
        .subscribe(assetTypeClasses => {
        res.send(JSON.stringify(assetTypeClasses));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.get("/attributes", function (req, res, next) {
    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];
    orchestrator
        .getAvailableAttributes(number, size, field, direction, assignedArray)
        .subscribe(attributes => {
        res.send(JSON.stringify(attributes));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.get("/assigned-attributes", function (req, res, next) {
    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];
    orchestrator
        .getAssignedAttributes(number, size, field, direction, assignedArray)
        .subscribe(attributes => {
        res.send(JSON.stringify(attributes));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.get("/data-types", function (req, res, ndex) {
    orchestrator
        .getDataTypes()
        .subscribe(dataTypes => {
        res.send(JSON.stringify(dataTypes));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.get("/attributes/:attributeId", function (req, res, ndex) {
    let attributeId = req.params.attributeId;
    orchestrator
        .getAvailableAttribute(attributeId)
        .subscribe(attribute => {
        let body = JSON.stringify(attribute);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
});
router.get("/:assetTypeClassId", function (req, res, ndex) {
    let assetTypeClassId = req.params.assetTypeClassId;
    orchestrator
        .getAssetTypeClass(assetTypeClassId)
        .subscribe(assetTypeClass => {
        let body = JSON.stringify(assetTypeClass);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
});
router.post("/", function (req, res, ndex) {
    let assetTypeClass = req.body;
    orchestrator
        .saveAssetTypeClass(assetTypeClass)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.post("/attributes", function (req, res, ndex) {
    let availableAttribute = req.body;
    orchestrator
        .saveAvailableAttribute(availableAttribute)
        .subscribe(availableAttribute => {
        res.send(JSON.stringify(availableAttribute));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.put("/attributes/:attributeId", function (req, res, next) {
    let attributeId = req.params.attributeId;
    let attribute = req.body;
    orchestrator
        .updateAvailableAttribute(attributeId, attribute)
        .subscribe(numUpdated => {
        res.send(JSON.stringify(numUpdated));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.put("/:assetTypeClassId", function (req, res, next) {
    let assetTypeClassId = req.params.assetTypeClassId;
    let assetTypeClass = req.body;
    orchestrator
        .updateAssetTypeClass(assetTypeClassId, assetTypeClass)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.delete("/attributes/:attributeId", function (req, res, next) {
    let attributeId = req.params.attributeId;
    orchestrator
        .deleteAvailableAttribute(attributeId)
        .subscribe(numRemoved => {
        res.send(JSON.stringify(numRemoved));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
router.delete("/:assetTypeClassId", function (req, res, next) {
    let assetTypeClassId = req.params.assetTypeClassId;
    orchestrator
        .deleteAssetTypeClass(assetTypeClassId)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
});
function getNumericValueOrDefault(value, defaultValue) {
    if (!value) {
        return defaultValue;
    }
    if (isNaN(parseFloat(value))) {
        return defaultValue;
    }
    if (!isFinite(value)) {
        return defaultValue;
    }
    return value;
}
function getStringValueOrDefault(strValue, defaultValue) {
    if (!strValue && !defaultValue) {
        return "";
    }
    if (!strValue && defaultValue) {
        return defaultValue;
    }
    return strValue;
}
module.exports = router;
//# sourceMappingURL=resources.js.map