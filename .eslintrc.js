module.exports = {
  root: true,
  "extends": [
    "@react-native-community",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "plugins": [
    "react",
    "react-native",
    "flowtype",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "ecmaFeatures": {
    "jsx": true
  },
  "globals": {
    "__DEV__": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {
        "root": [
          "./src"
        ],
        "alias": {
          "auth": "./src/auth",
          "common": "./src/common",
          "config": "./src/config",
          "receipts": "./src/receipts",
          "profile": "./src/profile",
          "navigation": "./src/navigation",
          "snack": "./src/snack",
          "utils": "./src/utils"
        }
      }
    }
  },
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/forbid-prop-types": ["error", {
      "forbid": []
    }],
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-no-bind": "error",
    "react/no-multi-comp": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "camelcase": "off",
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true
      }
    ]
  }
};
