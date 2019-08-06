module.exports = {
    "env": {
      "browser": false,
      "es6": true,
      "jest": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "globals": {
      "window": true,
      "alert": true,
      "console": true,
      "document": true,
      "localStorage": true,
      "setInterval": true,
      "setTimeout": true,
      "fetch": true,
      "clearTimeout": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "no-console": [1, { allow: ["warn", "error"] }],
    }
};
