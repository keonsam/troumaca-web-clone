export class AssetIdentifier {
  assetIdentifierTypeId: string;
  name: string;
  value: string;
  effectiveDate: string;
  untilDate: string;
  constructor(assetIdentifierTypeId?: string, value?: string) {
    this.assetIdentifierTypeId = assetIdentifierTypeId;
    this.value = value;
  }
}
