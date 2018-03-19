import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AttributeOrchestrator} from './attribute.orchestrator';

let orchestrator:AttributeOrchestrator = new AttributeOrchestrator();

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

export let getAssignedAttributeByClassId = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssignedAttributeByClassId(assetTypeClassId)
    .subscribe(pageResponse => {
      res.send(JSON.stringify(pageResponse));
    });
}

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
