export class ApplicationConfig {
  private globalPrefix = '';

  getGlobalPrefix() {
    return this.globalPrefix;
  }

  setGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix;
  }
}
