export class SorrelApplicationConfig {
  private globalPrefix = '';

  public getGlobalPrefix() {
    return this.globalPrefix;
  }

  public setGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix;
  }
}
