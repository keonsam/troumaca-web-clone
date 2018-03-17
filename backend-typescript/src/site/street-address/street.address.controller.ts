import {Request, Response} from "express";
import {StreetAddressOrchestrator} from "./street.address.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:StreetAddressOrchestrator = new StreetAddressOrchestrator();

export let getStreetAddresses = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getStreetAddresses(number, size, field, direction)
    .subscribe(streetAddresses => {
      res.send(JSON.stringify(streetAddresses));
    });
};

export let getStreetAddressById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getStreetAddressById(siteId)
    .subscribe(streetAddress => {
      let body = JSON.stringify(streetAddress);
      res.send(body);
    });

};

export let updateStreetAddresses = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let streetAddress = req.body;
  orchestrator
    .updateStreetAddress(siteId, streetAddress)
    .subscribe(streetAddress => {
      res.send(JSON.stringify(streetAddress));
    });

};

export let deleteStreetAddresses = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteStreetAddress(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

