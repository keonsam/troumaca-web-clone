import {Request, Response} from "express";
import {ValueOrchestrator} from "./value.orchestrator";
import {shapeValuesResponse2} from "./value.response.shaper";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";

let valueOrchestrator:ValueOrchestrator = new ValueOrchestrator();

export let getValues = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  valueOrchestrator.getValues(number, size, field, direction)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    });
};

export let saveValue = (req: Request, res: Response) => {
  valueOrchestrator.saveValue(req.body)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let getValueCount = (req: Request, res: Response) => {
  valueOrchestrator.getValueCount()
    .subscribe(assetCount => {
      res.send(JSON.stringify(assetCount));
    });
};

export let getValueById = (req: Request, res: Response) => {
  valueOrchestrator.getValueById(req.body.assetId)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let findValues = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  valueOrchestrator.findValues(searchStr, pageSize)
    .map(value => {
      return shapeValuesResponse2("values", value);
    }).subscribe(values => {
    let body = JSON.stringify(values);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};

export let updateValue = (req: Request, res: Response) => {
  valueOrchestrator.updateValue(req.body.assetId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });

};

export let deleteValue = (req: Request, res: Response) => {
  valueOrchestrator.deleteValue(req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });
};
