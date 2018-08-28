module.exports = {
    
    "extends": "airbnb-base",
    "env": {
      "node": true,
      "mocha": true,
    },
    "rules": {
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true
            }
        ],
        "no-underscore-dangle": "off",
        "linebreak-style": "off",
        "newline-per-chained-call": "off"
    }
}
