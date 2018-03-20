
let factoryOptions = {
  "useDatabase": true
};

import "reflect-metadata";

import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// middleware
import accessChecker from './middleware/access-check'

// Controllers (route handlers)
import * as assetTypeController from './asset-type/asset.type.controller';
import * as assetController from './asset-type/asset/asset.controller';
import * as assetKindController from './asset-type/kind/asset.kind.controller';
import * as siteController from './site/site.controller';
import * as unitOfMeasureController from './unit-of-measure/unit.of.measure.controller';
import * as valueController from './asset-type/value/value.controller';
import * as assetTypeClassController from './asset-type/asset-type-class/asset.type.class.controller';
import * as dataTypeController from './data-type/data.type.controller';
import * as attributeController from './asset-type/attribute/attribute.controller';
import * as streetAddressController from './site/street-address/street.address.controller';
import * as postOfficeBoxController from './site/post-office-box/post.office.box.controller';
import * as emailController from './site/email/email.controller';
import * as phoneController from './site/phone/phone.controller';
import * as webSiteController from './site/web-site/web.site.controller';
import * as userController from './party/user/user.controller';
import * as organizationController from './party/organization/organization.controller';
import * as photoController from './party/photo/photo.controller';
import * as accountController from './party/account.controller';
import * as credentialController from './authentication/credential/credential.controller';
import * as confirmationController from './authentication/credential/confirmation/confirmation.controller';

const app = express();



app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'dist')));

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(cors());
// need cookieParser middleware before we can do anything with cookies

// app.use(accessMiddleware());


// routes

// Needs to introduce a middle where that will check active session
// and and add the session information to the request.
// app.use(accessMiddleware());

app.get('/asset-kinds', assetKindController.getAssetKinds); //a get instead of find seeing you are getting all of them.
app.get('/find-asset-types', assetTypeController.findAssetTypes);
app.get('/find-sites', siteController.findSite);
app.get('/find-unit-of-measures', unitOfMeasureController.findUnitOfMeasure);
app.get('/find-persons', userController.findUser);
app.get('/find-asset-type-classes', assetTypeClassController.findAssetTypeClass);
app.get('/data-types', dataTypeController.getDataTypes);
app.get('/assets', assetController.getAssets);
app.get('/assets/:assetId', assetController.getAssetById);
app.post('/assets', assetController.saveAsset);
app.put('/assets/:assetId', assetController.updateAsset);
app.delete('/assets/:assetId', assetController.deleteAsset);
app.get('/asset-types', assetTypeController.getAssetTypes);
app.get('/asset-types/:assetTypeId', assetTypeController.getAssetTypeById);
app.post('/asset-types', assetTypeController.saveAssetType);
app.put('/asset-types/:assetTypeId', assetTypeController.updateAssetType);
app.delete('/asset-types/:assetId', assetTypeController.deleteAssetType);
app.get('/values', valueController.getValues);
app.post('/values', valueController.saveValue);
app.put('/values/:valueId', valueController.updateValue);
app.delete('/values/:valueId', valueController.deleteValue);
app.get('/asset-type-classes', assetTypeClassController.getAssetTypeClasses);
app.get('/asset-type-classes/:assetTypeClassId', assetTypeClassController.getAssetTypeClass);
app.post('/asset-type-classes', assetTypeClassController.saveAssetTypeClass);
app.put('/asset-type-classes/:assetTypeClassId', assetTypeClassController.updateAssetTypeClass);
app.delete('/asset-type-classes/:assetTypeClassId', assetTypeClassController.deleteAssetTypeClass);
app.get('/attributes', attributeController.getAttributes);
app.get('/attributes/:attributesId', attributeController.getAttributeById);
app.get('/available-attributes', attributeController.getAvailableAttributes);
app.get('/assigned-attributes', attributeController.getAssignedAttributes);
app.get('/assigned-attributes/:assetTypeClassId', attributeController.getAssignedAttributeByClassId);
app.post('/attributes', attributeController.saveAttribute);
app.put('/attributes/:attributeId', attributeController.updateAttribute);
app.delete('/attributes/:attributeId', attributeController.deleteAttribute);
app.get('/street-addresses', streetAddressController.getStreetAddresses);
app.get('/street-addresses/:siteId', streetAddressController.getStreetAddressById);
app.post('/street-addresses', streetAddressController.saveStreetAddress);
app.put('/street-addresses/:siteId', streetAddressController.updateStreetAddress);
app.delete('/street-addresses/:siteId', streetAddressController.deleteStreetAddress);
app.get('/post-office-boxes', postOfficeBoxController.getPostOfficeBoxes);
app.get('/post-office-boxes/:siteId', postOfficeBoxController.getPostOfficeBoxById);
app.post('/post-office-boxes', postOfficeBoxController.savePostOfficeBox);
app.put('/post-office-boxes/:siteId', postOfficeBoxController.updatePostOfficeBox);
app.delete('/post-office-boxes/:siteId', postOfficeBoxController.deletePostOfficeBox);
app.get('/emails', emailController.getEmails);
app.get('/emails/:siteId', emailController.getEmailById);
app.post('/emails', emailController.saveEmail);
app.put('/emails/:siteId', emailController.updateEmail);
app.delete('/emails/:siteId', emailController.deleteEmail);
app.get('/web-sites', webSiteController.getWebSites);
app.get('/web-sites/:siteId', webSiteController.getWebSiteById);
app.post('/web-sites', webSiteController.saveWebSite);
app.put('/web-sites/:siteId', webSiteController.updateWebSite);
app.delete('/web-sites/:siteId', webSiteController.deleteWebSite);
app.get('/phones', phoneController.getPhones);
app.get('/phones/:siteId', phoneController.getPhoneById);
app.post('/phones', phoneController.savePhone);
app.put('/phones/:siteId', phoneController.updatePhone);
app.delete('/phones/:siteId', phoneController.deletePhone);
app.get('/users', userController.getUsers);
app.get('/users/:partyId', userController.getUser);
app.post('/users', userController.saveUser);
app.put('/users/:partyId', userController.updateUser);
app.delete('/users/:partyId', userController.deleteUser);
app.get('/organizations', organizationController.getOrganizations);
app.get('/organizations/:partyId', organizationController.getOrganization);
app.post('/organizations', organizationController.saveOrganization);
app.put('/organizations/:partyId', organizationController.updateOrganization);
app.delete('/organizations/:partyId', organizationController.deleteOrganization);
app.get('/photos:partyId', photoController.getPhotoById);
app.post('/photos', photoController.savePhoto);
app.put('/photos/:partyId', photoController.updatePhoto);
app.delete('/photos/:partyId', photoController.deletePhoto);
app.post('/accounts', accountController.saveAccount);
app.post('/validate-password', credentialController.isValidPassword);
app.post('/validate-username', credentialController.isValidUsername);
app.post('/validate-edit-username', credentialController.isValidEditUsername);
app.post('/authenticate', credentialController.authenticate);
app.post('/forgot-password', credentialController.forgotPassword);
app.post('/credentials', credentialController.addCredential);
app.put('/credentials', credentialController.updateCredential);
app.post('/verify-credentials-confirmations', confirmationController.verifyCredentialConfirmation);
app.get('/send-confirmation-codes/phone/:confirmationId', confirmationController.sendPhoneVerificationCode);
app.get('/send-confirmation-codes/email/:confirmationId', confirmationController.sendEmailVerificationCode);

// Needs to introduce a middle where that will check active session
// and and add the session information to the request.

// catch 404 and forward to error handler
app.use((req:any, res:any, next:any) => {
  let err:any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.send('{"message":"Express REST API error"}');
  res.render('error');
});

export default app;
