module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: ["skalar"],
  env: {
    'browser': true
  },
  rules: {
    "no-invalid-this": "off",
    "babel/no-invalid-this": "off"
  }
};
