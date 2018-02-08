// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {By}              from '@angular/platform-browser';
// import {DebugElement}    from '@angular/core';
// import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
// import {AssetClientHttp} from "./asset.client.http";

import {TestBed, getTestBed, async, async, inject} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";

import {AssetClient} from "./asset.client";
import {assetClientProvider} from "./asset.client.provider";
import {AssetState} from "./asset.state";

describe("AssetClient", () => {

  let assetClient:AssetClient;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[
        {provide: AppConfig, useClass: AppConfig},
        {provide: UUIDGenerator, useClass: UUIDGenerator},
        assetClientProvider
      ]
    });

    // let injector = getTestBed();
    // assetClient = injector.get(AssetClient);

    it(`should issue a request`,
      async(
        inject([AssetClient], (assetClient:AssetClient) => {
          let assetState:AssetState = new AssetState();

          assetState.assetId = "1234";
          assetState.assetKindId = "4321";
          assetState.serialNumber = "who";
          assetState.description = "blue and white";
          assetState.quantity = "";
          assetState.unitOfMeasure = "";
          assetState.lotNumber = "";
          // assetState.site;
          // assetState.person;

          assetClient
            .addDiscreteAsset(assetState)
            .subscribe(value => {

            }, error2 => {

            });
        })
      )
    );
  });
});
