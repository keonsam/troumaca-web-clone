import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AttributeOrchestrator} from './attribute.orchestrator';

let orchestrator:AttributeOrchestrator = new AttributeOrchestrator();

// router.get("/attributes", function (req, res, next) {
export let getAvailableAttributes = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getAvailableAttributes(number, size, field, direction, assignedArray)
    .subscribe(pageResponse => {
      res.send(JSON.stringify(pageResponse));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

// router.get("/assigned-attributes", function (req, res, next) {
export let getAssignedAttributes = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getAssignedAttributes(number, size, field, direction, assignedArray)
    .subscribe(pageResponse => {
      res.send(JSON.stringify(pageResponse));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

// router.get("/attributes/:attributeId", function (req, res, ndex){
export let getAvailableAttribute = (req: Request, res: Response) => {
  let attributeId = req.params.attributeId;
  orchestrator.getAvailableAttribute(attributeId)
    .subscribe(attribute => {
      let body = JSON.stringify(attribute);
      res.send(body);
    }, error => {
      res.send(JSON.stringify(error));
    });

};

// router.post("/attributes", function (req, res, ndex) {
export let saveAvailableAttribute = (req: Request, res: Response) => {
  let availableAttribute = req.body;
  orchestrator.saveAvailableAttribute(availableAttribute)
    .subscribe(availableAttribute => {
      res.send(JSON.stringify(availableAttribute));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.put("/attributes/:attributeId", function (req, res, next) {
export let updateAvailableAttribute = (req: Request, res: Response) => {
  let attributeId = req.params.attributeId;
  let attribute = req.body;
  orchestrator.updateAvailableAttribute(attributeId, attribute)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.delete("/attributes/:attributeId", function (req, res, next) {
export let deleteAvailableAttribute = (req: Request, res: Response) => {
  let attributeId = req.params.attributeId;
  orchestrator.deleteAvailableAttribute(attributeId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let getAttributes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAttributes(number, size, field, direction)
    .subscribe(pageResponse => {
      res.send(JSON.stringify(pageResponse));
    });
};

export let saveAttribute = (req: Request, res: Response) => {
  orchestrator.saveAttribute(req.body)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let getAttributeCount = (req: Request, res: Response) => {
  orchestrator.getAttributeCount()
    .subscribe(assetCount => {
      res.send(JSON.stringify(assetCount));
    });
};

export let getAttributeById = (req: Request, res: Response) => {
  orchestrator.getAttributeById(req.params.attributeId)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};


export let updateAttribute = (req: Request, res: Response) => {
  orchestrator.updateAttribute(req.params.attributeId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });

};

export let deleteAttribute = (req: Request, res: Response) => {
  orchestrator.deleteAttribute(req.params.attributeId)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });
};
