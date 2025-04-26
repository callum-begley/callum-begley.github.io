import {
  __commonJS,
  __require
} from "./chunk-VUNV25KB.js";

// node_modules/word-lib/lib/dictionary/index.js
var require_dictionary = __commonJS({
  "node_modules/word-lib/lib/dictionary/index.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setLanguage = exports.getDictionary = exports.dictionaries = exports.currentLanguage = void 0;
    var defaultLanguage = "en";
    var allowedLanguages = [defaultLanguage];
    exports.currentLanguage = defaultLanguage;
    exports.dictionaries = (_a = {}, _a[defaultLanguage] = __require("./".concat(defaultLanguage, "/").concat(defaultLanguage, ".json")), _a);
    var getDictionary = function() {
      return exports.dictionaries[exports.currentLanguage];
    };
    exports.getDictionary = getDictionary;
    var setLanguage = function(language) {
      if (typeof language !== "string") {
        throw new TypeError("Language must be of type string.");
      }
      if (language.length !== 2) {
        throw new Error("Language code must be two letters.");
      }
      if (!allowedLanguages.includes(language)) {
        throw new Error("Language '".concat(language, "' is not yet supported."));
      }
      if (!exports.dictionaries[language]) {
        exports.dictionaries[language] = __require("./".concat(exports.currentLanguage, "/").concat(exports.currentLanguage, ".json"));
      }
      exports.currentLanguage = language;
    };
    exports.setLanguage = setLanguage;
  }
});

// node_modules/word-lib/lib/exists.js
var require_exists = __commonJS({
  "node_modules/word-lib/lib/exists.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exists = void 0;
    var dictionary_1 = require_dictionary();
    var defualtOptions = {
      allowOneLetterWords: false
    };
    var exists = function(text, options) {
      if (options === void 0) {
        options = defualtOptions;
      }
      if (typeof text !== "string") {
        throw new TypeError("Text must be of type string.");
      }
      var cleanedText = text.trim().toLowerCase();
      if (cleanedText.length === 0) {
        return false;
      }
      if (cleanedText.length === 1) {
        if (options.allowOneLetterWords) {
          return cleanedText === "i" || cleanedText === "a";
        }
        return false;
      }
      var dictionary = (0, dictionary_1.getDictionary)();
      var wordPrefixGroup = dictionary[cleanedText.slice(0, 2)];
      var wordExists = Boolean(wordPrefixGroup === null || wordPrefixGroup === void 0 ? void 0 : wordPrefixGroup.includes(cleanedText));
      return wordExists;
    };
    exports.exists = exists;
  }
});

// node_modules/word-lib/lib/random.js
var require_random = __commonJS({
  "node_modules/word-lib/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.random = void 0;
    var dictionary_1 = require_dictionary();
    var random = function(maxLength) {
      if (maxLength) {
        if (typeof maxLength !== "number") {
          throw new TypeError("Max length must be of type string.");
        }
        maxLength = Math.floor(maxLength);
        if (maxLength < 3) {
          throw new Error("Maximum length of random word must be atlesat 3.");
        }
      }
      var _word = "";
      var dictionary = (0, dictionary_1.getDictionary)();
      var shuffledWordSet = shuffle(Object.values(dictionary));
      exit_loop: for (var i = 0; i < shuffledWordSet.length; i++) {
        var set = shuffle(shuffledWordSet[i]);
        for (var j = 0; j < set.length; j++) {
          var word = set[j];
          if (word.length >= 3) {
            if (!maxLength || maxLength && word.length <= maxLength) {
              _word = word;
              break exit_loop;
            }
          }
        }
      }
      return _word;
    };
    exports.random = random;
    function shuffle(array) {
      var _a;
      var currentIndex = array.length;
      var randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
          array[randomIndex],
          array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
      }
      return array;
    }
  }
});

// node_modules/word-lib/lib/index.js
var require_lib = __commonJS({
  "node_modules/word-lib/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var exists_1 = require_exists();
    var random_1 = require_random();
    var dictionary_1 = require_dictionary();
    exports.default = { exists: exists_1.exists, random: random_1.random, setLanguage: dictionary_1.setLanguage };
  }
});
export default require_lib();
//# sourceMappingURL=word-lib.js.map
