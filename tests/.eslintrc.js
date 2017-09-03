module.exports = {
  extends: [
    "skalar"
  ],
  rules: {
    "no-invalid-this": "off",
    "babel/no-invalid-this": "off"
  },
  env: {
    embertest: true,
  },
};
