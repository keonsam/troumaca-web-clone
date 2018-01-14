export class RepositoryFactory {

  constructor(useDatabase) {
    this.useDatabase = useDatabase;
  }

  createAssetRepository() {
    if (this.useDatabase) {

    } else {

    }
  }
}