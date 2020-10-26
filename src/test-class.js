// FACTABLE

// NO SE METE FACTABLE EN LOS MÉTODOS

class TestClass {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getValues(prefix) {
    return `${prefix}:${this.height}-${this.width}`;
  }
}

module.exports = TestClass;
