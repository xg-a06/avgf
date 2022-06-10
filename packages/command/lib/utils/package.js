class Package {
  constructor(options) {
    const { filePath, cachePath, name, version } = options;
    this.filePath = filePath;
    this.cachePath = cachePath;
    this.name = name;
    this.version = version;
    console.log('init');
  }
}

module.exports = Package;
