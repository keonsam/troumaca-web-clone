import {Request, Response} from "express";
import {PostOfficeBoxOrchestrator} from "./post.office.box.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PostOfficeBoxOrchestrator = new PostOfficeBoxOrchestrator();

export let getPostOfficeBoxes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getPostOfficeBoxes(number, size, field, direction)
    .subscribe(postOfficeBoxes => {
      res.send(JSON.stringify(postOfficeBoxes));
    });
};

export let getPostOfficeBoxById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getPostOfficeBoxById(siteId)
    .subscribe(postOfficeBox => {
      let body = JSON.stringify(postOfficeBox);
      res.send(body);
    });

};

export let updatePostOfficeBoxes = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let postOfficeBox = req.body;
  orchestrator
    .updatePostOfficeBox(siteId, postOfficeBox)
    .subscribe(postOfficeBox => {
      res.send(JSON.stringify(postOfficeBox));
    });

};

export let deletePostOfficeBoxes = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deletePostOfficeBox(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

