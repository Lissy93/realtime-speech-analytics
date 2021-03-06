(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
(function() {
  var _private, arrayifySentence, formatSentence, formatWordsArr, fs, removeDuplicates, removeWords;

  

  _private = {};

  removeWords = function(sentence, getRidOfDuplicates, wordsArray) {
    var dictionaryWord, index, j, k, len, len1, sentenceArr, sentenceWord;
    if (getRidOfDuplicates == null) {
      getRidOfDuplicates = true;
    }
    if (wordsArray == null) {
      wordsArray = void 0;
    }
    if (wordsArray == null) {
      wordsArray = "a\r\naboard\r\nabout\r\nabove\r\nacross\r\nafter\r\nagainst\r\nall\r\nalong\r\nalthough\r\namid\r\namong\r\nan\r\nand\r\nanother\r\nanti\r\nany\r\nanybody\r\nanyone\r\nanything\r\nare\r\naround\r\nas\r\nat\r\nbe\r\nbecause\r\nbefore\r\nbehind\r\nbelow\r\nbeneath\r\nbeside\r\nbesides\r\nbetween\r\nbeyond\r\nboth\r\nbut\r\nby\r\ncan\r\ncant\r\nconcerning\r\nconsidering\r\ndespite\r\ndo\r\ndont\r\ndown\r\nduring\r\neach\r\neither\r\neven\r\nevery\r\neverybody\r\neveryone\r\neverything\r\nexcept\r\nexcepting\r\nexcluding\r\nfew\r\nfollowing\r\nfor\r\nfrom\r\nget\r\ngo\r\ngoing\r\nhe\r\nher\r\nhers\r\nherself\r\nhim\r\nhimself\r\nhis\r\nhow\r\ni\r\nif\r\nin\r\ninside\r\ninto\r\nis\r\nit\r\nits\r\nitself\r\njust\r\nknow\r\nlet\r\nlike\r\nlittle\r\nmany\r\nme\r\nmine\r\nminus\r\nmore\r\nmost\r\nmuch\r\nmust\r\nmy\r\nmyself\r\nnear\r\nneither\r\nnever\r\nno\r\nnobody\r\nnone\r\nnot\r\nnothing\r\nnow\r\nof\r\noff\r\non\r\nonce\r\none\r\nonly\r\nonto\r\nopposite\r\nor\r\nother\r\nothers\r\nour\r\nours\r\nourselves\r\nout\r\noutside\r\nover\r\nown\r\npast\r\nper\r\nplus\r\nregarding\r\nround\r\nRT\r\nsave\r\nsay\r\nsee\r\nseveral\r\nshe\r\nsince\r\nso\r\nsome\r\nsomebody\r\nsomeone\r\nsomething\r\ntake\r\nthan\r\nthat\r\nthe\r\ntheir\r\ntheirs\r\nthem\r\nthemselves\r\nthere\r\nthese\r\nthey\r\nthis\r\nthose\r\nthough\r\nthrough\r\nto\r\ntoo\r\ntoward\r\ntowards\r\ntry\r\nunder\r\nunderneath\r\nunless\r\nunlike\r\nuntil\r\nup\r\nupon\r\nus\r\nversus\r\nvia\r\nwant\r\nwas\r\nwe\r\nwhat\r\nwhatever\r\nwhen\r\nwhenever\r\nwhere\r\nwhereas\r\nwhether\r\nwhich\r\nwhichever\r\nwhile\r\nwho\r\nwhoever\r\nwhom\r\nwhomever\r\nwhose\r\nwhy\r\nwill\r\nwith\r\nwithin\r\nwithout\r\nyou\r\nyour\r\nyours\r\nyourself\r\nyourselves\r\n".split('\r\n');
    } else {
      wordsArray = typeof wordsArray === 'string' ? [wordsArray] : wordsArray;
      wordsArray = formatWordsArr(wordsArray);
    }
    sentence = typeof sentence === 'string' ? sentence : '';
    sentenceArr = arrayifySentence(sentence);
    for (j = 0, len = wordsArray.length; j < len; j++) {
      dictionaryWord = wordsArray[j];
      for (index = k = 0, len1 = sentenceArr.length; k < len1; index = ++k) {
        sentenceWord = sentenceArr[index];
        if (sentenceWord === dictionaryWord) {
          sentenceArr.splice(index, 1);
        }
      }
    }
    if (getRidOfDuplicates) {
      return removeDuplicates(sentenceArr);
    } else {
      return sentenceArr;
    }
  };

  arrayifySentence = function(sentence) {
    sentence = formatSentence(sentence);
    sentence = sentence.split(' ');
    return sentence = sentence.filter(function(n) {
      return n !== '';
    });
  };

  formatWordsArr = function(wordsArr) {
    var i, j, len, word;
    if (!wordsArr instanceof Array) {
      return [];
    }
    for (i = j = 0, len = wordsArr.length; j < len; i = ++j) {
      word = wordsArr[i];
      wordsArr[i] = formatSentence(word);
    }
    return wordsArr;
  };

  formatSentence = function(sentence) {
    sentence = sentence != null ? sentence : '';
    sentence = sentence.toLowerCase();
    sentence = sentence.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    return sentence = sentence.replace(/[^\w\s]/gi, '');
  };

  removeDuplicates = function(arr) {
    var j, key, ref, res, results, value;
    if (arr.length === 0) {
      return [];
    }
    res = {};
    for (key = j = 0, ref = arr.length - 1; 0 <= ref ? j <= ref : j >= ref; key = 0 <= ref ? ++j : --j) {
      res[arr[key]] = arr[key];
    }
    results = [];
    for (key in res) {
      value = res[key];
      results.push(value);
    }
    return results;
  };

  _private = {
    arrayifySentence: arrayifySentence,
    formatWordsArr: formatWordsArr,
    formatSentence: formatSentence,
    removeDuplicates: removeDuplicates
  };

  module.exports = removeWords;

  if (process.env.NODE_ENV === 'test') {
    module.exports = {
      main: removeWords,
      _private: _private
    };
  }

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */
}).call(this,require('_process'))
},{"_process":1}],3:[function(require,module,exports){
(function (process){
(function() {
  var afinnWordList, analyseSentence, doesWordExist, fs, getScoreOfWord, getWordsInSentence, removeDuplicates, scaleScore;

  

  afinnWordList = JSON.parse("\r\n{\r\n  \"abandon\": -2,\r\n  \"abandoned\": -2,\r\n  \"abducted\": -2,\r\n  \"abduction\": -2,\r\n  \"abductions\": -2,\r\n  \"abhor\": -3,\r\n  \"abhorred\": -3,\r\n  \"abhorrent\": -3,\r\n  \"abhors\": -3,\r\n  \"abilities\": 2,\r\n  \"ability\": 2,\r\n  \"aboard\": 1,\r\n  \"absentee\": -1,\r\n  \"absentees\": -1,\r\n  \"absolve\": 2,\r\n  \"absolved\": 2,\r\n  \"absolves\": 2,\r\n  \"absolving\": 2,\r\n  \"absorbed\": 1,\r\n  \"abuse\": -3,\r\n  \"abused\": -3,\r\n  \"abuses\": -3,\r\n  \"abusive\": -3,\r\n  \"accept\": 1,\r\n  \"accepted\": 1,\r\n  \"accepting\": 1,\r\n  \"accepts\": 1,\r\n  \"accident\": -2,\r\n  \"accidental\": -2,\r\n  \"accidentally\": -2,\r\n  \"accidents\": -2,\r\n  \"accomplish\": 2,\r\n  \"accomplished\": 2,\r\n  \"accomplishes\": 2,\r\n  \"accusation\": -2,\r\n  \"accusations\": -2,\r\n  \"accuse\": -2,\r\n  \"accused\": -2,\r\n  \"accuses\": -2,\r\n  \"accusing\": -2,\r\n  \"ache\": -2,\r\n  \"achievable\": 1,\r\n  \"aching\": -2,\r\n  \"acquit\": 2,\r\n  \"acquits\": 2,\r\n  \"acquitted\": 2,\r\n  \"acquitting\": 2,\r\n  \"acrimonious\": -3,\r\n  \"active\": 1,\r\n  \"adequate\": 1,\r\n  \"admire\": 3,\r\n  \"admired\": 3,\r\n  \"admires\": 3,\r\n  \"admiring\": 3,\r\n  \"admit\": -1,\r\n  \"admits\": -1,\r\n  \"admitted\": -1,\r\n  \"admonish\": -2,\r\n  \"admonished\": -2,\r\n  \"adopt\": 1,\r\n  \"adopts\": 1,\r\n  \"adorable\": 3,\r\n  \"adore\": 3,\r\n  \"adored\": 3,\r\n  \"adores\": 3,\r\n  \"advanced\": 1,\r\n  \"advantage\": 2,\r\n  \"advantages\": 2,\r\n  \"adventure\": 2,\r\n  \"adventures\": 2,\r\n  \"adventurous\": 2,\r\n  \"affected\": -1,\r\n  \"affection\": 3,\r\n  \"affectionate\": 3,\r\n  \"afflicted\": -1,\r\n  \"affronted\": -1,\r\n  \"afraid\": -2,\r\n  \"aggravate\": -2,\r\n  \"aggravated\": -2,\r\n  \"aggravates\": -2,\r\n  \"aggravating\": -2,\r\n  \"aggression\": -2,\r\n  \"aggressions\": -2,\r\n  \"aggressive\": -2,\r\n  \"aghast\": -2,\r\n  \"agog\": 2,\r\n  \"agonise\": -3,\r\n  \"agonised\": -3,\r\n  \"agonises\": -3,\r\n  \"agonising\": -3,\r\n  \"agonize\": -3,\r\n  \"agonized\": -3,\r\n  \"agonizes\": -3,\r\n  \"agonizing\": -3,\r\n  \"agree\": 1,\r\n  \"agreeable\": 2,\r\n  \"agreed\": 1,\r\n  \"agreement\": 1,\r\n  \"agrees\": 1,\r\n  \"alarm\": -2,\r\n  \"alarmed\": -2,\r\n  \"alarmist\": -2,\r\n  \"alarmists\": -2,\r\n  \"alas\": -1,\r\n  \"alert\": -1,\r\n  \"alienation\": -2,\r\n  \"alive\": 1,\r\n  \"allergic\": -2,\r\n  \"allow\": 1,\r\n  \"alone\": -2,\r\n  \"amaze\": 2,\r\n  \"amazed\": 2,\r\n  \"amazes\": 2,\r\n  \"amazing\": 4,\r\n  \"ambitious\": 2,\r\n  \"ambivalent\": -1,\r\n  \"amuse\": 3,\r\n  \"amused\": 3,\r\n  \"amusement\": 3,\r\n  \"amusements\": 3,\r\n  \"anger\": -3,\r\n  \"angers\": -3,\r\n  \"angry\": -3,\r\n  \"anguish\": -3,\r\n  \"anguished\": -3,\r\n  \"animosity\": -2,\r\n  \"annoy\": -2,\r\n  \"annoyance\": -2,\r\n  \"annoyed\": -2,\r\n  \"annoying\": -2,\r\n  \"annoys\": -2,\r\n  \"antagonistic\": -2,\r\n  \"anti\": -1,\r\n  \"anticipation\": 1,\r\n  \"anxiety\": -2,\r\n  \"anxious\": -2,\r\n  \"apathetic\": -3,\r\n  \"apathy\": -3,\r\n  \"apeshit\": -3,\r\n  \"apocalyptic\": -2,\r\n  \"apologise\": -1,\r\n  \"apologised\": -1,\r\n  \"apologises\": -1,\r\n  \"apologising\": -1,\r\n  \"apologize\": -1,\r\n  \"apologized\": -1,\r\n  \"apologizes\": -1,\r\n  \"apologizing\": -1,\r\n  \"apology\": -1,\r\n  \"appalled\": -2,\r\n  \"appalling\": -2,\r\n  \"appease\": 2,\r\n  \"appeased\": 2,\r\n  \"appeases\": 2,\r\n  \"appeasing\": 2,\r\n  \"applaud\": 2,\r\n  \"applauded\": 2,\r\n  \"applauding\": 2,\r\n  \"applauds\": 2,\r\n  \"applause\": 2,\r\n  \"appreciate\": 2,\r\n  \"appreciated\": 2,\r\n  \"appreciates\": 2,\r\n  \"appreciating\": 2,\r\n  \"appreciation\": 2,\r\n  \"apprehensive\": -2,\r\n  \"approval\": 2,\r\n  \"approved\": 2,\r\n  \"approves\": 2,\r\n  \"ardent\": 1,\r\n  \"arrest\": -2,\r\n  \"arrested\": -3,\r\n  \"arrests\": -2,\r\n  \"arrogant\": -2,\r\n  \"ashame\": -2,\r\n  \"ashamed\": -2,\r\n  \"ass\": -4,\r\n  \"assassination\": -3,\r\n  \"assassinations\": -3,\r\n  \"asset\": 2,\r\n  \"assets\": 2,\r\n  \"assfucking\": -4,\r\n  \"asshole\": -4,\r\n  \"astonished\": 2,\r\n  \"astound\": 3,\r\n  \"astounded\": 3,\r\n  \"astounding\": 3,\r\n  \"astoundingly\": 3,\r\n  \"astounds\": 3,\r\n  \"attack\": -1,\r\n  \"attacked\": -1,\r\n  \"attacking\": -1,\r\n  \"attacks\": -1,\r\n  \"attract\": 1,\r\n  \"attracted\": 1,\r\n  \"attracting\": 2,\r\n  \"attraction\": 2,\r\n  \"attractions\": 2,\r\n  \"attracts\": 1,\r\n  \"audacious\": 3,\r\n  \"authority\": 1,\r\n  \"avert\": -1,\r\n  \"averted\": -1,\r\n  \"averts\": -1,\r\n  \"avid\": 2,\r\n  \"avoid\": -1,\r\n  \"avoided\": -1,\r\n  \"avoids\": -1,\r\n  \"await\": -1,\r\n  \"awaited\": -1,\r\n  \"awaits\": -1,\r\n  \"award\": 3,\r\n  \"awarded\": 3,\r\n  \"awards\": 3,\r\n  \"awesome\": 4,\r\n  \"awful\": -3,\r\n  \"awkward\": -2,\r\n  \"axe\": -1,\r\n  \"axed\": -1,\r\n  \"abandons\": -2,\r\n  \"backing\": 2,\r\n  \"backs\": 1,\r\n  \"badass\": -3,\r\n  \"badly\": -3,\r\n  \"bailout\": -2,\r\n  \"bamboozle\": -2,\r\n  \"bamboozled\": -2,\r\n  \"bamboozles\": -2,\r\n  \"ban\": -2,\r\n  \"banish\": -1,\r\n  \"bankrupt\": -3,\r\n  \"bankster\": -3,\r\n  \"banned\": -2,\r\n  \"bargain\": 2,\r\n  \"barrier\": -2,\r\n  \"bastard\": -5,\r\n  \"bastards\": -5,\r\n  \"battle\": -1,\r\n  \"battles\": -1,\r\n  \"beaten\": -2,\r\n  \"beatific\": 3,\r\n  \"beating\": -1,\r\n  \"beauties\": 3,\r\n  \"beautiful\": 3,\r\n  \"beautifully\": 3,\r\n  \"beautify\": 3,\r\n  \"belittle\": -2,\r\n  \"belittled\": -2,\r\n  \"beloved\": 3,\r\n  \"benefit\": 2,\r\n  \"benefits\": 2,\r\n  \"benefitted\": 2,\r\n  \"benefitting\": 2,\r\n  \"bereave\": -2,\r\n  \"bereaved\": -2,\r\n  \"bereaves\": -2,\r\n  \"bereaving\": -2,\r\n  \"best\": 3,\r\n  \"betray\": -3,\r\n  \"betrayal\": -3,\r\n  \"betrayed\": -3,\r\n  \"betraying\": -3,\r\n  \"betrays\": -3,\r\n  \"better\": 2,\r\n  \"bias\": -1,\r\n  \"biased\": -2,\r\n  \"big\": 1,\r\n  \"bitch\": -5,\r\n  \"bitches\": -5,\r\n  \"bitter\": -2,\r\n  \"bitterly\": -2,\r\n  \"bizarre\": -2,\r\n  \"blah\": -2,\r\n  \"blame\": -2,\r\n  \"blamed\": -2,\r\n  \"blames\": -2,\r\n  \"blaming\": -2,\r\n  \"bless\": 2,\r\n  \"blesses\": 2,\r\n  \"blessing\": 3,\r\n  \"blind\": -1,\r\n  \"bliss\": 3,\r\n  \"blissful\": 3,\r\n  \"blithe\": 2,\r\n  \"block\": -1,\r\n  \"blockbuster\": 3,\r\n  \"blocked\": -1,\r\n  \"blocking\": -1,\r\n  \"blocks\": -1,\r\n  \"bloody\": -3,\r\n  \"blurry\": -2,\r\n  \"boastful\": -2,\r\n  \"bold\": 2,\r\n  \"boldly\": 2,\r\n  \"bomb\": -1,\r\n  \"boost\": 1,\r\n  \"boosted\": 1,\r\n  \"boosting\": 1,\r\n  \"boosts\": 1,\r\n  \"bore\": -2,\r\n  \"bored\": -2,\r\n  \"boring\": -3,\r\n  \"bother\": -2,\r\n  \"bothered\": -2,\r\n  \"bothers\": -2,\r\n  \"bothersome\": -2,\r\n  \"boycott\": -2,\r\n  \"boycotted\": -2,\r\n  \"boycotting\": -2,\r\n  \"boycotts\": -2,\r\n  \"brainwashing\": -3,\r\n  \"brave\": 2,\r\n  \"breakthrough\": 3,\r\n  \"breathtaking\": 5,\r\n  \"bribe\": -3,\r\n  \"bright\": 1,\r\n  \"brightest\": 2,\r\n  \"brightness\": 1,\r\n  \"brilliant\": 4,\r\n  \"brisk\": 2,\r\n  \"broke\": -1,\r\n  \"broken\": -1,\r\n  \"brooding\": -2,\r\n  \"bullied\": -2,\r\n  \"bullshit\": -4,\r\n  \"bully\": -2,\r\n  \"bullying\": -2,\r\n  \"bummer\": -2,\r\n  \"buoyant\": 2,\r\n  \"burden\": -2,\r\n  \"burdened\": -2,\r\n  \"burdening\": -2,\r\n  \"burdens\": -2,\r\n  \"backed\": 1,\r\n  \"bad\": -3,\r\n  \"committed\": 1,\r\n  \"calming\": 2,\r\n  \"can't stand\": -3,\r\n  \"cancel\": -1,\r\n  \"cancelled\": -1,\r\n  \"cancelling\": -1,\r\n  \"cancels\": -1,\r\n  \"cancer\": -1,\r\n  \"capable\": 1,\r\n  \"captivated\": 3,\r\n  \"care\": 2,\r\n  \"carefree\": 1,\r\n  \"careful\": 2,\r\n  \"carefully\": 2,\r\n  \"careless\": -2,\r\n  \"cares\": 2,\r\n  \"cashing in\": -2,\r\n  \"casualty\": -2,\r\n  \"catastrophe\": -3,\r\n  \"catastrophic\": -4,\r\n  \"cautious\": -1,\r\n  \"celebrate\": 3,\r\n  \"celebrated\": 3,\r\n  \"celebrates\": 3,\r\n  \"celebrating\": 3,\r\n  \"censor\": -2,\r\n  \"censored\": -2,\r\n  \"censors\": -2,\r\n  \"certain\": 1,\r\n  \"chagrin\": -2,\r\n  \"chagrined\": -2,\r\n  \"challenge\": -1,\r\n  \"chance\": 2,\r\n  \"chances\": 2,\r\n  \"chaos\": -2,\r\n  \"chaotic\": -2,\r\n  \"charged\": -3,\r\n  \"charges\": -2,\r\n  \"charm\": 3,\r\n  \"charming\": 3,\r\n  \"charmless\": -3,\r\n  \"chastise\": -3,\r\n  \"chastised\": -3,\r\n  \"chastises\": -3,\r\n  \"chastising\": -3,\r\n  \"cheat\": -3,\r\n  \"cheated\": -3,\r\n  \"cheater\": -3,\r\n  \"cheaters\": -3,\r\n  \"cheats\": -3,\r\n  \"calmed\": 2,\r\n  \"cheered\": 2,\r\n  \"cheerful\": 2,\r\n  \"cheering\": 2,\r\n  \"cheerless\": -2,\r\n  \"cheers\": 2,\r\n  \"cheery\": 3,\r\n  \"cherish\": 2,\r\n  \"cherished\": 2,\r\n  \"cherishes\": 2,\r\n  \"cherishing\": 2,\r\n  \"chic\": 2,\r\n  \"childish\": -2,\r\n  \"chilling\": -1,\r\n  \"choke\": -2,\r\n  \"choked\": -2,\r\n  \"chokes\": -2,\r\n  \"choking\": -2,\r\n  \"clarifies\": 2,\r\n  \"clarity\": 2,\r\n  \"clash\": -2,\r\n  \"classy\": 3,\r\n  \"clean\": 2,\r\n  \"cleaner\": 2,\r\n  \"clear\": 1,\r\n  \"cleared\": 1,\r\n  \"clearly\": 1,\r\n  \"clears\": 1,\r\n  \"clever\": 2,\r\n  \"clouded\": -1,\r\n  \"clueless\": -2,\r\n  \"cock\": -5,\r\n  \"cocksucker\": -5,\r\n  \"cocksuckers\": -5,\r\n  \"cocky\": -2,\r\n  \"coerced\": -2,\r\n  \"collapse\": -2,\r\n  \"collapsed\": -2,\r\n  \"collapses\": -2,\r\n  \"collapsing\": -2,\r\n  \"collide\": -1,\r\n  \"collides\": -1,\r\n  \"colliding\": -1,\r\n  \"collision\": -2,\r\n  \"collisions\": -2,\r\n  \"colluding\": -3,\r\n  \"combat\": -1,\r\n  \"combats\": -1,\r\n  \"comedy\": 1,\r\n  \"comfort\": 2,\r\n  \"comfortable\": 2,\r\n  \"comforting\": 2,\r\n  \"comforts\": 2,\r\n  \"commend\": 2,\r\n  \"commended\": 2,\r\n  \"commit\": 1,\r\n  \"commitment\": 2,\r\n  \"commits\": 1,\r\n  \"calms\": 2,\r\n  \"committing\": 1,\r\n  \"compassionate\": 2,\r\n  \"compelled\": 1,\r\n  \"competent\": 2,\r\n  \"competitive\": 2,\r\n  \"complacent\": -2,\r\n  \"complain\": -2,\r\n  \"complained\": -2,\r\n  \"complains\": -2,\r\n  \"comprehensive\": 2,\r\n  \"conciliate\": 2,\r\n  \"conciliated\": 2,\r\n  \"conciliates\": 2,\r\n  \"conciliating\": 2,\r\n  \"condemn\": -2,\r\n  \"condemnation\": -2,\r\n  \"condemned\": -2,\r\n  \"condemns\": -2,\r\n  \"confidence\": 2,\r\n  \"confident\": 2,\r\n  \"conflict\": -2,\r\n  \"conflicting\": -2,\r\n  \"conflictive\": -2,\r\n  \"conflicts\": -2,\r\n  \"confuse\": -2,\r\n  \"confused\": -2,\r\n  \"confusing\": -2,\r\n  \"congrats\": 2,\r\n  \"congratulate\": 2,\r\n  \"congratulation\": 2,\r\n  \"congratulations\": 2,\r\n  \"consent\": 2,\r\n  \"consents\": 2,\r\n  \"consolable\": 2,\r\n  \"conspiracy\": -3,\r\n  \"constrained\": -2,\r\n  \"contagion\": -2,\r\n  \"contagions\": -2,\r\n  \"contagious\": -1,\r\n  \"contempt\": -2,\r\n  \"contemptuous\": -2,\r\n  \"contemptuously\": -2,\r\n  \"contend\": -1,\r\n  \"contender\": -1,\r\n  \"contending\": -1,\r\n  \"contentious\": -2,\r\n  \"contestable\": -2,\r\n  \"controversial\": -2,\r\n  \"controversially\": -2,\r\n  \"convince\": 1,\r\n  \"convinced\": 1,\r\n  \"convinces\": 1,\r\n  \"convivial\": 2,\r\n  \"cool\": 1,\r\n  \"cool stuff\": 3,\r\n  \"cornered\": -2,\r\n  \"corpse\": -1,\r\n  \"costly\": -2,\r\n  \"courage\": 2,\r\n  \"courageous\": 2,\r\n  \"courteous\": 2,\r\n  \"courtesy\": 2,\r\n  \"cover-up\": -3,\r\n  \"coward\": -2,\r\n  \"cowardly\": -2,\r\n  \"coziness\": 2,\r\n  \"cramp\": -1,\r\n  \"crap\": -3,\r\n  \"crash\": -2,\r\n  \"crazier\": -2,\r\n  \"craziest\": -2,\r\n  \"crazy\": -2,\r\n  \"creative\": 2,\r\n  \"crestfallen\": -2,\r\n  \"cried\": -2,\r\n  \"cries\": -2,\r\n  \"crime\": -3,\r\n  \"criminal\": -3,\r\n  \"criminals\": -3,\r\n  \"crisis\": -3,\r\n  \"critic\": -2,\r\n  \"criticism\": -2,\r\n  \"criticize\": -2,\r\n  \"criticized\": -2,\r\n  \"criticizes\": -2,\r\n  \"criticizing\": -2,\r\n  \"critics\": -2,\r\n  \"cruel\": -3,\r\n  \"cruelty\": -3,\r\n  \"crush\": -1,\r\n  \"crushed\": -2,\r\n  \"crushes\": -1,\r\n  \"crushing\": -1,\r\n  \"cry\": -1,\r\n  \"crying\": -2,\r\n  \"cunt\": -5,\r\n  \"curious\": 1,\r\n  \"curse\": -1,\r\n  \"cut\": -1,\r\n  \"cute\": 2,\r\n  \"cuts\": -1,\r\n  \"cutting\": -1,\r\n  \"cynic\": -2,\r\n  \"cynical\": -2,\r\n  \"cynicism\": -2,\r\n  \"calm\": 2,\r\n  \"cheer\": 2,\r\n  \"damages\": -3,\r\n  \"damn\": -4,\r\n  \"damned\": -4,\r\n  \"damnit\": -4,\r\n  \"danger\": -2,\r\n  \"daredevil\": 2,\r\n  \"daring\": 2,\r\n  \"darkest\": -2,\r\n  \"darkness\": -1,\r\n  \"dauntless\": 2,\r\n  \"dead\": -3,\r\n  \"deadlock\": -2,\r\n  \"deafening\": -1,\r\n  \"dear\": 2,\r\n  \"dearly\": 3,\r\n  \"death\": -2,\r\n  \"debonair\": 2,\r\n  \"debt\": -2,\r\n  \"deceit\": -3,\r\n  \"deceitful\": -3,\r\n  \"deceive\": -3,\r\n  \"deceived\": -3,\r\n  \"deceives\": -3,\r\n  \"deceiving\": -3,\r\n  \"deception\": -3,\r\n  \"decisive\": 1,\r\n  \"dedicated\": 2,\r\n  \"defeated\": -2,\r\n  \"defect\": -3,\r\n  \"defects\": -3,\r\n  \"defender\": 2,\r\n  \"defenders\": 2,\r\n  \"defenseless\": -2,\r\n  \"defer\": -1,\r\n  \"deferring\": -1,\r\n  \"defiant\": -1,\r\n  \"deficit\": -2,\r\n  \"degrade\": -2,\r\n  \"degraded\": -2,\r\n  \"degrades\": -2,\r\n  \"dehumanize\": -2,\r\n  \"dehumanized\": -2,\r\n  \"dehumanizes\": -2,\r\n  \"dehumanizing\": -2,\r\n  \"deject\": -2,\r\n  \"dejected\": -2,\r\n  \"dejecting\": -2,\r\n  \"dejects\": -2,\r\n  \"delay\": -1,\r\n  \"delayed\": -1,\r\n  \"delight\": 3,\r\n  \"delighted\": 3,\r\n  \"delighting\": 3,\r\n  \"delights\": 3,\r\n  \"demand\": -1,\r\n  \"demanded\": -1,\r\n  \"demanding\": -1,\r\n  \"demands\": -1,\r\n  \"demonstration\": -1,\r\n  \"demoralized\": -2,\r\n  \"denied\": -2,\r\n  \"denier\": -2,\r\n  \"deniers\": -2,\r\n  \"denies\": -2,\r\n  \"denounce\": -2,\r\n  \"denounces\": -2,\r\n  \"deny\": -2,\r\n  \"denying\": -2,\r\n  \"depressed\": -2,\r\n  \"depressing\": -2,\r\n  \"derail\": -2,\r\n  \"derailed\": -2,\r\n  \"derails\": -2,\r\n  \"deride\": -2,\r\n  \"derided\": -2,\r\n  \"derides\": -2,\r\n  \"deriding\": -2,\r\n  \"derision\": -2,\r\n  \"desirable\": 2,\r\n  \"desire\": 1,\r\n  \"desired\": 2,\r\n  \"desirous\": 2,\r\n  \"damage\": -3,\r\n  \"despairing\": -3,\r\n  \"despairs\": -3,\r\n  \"desperate\": -3,\r\n  \"desperately\": -3,\r\n  \"despondent\": -3,\r\n  \"destroy\": -3,\r\n  \"destroyed\": -3,\r\n  \"destroying\": -3,\r\n  \"destroys\": -3,\r\n  \"destruction\": -3,\r\n  \"destructive\": -3,\r\n  \"detached\": -1,\r\n  \"detain\": -2,\r\n  \"detained\": -2,\r\n  \"detention\": -2,\r\n  \"determined\": 2,\r\n  \"devastate\": -2,\r\n  \"devastated\": -2,\r\n  \"devastating\": -2,\r\n  \"devoted\": 3,\r\n  \"diamond\": 1,\r\n  \"dick\": -4,\r\n  \"dickhead\": -4,\r\n  \"die\": -3,\r\n  \"died\": -3,\r\n  \"difficult\": -1,\r\n  \"diffident\": -2,\r\n  \"dilemma\": -1,\r\n  \"dipshit\": -3,\r\n  \"dire\": -3,\r\n  \"direful\": -3,\r\n  \"dirt\": -2,\r\n  \"dirtier\": -2,\r\n  \"dirtiest\": -2,\r\n  \"dirty\": -2,\r\n  \"disabling\": -1,\r\n  \"disadvantage\": -2,\r\n  \"disadvantaged\": -2,\r\n  \"disappear\": -1,\r\n  \"disappeared\": -1,\r\n  \"disappears\": -1,\r\n  \"disappoint\": -2,\r\n  \"disappointed\": -2,\r\n  \"disappointing\": -2,\r\n  \"disappointment\": -2,\r\n  \"disappointments\": -2,\r\n  \"disappoints\": -2,\r\n  \"disaster\": -2,\r\n  \"disasters\": -2,\r\n  \"disastrous\": -3,\r\n  \"disbelieve\": -2,\r\n  \"discard\": -1,\r\n  \"discarded\": -1,\r\n  \"discarding\": -1,\r\n  \"discards\": -1,\r\n  \"disconsolate\": -2,\r\n  \"disconsolation\": -2,\r\n  \"discontented\": -2,\r\n  \"discord\": -2,\r\n  \"discounted\": -1,\r\n  \"discouraged\": -2,\r\n  \"discredited\": -2,\r\n  \"disdain\": -2,\r\n  \"disgrace\": -2,\r\n  \"disgraced\": -2,\r\n  \"disguise\": -1,\r\n  \"disguised\": -1,\r\n  \"disguises\": -1,\r\n  \"disguising\": -1,\r\n  \"disgust\": -3,\r\n  \"disgusted\": -3,\r\n  \"disgusting\": -3,\r\n  \"disheartened\": -2,\r\n  \"dishonest\": -2,\r\n  \"disillusioned\": -2,\r\n  \"disinclined\": -2,\r\n  \"disjointed\": -2,\r\n  \"dislike\": -2,\r\n  \"dismal\": -2,\r\n  \"dismayed\": -2,\r\n  \"disorder\": -2,\r\n  \"disorganized\": -2,\r\n  \"disoriented\": -2,\r\n  \"disparage\": -2,\r\n  \"disparaged\": -2,\r\n  \"disparages\": -2,\r\n  \"disparaging\": -2,\r\n  \"displeased\": -2,\r\n  \"dispute\": -2,\r\n  \"disputed\": -2,\r\n  \"disputes\": -2,\r\n  \"disputing\": -2,\r\n  \"disqualified\": -2,\r\n  \"disquiet\": -2,\r\n  \"disregard\": -2,\r\n  \"disregarded\": -2,\r\n  \"disregarding\": -2,\r\n  \"disregards\": -2,\r\n  \"disrespect\": -2,\r\n  \"disrespected\": -2,\r\n  \"disruption\": -2,\r\n  \"disruptions\": -2,\r\n  \"disruptive\": -2,\r\n  \"dissatisfied\": -2,\r\n  \"distort\": -2,\r\n  \"distorted\": -2,\r\n  \"distorting\": -2,\r\n  \"distorts\": -2,\r\n  \"distract\": -2,\r\n  \"distracted\": -2,\r\n  \"distraction\": -2,\r\n  \"distracts\": -2,\r\n  \"distress\": -2,\r\n  \"distressed\": -2,\r\n  \"distresses\": -2,\r\n  \"distressing\": -2,\r\n  \"distrust\": -3,\r\n  \"distrustful\": -3,\r\n  \"disturb\": -2,\r\n  \"disturbed\": -2,\r\n  \"disturbing\": -2,\r\n  \"disturbs\": -2,\r\n  \"dithering\": -2,\r\n  \"dizzy\": -1,\r\n  \"dodging\": -2,\r\n  \"dodgy\": -2,\r\n  \"does not work\": -3,\r\n  \"dolorous\": -2,\r\n  \"dont like\": -2,\r\n  \"doom\": -2,\r\n  \"doomed\": -2,\r\n  \"doubt\": -1,\r\n  \"doubted\": -1,\r\n  \"doubtful\": -1,\r\n  \"doubting\": -1,\r\n  \"doubts\": -1,\r\n  \"douche\": -3,\r\n  \"douchebag\": -3,\r\n  \"downcast\": -2,\r\n  \"downhearted\": -2,\r\n  \"downside\": -2,\r\n  \"drag\": -1,\r\n  \"dragged\": -1,\r\n  \"drags\": -1,\r\n  \"drained\": -2,\r\n  \"dread\": -2,\r\n  \"dreaded\": -2,\r\n  \"dreadful\": -3,\r\n  \"dreading\": -2,\r\n  \"dream\": 1,\r\n  \"dreams\": 1,\r\n  \"dreary\": -2,\r\n  \"droopy\": -2,\r\n  \"drop\": -1,\r\n  \"drown\": -2,\r\n  \"drowned\": -2,\r\n  \"drowns\": -2,\r\n  \"drunk\": -2,\r\n  \"dubious\": -2,\r\n  \"dud\": -2,\r\n  \"dull\": -2,\r\n  \"dumb\": -3,\r\n  \"dumbass\": -3,\r\n  \"dump\": -1,\r\n  \"dumped\": -2,\r\n  \"dumps\": -1,\r\n  \"dupe\": -2,\r\n  \"duped\": -2,\r\n  \"dysfunction\": -2,\r\n  \"despair\": -3,\r\n  \"eager\": 2,\r\n  \"ease\": 2,\r\n  \"easy\": 1,\r\n  \"ecstatic\": 4,\r\n  \"eerie\": -2,\r\n  \"eery\": -2,\r\n  \"effective\": 2,\r\n  \"effectively\": 2,\r\n  \"elated\": 3,\r\n  \"elation\": 3,\r\n  \"elegant\": 2,\r\n  \"elegantly\": 2,\r\n  \"embarrass\": -2,\r\n  \"embarrassed\": -2,\r\n  \"embarrasses\": -2,\r\n  \"embarrassing\": -2,\r\n  \"embarrassment\": -2,\r\n  \"embittered\": -2,\r\n  \"embrace\": 1,\r\n  \"emergency\": -2,\r\n  \"empathetic\": 2,\r\n  \"emptiness\": -1,\r\n  \"empty\": -1,\r\n  \"enchanted\": 2,\r\n  \"encourage\": 2,\r\n  \"encouraged\": 2,\r\n  \"encouragement\": 2,\r\n  \"encourages\": 2,\r\n  \"endorse\": 2,\r\n  \"endorsed\": 2,\r\n  \"endorsement\": 2,\r\n  \"endorses\": 2,\r\n  \"enemies\": -2,\r\n  \"enemy\": -2,\r\n  \"energetic\": 2,\r\n  \"engage\": 1,\r\n  \"engages\": 1,\r\n  \"engrossed\": 1,\r\n  \"enjoy\": 2,\r\n  \"enjoying\": 2,\r\n  \"enjoys\": 2,\r\n  \"enlighten\": 2,\r\n  \"enlightened\": 2,\r\n  \"enlightening\": 2,\r\n  \"enlightens\": 2,\r\n  \"ennui\": -2,\r\n  \"enrage\": -2,\r\n  \"enraged\": -2,\r\n  \"enrages\": -2,\r\n  \"enraging\": -2,\r\n  \"enrapture\": 3,\r\n  \"enslave\": -2,\r\n  \"enslaved\": -2,\r\n  \"enslaves\": -2,\r\n  \"ensure\": 1,\r\n  \"ensuring\": 1,\r\n  \"enterprising\": 1,\r\n  \"entertaining\": 2,\r\n  \"enthral\": 3,\r\n  \"enthusiastic\": 3,\r\n  \"entitled\": 1,\r\n  \"entrusted\": 2,\r\n  \"envies\": -1,\r\n  \"envious\": -2,\r\n  \"envy\": -1,\r\n  \"envying\": -1,\r\n  \"erroneous\": -2,\r\n  \"error\": -2,\r\n  \"errors\": -2,\r\n  \"escape\": -1,\r\n  \"escapes\": -1,\r\n  \"escaping\": -1,\r\n  \"esteemed\": 2,\r\n  \"ethical\": 2,\r\n  \"euphoria\": 3,\r\n  \"euphoric\": 4,\r\n  \"eviction\": -1,\r\n  \"evil\": -3,\r\n  \"exaggerate\": -2,\r\n  \"exaggerated\": -2,\r\n  \"exaggerates\": -2,\r\n  \"exaggerating\": -2,\r\n  \"exasperated\": 2,\r\n  \"excellence\": 3,\r\n  \"excellent\": 3,\r\n  \"excite\": 3,\r\n  \"excited\": 3,\r\n  \"excitement\": 3,\r\n  \"exciting\": 3,\r\n  \"exclude\": -1,\r\n  \"excluded\": -2,\r\n  \"exclusion\": -1,\r\n  \"exclusive\": 2,\r\n  \"excuse\": -1,\r\n  \"exempt\": -1,\r\n  \"exhausted\": -2,\r\n  \"exhilarated\": 3,\r\n  \"exhilarates\": 3,\r\n  \"exhilarating\": 3,\r\n  \"exonerate\": 2,\r\n  \"exonerated\": 2,\r\n  \"exonerates\": 2,\r\n  \"exonerating\": 2,\r\n  \"expand\": 1,\r\n  \"expands\": 1,\r\n  \"expel\": -2,\r\n  \"expelled\": -2,\r\n  \"expelling\": -2,\r\n  \"expels\": -2,\r\n  \"exploit\": -2,\r\n  \"exploited\": -2,\r\n  \"exploiting\": -2,\r\n  \"exploits\": -2,\r\n  \"exploration\": 1,\r\n  \"explorations\": 1,\r\n  \"expose\": -1,\r\n  \"exposed\": -1,\r\n  \"exposes\": -1,\r\n  \"exposing\": -1,\r\n  \"extend\": 1,\r\n  \"extends\": 1,\r\n  \"exuberant\": 4,\r\n  \"exultant\": 3,\r\n  \"exultantly\": 3,\r\n  \"earnest\": 2,\r\n  \"fad\": -2,\r\n  \"fraudster\": -4,\r\n  \"faggot\": -3,\r\n  \"faggots\": -3,\r\n  \"fail\": -2,\r\n  \"failed\": -2,\r\n  \"failing\": -2,\r\n  \"fails\": -2,\r\n  \"failure\": -2,\r\n  \"failures\": -2,\r\n  \"fainthearted\": -2,\r\n  \"fair\": 2,\r\n  \"faith\": 1,\r\n  \"faithful\": 3,\r\n  \"fake\": -3,\r\n  \"fakes\": -3,\r\n  \"faking\": -3,\r\n  \"fallen\": -2,\r\n  \"falling\": -1,\r\n  \"falsified\": -3,\r\n  \"falsify\": -3,\r\n  \"fame\": 1,\r\n  \"fan\": 3,\r\n  \"fantastic\": 4,\r\n  \"farce\": -1,\r\n  \"fascinate\": 3,\r\n  \"fascinated\": 3,\r\n  \"fascinates\": 3,\r\n  \"fascinating\": 3,\r\n  \"fascist\": -2,\r\n  \"fascists\": -2,\r\n  \"fatalities\": -3,\r\n  \"fatality\": -3,\r\n  \"fatigue\": -2,\r\n  \"fatigued\": -2,\r\n  \"fatigues\": -2,\r\n  \"fatiguing\": -2,\r\n  \"favor\": 2,\r\n  \"favored\": 2,\r\n  \"favorite\": 2,\r\n  \"favorited\": 2,\r\n  \"favorites\": 2,\r\n  \"favors\": 2,\r\n  \"fear\": -2,\r\n  \"fearful\": -2,\r\n  \"fearing\": -2,\r\n  \"fearless\": 2,\r\n  \"fearsome\": -2,\r\n  \"fed up\": -3,\r\n  \"feeble\": -2,\r\n  \"feeling\": 1,\r\n  \"felonies\": -3,\r\n  \"felony\": -3,\r\n  \"fervent\": 2,\r\n  \"fervid\": 2,\r\n  \"festive\": 2,\r\n  \"fiasco\": -3,\r\n  \"fidgety\": -2,\r\n  \"fight\": -1,\r\n  \"fine\": 2,\r\n  \"fire\": -2,\r\n  \"fired\": -2,\r\n  \"firing\": -2,\r\n  \"fit\": 1,\r\n  \"fitness\": 1,\r\n  \"flagship\": 2,\r\n  \"flees\": -1,\r\n  \"flop\": -2,\r\n  \"flops\": -2,\r\n  \"flu\": -2,\r\n  \"flustered\": -2,\r\n  \"focused\": 2,\r\n  \"fond\": 2,\r\n  \"fondness\": 2,\r\n  \"fool\": -2,\r\n  \"foolish\": -2,\r\n  \"fools\": -2,\r\n  \"forced\": -1,\r\n  \"foreclosure\": -2,\r\n  \"foreclosures\": -2,\r\n  \"forget\": -1,\r\n  \"forgetful\": -2,\r\n  \"forgive\": 1,\r\n  \"forgiving\": 1,\r\n  \"forgotten\": -1,\r\n  \"fortunate\": 2,\r\n  \"frantic\": -1,\r\n  \"fraud\": -4,\r\n  \"frauds\": -4,\r\n  \"fabulous\": 4,\r\n  \"fraudsters\": -4,\r\n  \"fraudulence\": -4,\r\n  \"fraudulent\": -4,\r\n  \"free\": 1,\r\n  \"freedom\": 2,\r\n  \"frenzy\": -3,\r\n  \"fresh\": 1,\r\n  \"friendly\": 2,\r\n  \"fright\": -2,\r\n  \"frightened\": -2,\r\n  \"frightening\": -3,\r\n  \"frikin\": -2,\r\n  \"frisky\": 2,\r\n  \"frowning\": -1,\r\n  \"frustrate\": -2,\r\n  \"frustrated\": -2,\r\n  \"frustrates\": -2,\r\n  \"frustrating\": -2,\r\n  \"frustration\": -2,\r\n  \"ftw\": 3,\r\n  \"fuck\": -4,\r\n  \"fucked\": -4,\r\n  \"fucker\": -4,\r\n  \"fuckers\": -4,\r\n  \"fuckface\": -4,\r\n  \"fuckhead\": -4,\r\n  \"fucking\": -4,\r\n  \"fucktard\": -4,\r\n  \"fud\": -3,\r\n  \"fuked\": -4,\r\n  \"fuking\": -4,\r\n  \"fulfill\": 2,\r\n  \"fulfilled\": 2,\r\n  \"fulfills\": 2,\r\n  \"fuming\": -2,\r\n  \"fun\": 4,\r\n  \"funeral\": -1,\r\n  \"funerals\": -1,\r\n  \"funky\": 2,\r\n  \"funnier\": 4,\r\n  \"funny\": 4,\r\n  \"furious\": -3,\r\n  \"futile\": 2,\r\n  \"fag\": -3,\r\n  \"gagged\": -2,\r\n  \"gloom\": -1,\r\n  \"gained\": 2,\r\n  \"gaining\": 2,\r\n  \"gains\": 2,\r\n  \"gallant\": 3,\r\n  \"gallantly\": 3,\r\n  \"gallantry\": 3,\r\n  \"generous\": 2,\r\n  \"genial\": 3,\r\n  \"ghost\": -1,\r\n  \"giddy\": -2,\r\n  \"gift\": 2,\r\n  \"glad\": 3,\r\n  \"glamorous\": 3,\r\n  \"glamourous\": 3,\r\n  \"glee\": 3,\r\n  \"gleeful\": 3,\r\n  \"gag\": -2,\r\n  \"gloomy\": -2,\r\n  \"glorious\": 2,\r\n  \"glory\": 2,\r\n  \"glum\": -2,\r\n  \"god\": 1,\r\n  \"goddamn\": -3,\r\n  \"godsend\": 4,\r\n  \"good\": 3,\r\n  \"goodness\": 3,\r\n  \"grace\": 1,\r\n  \"gracious\": 3,\r\n  \"grand\": 3,\r\n  \"grant\": 1,\r\n  \"granted\": 1,\r\n  \"granting\": 1,\r\n  \"grants\": 1,\r\n  \"grateful\": 3,\r\n  \"gratification\": 2,\r\n  \"grave\": -2,\r\n  \"gray\": -1,\r\n  \"great\": 3,\r\n  \"greater\": 3,\r\n  \"greatest\": 3,\r\n  \"greed\": -3,\r\n  \"greedy\": -2,\r\n  \"green wash\": -3,\r\n  \"green washing\": -3,\r\n  \"greenwash\": -3,\r\n  \"greenwasher\": -3,\r\n  \"greenwashers\": -3,\r\n  \"greenwashing\": -3,\r\n  \"greet\": 1,\r\n  \"greeted\": 1,\r\n  \"greeting\": 1,\r\n  \"greetings\": 2,\r\n  \"greets\": 1,\r\n  \"grey\": -1,\r\n  \"grief\": -2,\r\n  \"grieved\": -2,\r\n  \"gross\": -2,\r\n  \"growing\": 1,\r\n  \"growth\": 2,\r\n  \"guarantee\": 1,\r\n  \"guilt\": -3,\r\n  \"guilty\": -3,\r\n  \"gullibility\": -2,\r\n  \"gullible\": -2,\r\n  \"gun\": -1,\r\n  \"gain\": 2,\r\n  \"hid\": -1,\r\n  \"hacked\": -1,\r\n  \"hahaha\": 3,\r\n  \"hahahah\": 3,\r\n  \"hail\": 2,\r\n  \"hailed\": 2,\r\n  \"hapless\": -2,\r\n  \"haplessness\": -2,\r\n  \"happiness\": 3,\r\n  \"happy\": 3,\r\n  \"hard\": -1,\r\n  \"hardier\": 2,\r\n  \"hardship\": -2,\r\n  \"hardy\": 2,\r\n  \"harm\": -2,\r\n  \"harmed\": -2,\r\n  \"harmful\": -2,\r\n  \"ha\": 2,\r\n  \"harms\": -2,\r\n  \"harried\": -2,\r\n  \"harsh\": -2,\r\n  \"harsher\": -2,\r\n  \"harshest\": -2,\r\n  \"hate\": -3,\r\n  \"hated\": -3,\r\n  \"haters\": -3,\r\n  \"hates\": -3,\r\n  \"hating\": -3,\r\n  \"haunt\": -1,\r\n  \"haunted\": -2,\r\n  \"haunting\": 1,\r\n  \"haunts\": -1,\r\n  \"havoc\": -2,\r\n  \"healthy\": 2,\r\n  \"heartbreaking\": -3,\r\n  \"heartbroken\": -3,\r\n  \"heartfelt\": 3,\r\n  \"heaven\": 2,\r\n  \"heavenly\": 4,\r\n  \"heavyhearted\": -2,\r\n  \"hell\": -4,\r\n  \"help\": 2,\r\n  \"helpful\": 2,\r\n  \"helping\": 2,\r\n  \"helpless\": -2,\r\n  \"helps\": 2,\r\n  \"hero\": 2,\r\n  \"heroes\": 2,\r\n  \"heroic\": 3,\r\n  \"hesitant\": -2,\r\n  \"hesitate\": -2,\r\n  \"haha\": 3,\r\n  \"hide\": -1,\r\n  \"hides\": -1,\r\n  \"hiding\": -1,\r\n  \"highlight\": 2,\r\n  \"hilarious\": 2,\r\n  \"hindrance\": -2,\r\n  \"hoax\": -2,\r\n  \"homesick\": -2,\r\n  \"honest\": 2,\r\n  \"honor\": 2,\r\n  \"honored\": 2,\r\n  \"honoring\": 2,\r\n  \"honour\": 2,\r\n  \"honoured\": 2,\r\n  \"honouring\": 2,\r\n  \"hooligan\": -2,\r\n  \"hooliganism\": -2,\r\n  \"hooligans\": -2,\r\n  \"hope\": 2,\r\n  \"hopeful\": 2,\r\n  \"hopefully\": 2,\r\n  \"hopeless\": -2,\r\n  \"hopelessness\": -2,\r\n  \"hopes\": 2,\r\n  \"hoping\": 2,\r\n  \"horrendous\": -3,\r\n  \"horrible\": -3,\r\n  \"horrific\": -3,\r\n  \"horrified\": -3,\r\n  \"hostile\": -2,\r\n  \"huckster\": -2,\r\n  \"hug\": 2,\r\n  \"huge\": 1,\r\n  \"hugs\": 2,\r\n  \"humerous\": 3,\r\n  \"humiliated\": -3,\r\n  \"humiliation\": -3,\r\n  \"humor\": 2,\r\n  \"humorous\": 2,\r\n  \"humour\": 2,\r\n  \"humourous\": 2,\r\n  \"hunger\": -2,\r\n  \"hurrah\": 5,\r\n  \"hurt\": -2,\r\n  \"hurting\": -2,\r\n  \"hurts\": -2,\r\n  \"hypocritical\": -2,\r\n  \"hysteria\": -3,\r\n  \"hysterical\": -3,\r\n  \"hysterics\": -3,\r\n  \"harming\": -2,\r\n  \"idiot\": -3,\r\n  \"idiotic\": -3,\r\n  \"ignorance\": -2,\r\n  \"ignorant\": -2,\r\n  \"ignore\": -1,\r\n  \"ignored\": -2,\r\n  \"ignores\": -1,\r\n  \"ill\": -2,\r\n  \"illegal\": -3,\r\n  \"illiteracy\": -2,\r\n  \"illness\": -2,\r\n  \"illnesses\": -2,\r\n  \"imbecile\": -3,\r\n  \"immobilized\": -1,\r\n  \"immortal\": 2,\r\n  \"immune\": 1,\r\n  \"impatient\": -2,\r\n  \"imperfect\": -2,\r\n  \"importance\": 2,\r\n  \"important\": 2,\r\n  \"impose\": -1,\r\n  \"imposed\": -1,\r\n  \"imposes\": -1,\r\n  \"imposing\": -1,\r\n  \"impotent\": -2,\r\n  \"impress\": 3,\r\n  \"impressed\": 3,\r\n  \"impresses\": 3,\r\n  \"impressive\": 3,\r\n  \"imprisoned\": -2,\r\n  \"improve\": 2,\r\n  \"improved\": 2,\r\n  \"improvement\": 2,\r\n  \"improves\": 2,\r\n  \"improving\": 2,\r\n  \"inability\": -2,\r\n  \"inaction\": -2,\r\n  \"inadequate\": -2,\r\n  \"incapable\": -2,\r\n  \"incapacitated\": -2,\r\n  \"incensed\": -2,\r\n  \"incompetence\": -2,\r\n  \"incompetent\": -2,\r\n  \"inconsiderate\": -2,\r\n  \"inconvenience\": -2,\r\n  \"inconvenient\": -2,\r\n  \"increase\": 1,\r\n  \"increased\": 1,\r\n  \"indecisive\": -2,\r\n  \"indestructible\": 2,\r\n  \"indifference\": -2,\r\n  \"indifferent\": -2,\r\n  \"indignant\": -2,\r\n  \"indignation\": -2,\r\n  \"indoctrinate\": -2,\r\n  \"indoctrinated\": -2,\r\n  \"indoctrinates\": -2,\r\n  \"indoctrinating\": -2,\r\n  \"ineffective\": -2,\r\n  \"ineffectively\": -2,\r\n  \"infatuated\": 2,\r\n  \"infatuation\": 2,\r\n  \"infected\": -2,\r\n  \"inferior\": -2,\r\n  \"inflamed\": -2,\r\n  \"influential\": 2,\r\n  \"infringement\": -2,\r\n  \"infuriate\": -2,\r\n  \"infuriated\": -2,\r\n  \"infuriates\": -2,\r\n  \"infuriating\": -2,\r\n  \"inhibit\": -1,\r\n  \"injured\": -2,\r\n  \"injury\": -2,\r\n  \"injustice\": -2,\r\n  \"innovate\": 1,\r\n  \"innovates\": 1,\r\n  \"innovation\": 1,\r\n  \"innovative\": 2,\r\n  \"inquisition\": -2,\r\n  \"inquisitive\": 2,\r\n  \"insane\": -2,\r\n  \"insanity\": -2,\r\n  \"insecure\": -2,\r\n  \"insensitive\": -2,\r\n  \"insensitivity\": -2,\r\n  \"insignificant\": -2,\r\n  \"insipid\": -2,\r\n  \"inspiration\": 2,\r\n  \"inspirational\": 2,\r\n  \"inspire\": 2,\r\n  \"inspired\": 2,\r\n  \"inspires\": 2,\r\n  \"inspiring\": 3,\r\n  \"insult\": -2,\r\n  \"insulted\": -2,\r\n  \"insulting\": -2,\r\n  \"insults\": -2,\r\n  \"intact\": 2,\r\n  \"integrity\": 2,\r\n  \"intelligent\": 2,\r\n  \"intense\": 1,\r\n  \"interest\": 1,\r\n  \"interested\": 2,\r\n  \"interesting\": 2,\r\n  \"interests\": 1,\r\n  \"interrogated\": -2,\r\n  \"interrupt\": -2,\r\n  \"interrupted\": -2,\r\n  \"interrupting\": -2,\r\n  \"interruption\": -2,\r\n  \"interrupts\": -2,\r\n  \"intimidate\": -2,\r\n  \"intimidated\": -2,\r\n  \"intimidates\": -2,\r\n  \"intimidating\": -2,\r\n  \"intimidation\": -2,\r\n  \"intricate\": 2,\r\n  \"intrigues\": 1,\r\n  \"invincible\": 2,\r\n  \"invite\": 1,\r\n  \"inviting\": 1,\r\n  \"invulnerable\": 2,\r\n  \"irate\": -3,\r\n  \"ironic\": -1,\r\n  \"irony\": -1,\r\n  \"irrational\": -1,\r\n  \"irresistible\": 2,\r\n  \"irresolute\": -2,\r\n  \"irresponsible\": 2,\r\n  \"irreversible\": -1,\r\n  \"irritate\": -3,\r\n  \"irritated\": -3,\r\n  \"irritating\": -3,\r\n  \"isolated\": -1,\r\n  \"itchy\": -2,\r\n  \"jackass\": -4,\r\n  \"jackasses\": -4,\r\n  \"jaunty\": 2,\r\n  \"jealous\": -2,\r\n  \"jeopardy\": -2,\r\n  \"jerk\": -3,\r\n  \"jesus\": 1,\r\n  \"jewel\": 1,\r\n  \"jewels\": 1,\r\n  \"jocular\": 2,\r\n  \"join\": 1,\r\n  \"joke\": 2,\r\n  \"jokes\": 2,\r\n  \"jolly\": 2,\r\n  \"jovial\": 2,\r\n  \"joy\": 3,\r\n  \"joyful\": 3,\r\n  \"joyfully\": 3,\r\n  \"joyless\": -2,\r\n  \"joyous\": 3,\r\n  \"jubilant\": 3,\r\n  \"jumpy\": -1,\r\n  \"justice\": 2,\r\n  \"justifiably\": 2,\r\n  \"justified\": 2,\r\n  \"jailed\": -2,\r\n  \"kill\": -3,\r\n  \"killed\": -3,\r\n  \"kills\": -3,\r\n  \"kind\": 2,\r\n  \"kinder\": 2,\r\n  \"kiss\": 2,\r\n  \"kudos\": 3,\r\n  \"keen\": 1,\r\n  \"killing\": -3,\r\n  \"loathe\": -3,\r\n  \"lag\": -1,\r\n  \"lags\": -2,\r\n  \"lame\": -2,\r\n  \"landmark\": 2,\r\n  \"laugh\": 1,\r\n  \"laughed\": 1,\r\n  \"laughing\": 1,\r\n  \"laughs\": 1,\r\n  \"laughting\": 1,\r\n  \"launched\": 1,\r\n  \"lawl\": 3,\r\n  \"lawsuit\": -2,\r\n  \"lawsuits\": -2,\r\n  \"lazy\": -1,\r\n  \"leak\": -1,\r\n  \"leaked\": -1,\r\n  \"leave\": -1,\r\n  \"legal\": 1,\r\n  \"legally\": 1,\r\n  \"lenient\": 1,\r\n  \"lethargic\": -2,\r\n  \"lethargy\": -2,\r\n  \"liar\": -3,\r\n  \"liars\": -3,\r\n  \"libelous\": -2,\r\n  \"lied\": -2,\r\n  \"lifesaver\": 4,\r\n  \"lighthearted\": 1,\r\n  \"like\": 2,\r\n  \"liked\": 2,\r\n  \"likes\": 2,\r\n  \"limitation\": -1,\r\n  \"limited\": -1,\r\n  \"limits\": -1,\r\n  \"litigation\": -1,\r\n  \"litigious\": -2,\r\n  \"lively\": 2,\r\n  \"livid\": -2,\r\n  \"lmao\": 4,\r\n  \"lmfao\": 4,\r\n  \"lagging\": -2,\r\n  \"loathed\": -3,\r\n  \"loathes\": -3,\r\n  \"loathing\": -3,\r\n  \"lobby\": -2,\r\n  \"lobbying\": -2,\r\n  \"lol\": 3,\r\n  \"lonely\": -2,\r\n  \"lonesome\": -2,\r\n  \"longing\": -1,\r\n  \"loom\": -1,\r\n  \"loomed\": -1,\r\n  \"looming\": -1,\r\n  \"looms\": -1,\r\n  \"loose\": -3,\r\n  \"looses\": -3,\r\n  \"loser\": -3,\r\n  \"losing\": -3,\r\n  \"loss\": -3,\r\n  \"lost\": -3,\r\n  \"lovable\": 3,\r\n  \"love\": 3,\r\n  \"loved\": 3,\r\n  \"lovelies\": 3,\r\n  \"lovely\": 3,\r\n  \"loving\": 2,\r\n  \"lowest\": -1,\r\n  \"loyal\": 3,\r\n  \"loyalty\": 3,\r\n  \"luck\": 3,\r\n  \"luckily\": 3,\r\n  \"lucky\": 3,\r\n  \"lugubrious\": -2,\r\n  \"lunatic\": -3,\r\n  \"lunatics\": -3,\r\n  \"lurk\": -1,\r\n  \"lurking\": -1,\r\n  \"lurks\": -1,\r\n  \"lackadaisical\": -2,\r\n  \"lagged\": -2,\r\n  \"lack\": -2,\r\n  \"made-up\": -1,\r\n  \"madly\": -3,\r\n  \"madness\": -3,\r\n  \"mandatory\": -1,\r\n  \"manipulated\": -1,\r\n  \"manipulating\": -1,\r\n  \"manipulation\": -1,\r\n  \"marvel\": 3,\r\n  \"marvelous\": 3,\r\n  \"marvels\": 3,\r\n  \"masterpiece\": 4,\r\n  \"masterpieces\": 4,\r\n  \"matter\": 1,\r\n  \"matters\": 1,\r\n  \"mature\": 2,\r\n  \"meaningful\": 2,\r\n  \"meaningless\": -2,\r\n  \"medal\": 3,\r\n  \"mediocrity\": -3,\r\n  \"meditative\": 1,\r\n  \"melancholy\": -2,\r\n  \"menace\": -2,\r\n  \"menaced\": -2,\r\n  \"mercy\": 2,\r\n  \"mad\": -3,\r\n  \"mess\": -2,\r\n  \"messed\": -2,\r\n  \"messing up\": -2,\r\n  \"methodical\": 2,\r\n  \"mindless\": -2,\r\n  \"miracle\": 4,\r\n  \"mirth\": 3,\r\n  \"mirthful\": 3,\r\n  \"mirthfully\": 3,\r\n  \"misbehave\": -2,\r\n  \"misbehaved\": -2,\r\n  \"misbehaves\": -2,\r\n  \"misbehaving\": -2,\r\n  \"mischief\": -1,\r\n  \"mischiefs\": -1,\r\n  \"miserable\": -3,\r\n  \"misery\": -2,\r\n  \"misgiving\": -2,\r\n  \"misinformation\": -2,\r\n  \"misinformed\": -2,\r\n  \"misinterpreted\": -2,\r\n  \"misleading\": -3,\r\n  \"misread\": -1,\r\n  \"misreporting\": -2,\r\n  \"misrepresentation\": -2,\r\n  \"miss\": -2,\r\n  \"missed\": -2,\r\n  \"missing\": -2,\r\n  \"mistake\": -2,\r\n  \"mistaken\": -2,\r\n  \"mistakes\": -2,\r\n  \"mistaking\": -2,\r\n  \"misunderstand\": -2,\r\n  \"misunderstanding\": -2,\r\n  \"misunderstands\": -2,\r\n  \"misunderstood\": -2,\r\n  \"moan\": -2,\r\n  \"moaned\": -2,\r\n  \"moaning\": -2,\r\n  \"moans\": -2,\r\n  \"mock\": -2,\r\n  \"mocked\": -2,\r\n  \"mocking\": -2,\r\n  \"mocks\": -2,\r\n  \"mongering\": -2,\r\n  \"monopolize\": -2,\r\n  \"monopolized\": -2,\r\n  \"monopolizes\": -2,\r\n  \"monopolizing\": -2,\r\n  \"moody\": -1,\r\n  \"mope\": -1,\r\n  \"moping\": -1,\r\n  \"moron\": -3,\r\n  \"motherfucker\": -5,\r\n  \"motherfucking\": -5,\r\n  \"motivate\": 1,\r\n  \"motivated\": 2,\r\n  \"motivating\": 2,\r\n  \"motivation\": 1,\r\n  \"mourn\": -2,\r\n  \"mourned\": -2,\r\n  \"mournful\": -2,\r\n  \"mourning\": -2,\r\n  \"mourns\": -2,\r\n  \"mumpish\": -2,\r\n  \"murder\": -2,\r\n  \"murderer\": -2,\r\n  \"murdering\": -3,\r\n  \"murderous\": -3,\r\n  \"murders\": -2,\r\n  \"myth\": -1,\r\n  \"maddening\": -3,\r\n  \"merry\": 3,\r\n  \"naive\": -2,\r\n  \"natural\": 1,\r\n  \"na�ve\": -2,\r\n  \"needy\": -2,\r\n  \"negative\": -2,\r\n  \"negativity\": -2,\r\n  \"neglect\": -2,\r\n  \"neglected\": -2,\r\n  \"neglecting\": -2,\r\n  \"neglects\": -2,\r\n  \"nerves\": -1,\r\n  \"nervous\": -2,\r\n  \"nervously\": -2,\r\n  \"nice\": 3,\r\n  \"nifty\": 2,\r\n  \"nasty\": -3,\r\n  \"nigger\": -5,\r\n  \"no\": -1,\r\n  \"no fun\": -3,\r\n  \"noble\": 2,\r\n  \"noisy\": -1,\r\n  \"nonsense\": -2,\r\n  \"noob\": -2,\r\n  \"nosey\": -2,\r\n  \"not good\": -2,\r\n  \"not working\": -3,\r\n  \"notorious\": -2,\r\n  \"novel\": 2,\r\n  \"numb\": -1,\r\n  \"nuts\": -3,\r\n  \"n00b\": -2,\r\n  \"niggas\": -5,\r\n  \"obliterated\": -2,\r\n  \"obnoxious\": -3,\r\n  \"obscene\": -2,\r\n  \"obsessed\": 2,\r\n  \"obsolete\": -2,\r\n  \"obstacle\": -2,\r\n  \"obstacles\": -2,\r\n  \"obstinate\": -2,\r\n  \"odd\": -2,\r\n  \"offend\": -2,\r\n  \"offended\": -2,\r\n  \"offender\": -2,\r\n  \"offending\": -2,\r\n  \"offends\": -2,\r\n  \"offline\": -1,\r\n  \"oks\": 2,\r\n  \"ominous\": 3,\r\n  \"once-in-a-lifetime\": 3,\r\n  \"opportunities\": 2,\r\n  \"opportunity\": 2,\r\n  \"oppressed\": -2,\r\n  \"oppressive\": -2,\r\n  \"optimism\": 2,\r\n  \"optimistic\": 2,\r\n  \"optionless\": -2,\r\n  \"outcry\": -2,\r\n  \"outmaneuvered\": -2,\r\n  \"outrage\": -3,\r\n  \"outraged\": -3,\r\n  \"outreach\": 2,\r\n  \"outstanding\": 5,\r\n  \"overjoyed\": 4,\r\n  \"overload\": -1,\r\n  \"overlooked\": -1,\r\n  \"overreact\": -2,\r\n  \"overreacted\": -2,\r\n  \"overreaction\": -2,\r\n  \"overreacts\": -2,\r\n  \"oversell\": -2,\r\n  \"overselling\": -2,\r\n  \"oversells\": -2,\r\n  \"oversimplification\": -2,\r\n  \"oversimplified\": -2,\r\n  \"oversimplifies\": -2,\r\n  \"oversimplify\": -2,\r\n  \"overstatement\": -2,\r\n  \"overstatements\": -2,\r\n  \"overweight\": -1,\r\n  \"oxymoron\": -1,\r\n  \"obliterate\": -2,\r\n  \"punished\": -2,\r\n  \"pained\": -2,\r\n  \"panicked\": -3,\r\n  \"pain\": -2,\r\n  \"paradise\": 3,\r\n  \"paradox\": -1,\r\n  \"pardon\": 2,\r\n  \"pardoned\": 2,\r\n  \"pardoning\": 2,\r\n  \"pardons\": 2,\r\n  \"parley\": -1,\r\n  \"passionate\": 2,\r\n  \"passive\": -1,\r\n  \"passively\": -1,\r\n  \"pathetic\": -2,\r\n  \"pay\": -1,\r\n  \"peace\": 2,\r\n  \"peaceful\": 2,\r\n  \"peacefully\": 2,\r\n  \"penalty\": -2,\r\n  \"pensive\": -1,\r\n  \"perfect\": 3,\r\n  \"perfected\": 2,\r\n  \"perfectly\": 3,\r\n  \"perfects\": 2,\r\n  \"peril\": -2,\r\n  \"perjury\": -3,\r\n  \"perpetrator\": -2,\r\n  \"perpetrators\": -2,\r\n  \"perplexed\": -2,\r\n  \"persecute\": -2,\r\n  \"persecuted\": -2,\r\n  \"persecutes\": -2,\r\n  \"persecuting\": -2,\r\n  \"perturbed\": -2,\r\n  \"pesky\": -2,\r\n  \"pessimism\": -2,\r\n  \"pessimistic\": -2,\r\n  \"petrified\": -2,\r\n  \"phobic\": -2,\r\n  \"picturesque\": 2,\r\n  \"pileup\": -1,\r\n  \"pique\": -2,\r\n  \"piqued\": -2,\r\n  \"piss\": -4,\r\n  \"pissed\": -4,\r\n  \"pissing\": -3,\r\n  \"piteous\": -2,\r\n  \"pitied\": -1,\r\n  \"pity\": -2,\r\n  \"playful\": 2,\r\n  \"pleasant\": 3,\r\n  \"please\": 1,\r\n  \"pleased\": 3,\r\n  \"pleasure\": 3,\r\n  \"poised\": -2,\r\n  \"poison\": -2,\r\n  \"poisoned\": -2,\r\n  \"poisons\": -2,\r\n  \"pollute\": -2,\r\n  \"polluted\": -2,\r\n  \"polluter\": -2,\r\n  \"polluters\": -2,\r\n  \"pollutes\": -2,\r\n  \"poor\": -2,\r\n  \"poorer\": -2,\r\n  \"poorest\": -2,\r\n  \"popular\": 3,\r\n  \"positive\": 2,\r\n  \"positively\": 2,\r\n  \"possessive\": -2,\r\n  \"postpone\": -1,\r\n  \"postponed\": -1,\r\n  \"postpones\": -1,\r\n  \"postponing\": -1,\r\n  \"poverty\": -1,\r\n  \"powerful\": 2,\r\n  \"powerless\": -2,\r\n  \"praise\": 3,\r\n  \"praised\": 3,\r\n  \"praises\": 3,\r\n  \"praising\": 3,\r\n  \"pray\": 1,\r\n  \"praying\": 1,\r\n  \"prays\": 1,\r\n  \"prblm\": -2,\r\n  \"prblms\": -2,\r\n  \"prepared\": 1,\r\n  \"pressure\": -1,\r\n  \"pressured\": -2,\r\n  \"pretend\": -1,\r\n  \"pretending\": -1,\r\n  \"pretends\": -1,\r\n  \"pretty\": 1,\r\n  \"prevent\": -1,\r\n  \"prevented\": -1,\r\n  \"preventing\": -1,\r\n  \"prevents\": -1,\r\n  \"prick\": -5,\r\n  \"prison\": -2,\r\n  \"prisoner\": -2,\r\n  \"prisoners\": -2,\r\n  \"privileged\": 2,\r\n  \"proactive\": 2,\r\n  \"problem\": -2,\r\n  \"problems\": -2,\r\n  \"profiteer\": -2,\r\n  \"progress\": 2,\r\n  \"prominent\": 2,\r\n  \"promise\": 1,\r\n  \"promised\": 1,\r\n  \"promises\": 1,\r\n  \"promote\": 1,\r\n  \"promoted\": 1,\r\n  \"promotes\": 1,\r\n  \"promoting\": 1,\r\n  \"propaganda\": -2,\r\n  \"prosecute\": -1,\r\n  \"prosecuted\": -2,\r\n  \"prosecutes\": -1,\r\n  \"prosecution\": -1,\r\n  \"prospect\": 1,\r\n  \"prospects\": 1,\r\n  \"prosperous\": 3,\r\n  \"protect\": 1,\r\n  \"protected\": 1,\r\n  \"protects\": 1,\r\n  \"protest\": -2,\r\n  \"protesters\": -2,\r\n  \"protesting\": -2,\r\n  \"protests\": -2,\r\n  \"proud\": 2,\r\n  \"proudly\": 2,\r\n  \"provoke\": -1,\r\n  \"provoked\": -1,\r\n  \"provokes\": -1,\r\n  \"provoking\": -1,\r\n  \"pseudoscience\": -3,\r\n  \"punish\": -2,\r\n  \"panic\": -3,\r\n  \"punishes\": -2,\r\n  \"punitive\": -2,\r\n  \"pushy\": -1,\r\n  \"puzzled\": -2,\r\n  \"panics\": -3,\r\n  \"quaking\": -2,\r\n  \"questioned\": -1,\r\n  \"questioning\": -1,\r\n  \"questionable\": -2,\r\n  \"resign\": -1,\r\n  \"racist\": -3,\r\n  \"rage\": -2,\r\n  \"rageful\": -2,\r\n  \"rainy\": -1,\r\n  \"rant\": -3,\r\n  \"ranter\": -3,\r\n  \"ranters\": -3,\r\n  \"rants\": -3,\r\n  \"rape\": -4,\r\n  \"rapist\": -4,\r\n  \"rapture\": 2,\r\n  \"raptured\": 2,\r\n  \"raptures\": 2,\r\n  \"rapturous\": 4,\r\n  \"rash\": -2,\r\n  \"ratified\": 2,\r\n  \"reach\": 1,\r\n  \"reached\": 1,\r\n  \"reaches\": 1,\r\n  \"reaching\": 1,\r\n  \"reassure\": 1,\r\n  \"reassured\": 1,\r\n  \"reassures\": 1,\r\n  \"reassuring\": 2,\r\n  \"rebellion\": -2,\r\n  \"recession\": -2,\r\n  \"reckless\": -2,\r\n  \"recommend\": 2,\r\n  \"recommended\": 2,\r\n  \"recommends\": 2,\r\n  \"redeemed\": 2,\r\n  \"refuse\": -2,\r\n  \"refused\": -2,\r\n  \"refusing\": -2,\r\n  \"regret\": -2,\r\n  \"regretful\": -2,\r\n  \"regrets\": -2,\r\n  \"regretted\": -2,\r\n  \"regretting\": -2,\r\n  \"reject\": -1,\r\n  \"rejected\": -1,\r\n  \"rejecting\": -1,\r\n  \"rejects\": -1,\r\n  \"rejoice\": 4,\r\n  \"rejoiced\": 4,\r\n  \"rejoices\": 4,\r\n  \"rejoicing\": 4,\r\n  \"relaxed\": 2,\r\n  \"relentless\": -1,\r\n  \"reliant\": 2,\r\n  \"relieve\": 1,\r\n  \"relieved\": 2,\r\n  \"relieves\": 1,\r\n  \"relieving\": 2,\r\n  \"relishing\": 2,\r\n  \"remarkable\": 2,\r\n  \"remorse\": -2,\r\n  \"repulse\": -1,\r\n  \"repulsed\": -2,\r\n  \"rescue\": 2,\r\n  \"rescued\": 2,\r\n  \"racism\": -3,\r\n  \"resentful\": -2,\r\n  \"racists\": -3,\r\n  \"resigned\": -1,\r\n  \"resigning\": -1,\r\n  \"resigns\": -1,\r\n  \"resolute\": 2,\r\n  \"resolve\": 2,\r\n  \"resolved\": 2,\r\n  \"resolves\": 2,\r\n  \"resolving\": 2,\r\n  \"respected\": 2,\r\n  \"responsible\": 2,\r\n  \"responsive\": 2,\r\n  \"restful\": 2,\r\n  \"restless\": -2,\r\n  \"restore\": 1,\r\n  \"restored\": 1,\r\n  \"restores\": 1,\r\n  \"restoring\": 1,\r\n  \"restrict\": -2,\r\n  \"restricted\": -2,\r\n  \"restricting\": -2,\r\n  \"restriction\": -2,\r\n  \"restricts\": -2,\r\n  \"retained\": -1,\r\n  \"retard\": -2,\r\n  \"retarded\": -2,\r\n  \"retreat\": -1,\r\n  \"revenge\": -2,\r\n  \"revengeful\": -2,\r\n  \"revered\": 2,\r\n  \"revive\": 2,\r\n  \"revives\": 2,\r\n  \"reward\": 2,\r\n  \"rewarded\": 2,\r\n  \"rewarding\": 2,\r\n  \"rewards\": 2,\r\n  \"rich\": 2,\r\n  \"ridiculous\": -3,\r\n  \"rig\": -1,\r\n  \"rigged\": -1,\r\n  \"right direction\": 3,\r\n  \"rigorous\": 3,\r\n  \"rigorously\": 3,\r\n  \"riot\": -2,\r\n  \"riots\": -2,\r\n  \"risk\": -2,\r\n  \"risks\": -2,\r\n  \"rob\": -2,\r\n  \"robber\": -2,\r\n  \"robed\": -2,\r\n  \"robing\": -2,\r\n  \"robs\": -2,\r\n  \"robust\": 2,\r\n  \"rofl\": 4,\r\n  \"roflcopter\": 4,\r\n  \"roflmao\": 4,\r\n  \"romance\": 2,\r\n  \"rotfl\": 4,\r\n  \"rotflmfao\": 4,\r\n  \"rotflol\": 4,\r\n  \"ruin\": -2,\r\n  \"ruined\": -2,\r\n  \"ruining\": -2,\r\n  \"ruins\": -2,\r\n  \"rescues\": 2,\r\n  \"sabotage\": -2,\r\n  \"sad\": -2,\r\n  \"sadden\": -2,\r\n  \"saddened\": -2,\r\n  \"sadly\": -2,\r\n  \"safe\": 1,\r\n  \"safely\": 1,\r\n  \"safety\": 1,\r\n  \"salient\": 1,\r\n  \"sappy\": -1,\r\n  \"sarcastic\": -2,\r\n  \"satisfied\": 2,\r\n  \"save\": 2,\r\n  \"saved\": 2,\r\n  \"scam\": -2,\r\n  \"scams\": -2,\r\n  \"scandal\": -3,\r\n  \"scandalous\": -3,\r\n  \"scandals\": -3,\r\n  \"scapegoat\": -2,\r\n  \"scapegoats\": -2,\r\n  \"scare\": -2,\r\n  \"scared\": -2,\r\n  \"scary\": -2,\r\n  \"sceptical\": -2,\r\n  \"scold\": -2,\r\n  \"scoop\": 3,\r\n  \"scorn\": -2,\r\n  \"scornful\": -2,\r\n  \"scream\": -2,\r\n  \"screamed\": -2,\r\n  \"screaming\": -2,\r\n  \"screams\": -2,\r\n  \"screwed\": -2,\r\n  \"screwed up\": -3,\r\n  \"scumbag\": -4,\r\n  \"secure\": 2,\r\n  \"secured\": 2,\r\n  \"secures\": 2,\r\n  \"sedition\": -2,\r\n  \"seditious\": -2,\r\n  \"seduced\": -1,\r\n  \"self-confident\": 2,\r\n  \"self-deluded\": -2,\r\n  \"selfish\": -3,\r\n  \"selfishness\": -3,\r\n  \"sentence\": -2,\r\n  \"sentenced\": -2,\r\n  \"sentences\": -2,\r\n  \"sentencing\": -2,\r\n  \"serene\": 2,\r\n  \"severe\": -2,\r\n  \"sexy\": 3,\r\n  \"shaky\": -2,\r\n  \"shame\": -2,\r\n  \"shamed\": -2,\r\n  \"shameful\": -2,\r\n  \"share\": 1,\r\n  \"shared\": 1,\r\n  \"shares\": 1,\r\n  \"shattered\": -2,\r\n  \"shit\": -4,\r\n  \"shithead\": -4,\r\n  \"shitty\": -3,\r\n  \"shock\": -2,\r\n  \"shocked\": -2,\r\n  \"shocking\": -2,\r\n  \"shocks\": -2,\r\n  \"shoot\": -1,\r\n  \"short-sighted\": -2,\r\n  \"short-sightedness\": -2,\r\n  \"shortage\": -2,\r\n  \"shortages\": -2,\r\n  \"shrew\": -4,\r\n  \"shy\": -1,\r\n  \"sick\": -2,\r\n  \"sigh\": -2,\r\n  \"significance\": 1,\r\n  \"significant\": 1,\r\n  \"silencing\": -1,\r\n  \"silly\": -1,\r\n  \"sincere\": 2,\r\n  \"sincerely\": 2,\r\n  \"sincerest\": 2,\r\n  \"sincerity\": 2,\r\n  \"sinful\": -3,\r\n  \"singleminded\": -2,\r\n  \"skeptic\": -2,\r\n  \"skeptical\": -2,\r\n  \"skepticism\": -2,\r\n  \"skeptics\": -2,\r\n  \"slam\": -2,\r\n  \"slash\": -2,\r\n  \"slashed\": -2,\r\n  \"slashes\": -2,\r\n  \"slashing\": -2,\r\n  \"slavery\": -3,\r\n  \"sleeplessness\": -2,\r\n  \"slick\": 2,\r\n  \"slicker\": 2,\r\n  \"slickest\": 2,\r\n  \"sluggish\": -2,\r\n  \"slut\": -5,\r\n  \"smart\": 1,\r\n  \"smarter\": 2,\r\n  \"smartest\": 2,\r\n  \"smear\": -2,\r\n  \"smile\": 2,\r\n  \"smiled\": 2,\r\n  \"smiles\": 2,\r\n  \"smiling\": 2,\r\n  \"smog\": -2,\r\n  \"sneaky\": -1,\r\n  \"snub\": -2,\r\n  \"snubbed\": -2,\r\n  \"snubbing\": -2,\r\n  \"snubs\": -2,\r\n  \"sobering\": 1,\r\n  \"solemn\": -1,\r\n  \"solid\": 2,\r\n  \"solidarity\": 2,\r\n  \"solution\": 1,\r\n  \"solutions\": 1,\r\n  \"solve\": 1,\r\n  \"solved\": 1,\r\n  \"solves\": 1,\r\n  \"solving\": 1,\r\n  \"somber\": -2,\r\n  \"some kind\": 0,\r\n  \"son-of-a-bitch\": -5,\r\n  \"soothe\": 3,\r\n  \"soothed\": 3,\r\n  \"soothing\": 3,\r\n  \"sophisticated\": 2,\r\n  \"sore\": -1,\r\n  \"sorrow\": -2,\r\n  \"sorrowful\": -2,\r\n  \"sorry\": -1,\r\n  \"spam\": -2,\r\n  \"spammer\": -3,\r\n  \"spammers\": -3,\r\n  \"spamming\": -2,\r\n  \"spark\": 1,\r\n  \"sparkle\": 3,\r\n  \"sparkles\": 3,\r\n  \"sparkling\": 3,\r\n  \"speculative\": -2,\r\n  \"spirit\": 1,\r\n  \"spirited\": 2,\r\n  \"spiritless\": -2,\r\n  \"spiteful\": -2,\r\n  \"splendid\": 3,\r\n  \"sprightly\": 2,\r\n  \"squelched\": -1,\r\n  \"stab\": -2,\r\n  \"stabbed\": -2,\r\n  \"stable\": 2,\r\n  \"stabs\": -2,\r\n  \"stall\": -2,\r\n  \"stalled\": -2,\r\n  \"stalling\": -2,\r\n  \"stamina\": 2,\r\n  \"stampede\": -2,\r\n  \"startled\": -2,\r\n  \"starve\": -2,\r\n  \"starved\": -2,\r\n  \"starves\": -2,\r\n  \"starving\": -2,\r\n  \"steadfast\": 2,\r\n  \"steal\": -2,\r\n  \"steals\": -2,\r\n  \"stereotype\": -2,\r\n  \"stereotyped\": -2,\r\n  \"stifled\": -1,\r\n  \"stimulate\": 1,\r\n  \"stimulated\": 1,\r\n  \"stimulates\": 1,\r\n  \"stimulating\": 2,\r\n  \"stingy\": -2,\r\n  \"stolen\": -2,\r\n  \"stop\": -1,\r\n  \"stopped\": -1,\r\n  \"stopping\": -1,\r\n  \"stops\": -1,\r\n  \"stout\": 2,\r\n  \"straight\": 1,\r\n  \"strange\": -1,\r\n  \"strangely\": -1,\r\n  \"strangled\": -2,\r\n  \"strength\": 2,\r\n  \"strengthen\": 2,\r\n  \"strengthened\": 2,\r\n  \"strengthening\": 2,\r\n  \"strengthens\": 2,\r\n  \"stressed\": -2,\r\n  \"stressor\": -2,\r\n  \"stressors\": -2,\r\n  \"stricken\": -2,\r\n  \"strike\": -1,\r\n  \"strikers\": -2,\r\n  \"strikes\": -1,\r\n  \"strong\": 2,\r\n  \"stronger\": 2,\r\n  \"strongest\": 2,\r\n  \"struck\": -1,\r\n  \"struggle\": -2,\r\n  \"struggled\": -2,\r\n  \"struggles\": -2,\r\n  \"struggling\": -2,\r\n  \"stubborn\": -2,\r\n  \"stuck\": -2,\r\n  \"stunned\": -2,\r\n  \"stunning\": 4,\r\n  \"stupid\": -2,\r\n  \"stupidly\": -2,\r\n  \"suave\": 2,\r\n  \"substantial\": 1,\r\n  \"substantially\": 1,\r\n  \"subversive\": -2,\r\n  \"success\": 2,\r\n  \"successful\": 3,\r\n  \"suck\": -3,\r\n  \"sucks\": -3,\r\n  \"suffer\": -2,\r\n  \"suffering\": -2,\r\n  \"suffers\": -2,\r\n  \"suicidal\": -2,\r\n  \"suicide\": -2,\r\n  \"suing\": -2,\r\n  \"sulking\": -2,\r\n  \"sulky\": -2,\r\n  \"sullen\": -2,\r\n  \"sunshine\": 2,\r\n  \"super\": 3,\r\n  \"superb\": 5,\r\n  \"superior\": 2,\r\n  \"support\": 2,\r\n  \"supported\": 2,\r\n  \"supporter\": 1,\r\n  \"supporters\": 1,\r\n  \"supporting\": 1,\r\n  \"supportive\": 2,\r\n  \"supports\": 2,\r\n  \"survived\": 2,\r\n  \"surviving\": 2,\r\n  \"survivor\": 2,\r\n  \"suspect\": -1,\r\n  \"suspected\": -1,\r\n  \"suspecting\": -1,\r\n  \"suspects\": -1,\r\n  \"suspend\": -1,\r\n  \"suspended\": -1,\r\n  \"suspicious\": -2,\r\n  \"swear\": -2,\r\n  \"swearing\": -2,\r\n  \"swears\": -2,\r\n  \"sweet\": 2,\r\n  \"swift\": 2,\r\n  \"swiftly\": 2,\r\n  \"swindle\": -3,\r\n  \"swindles\": -3,\r\n  \"swindling\": -3,\r\n  \"sympathetic\": 2,\r\n  \"sympathy\": 2,\r\n  \"torn\": -2,\r\n  \"tard\": -2,\r\n  \"tense\": -2,\r\n  \"tension\": -1,\r\n  \"terrible\": -3,\r\n  \"terribly\": -3,\r\n  \"terrific\": 4,\r\n  \"terrified\": -3,\r\n  \"terror\": -3,\r\n  \"terrorize\": -3,\r\n  \"terrorized\": -3,\r\n  \"terrorizes\": -3,\r\n  \"thank\": 2,\r\n  \"thankful\": 2,\r\n  \"thanks\": 2,\r\n  \"thorny\": -2,\r\n  \"thoughtful\": 2,\r\n  \"thoughtless\": -2,\r\n  \"threat\": -2,\r\n  \"threaten\": -2,\r\n  \"threatened\": -2,\r\n  \"threatening\": -2,\r\n  \"threatens\": -2,\r\n  \"threats\": -2,\r\n  \"thrilled\": 5,\r\n  \"thwart\": -2,\r\n  \"thwarted\": -2,\r\n  \"thwarting\": -2,\r\n  \"thwarts\": -2,\r\n  \"timid\": -2,\r\n  \"timorous\": -2,\r\n  \"tired\": -2,\r\n  \"tits\": -2,\r\n  \"tolerant\": 2,\r\n  \"toothless\": -2,\r\n  \"top\": 2,\r\n  \"tops\": 2,\r\n  \"tender\": 2,\r\n  \"torture\": -4,\r\n  \"tortured\": -4,\r\n  \"tortures\": -4,\r\n  \"torturing\": -4,\r\n  \"totalitarian\": -2,\r\n  \"totalitarianism\": -2,\r\n  \"tout\": -2,\r\n  \"touted\": -2,\r\n  \"touting\": -2,\r\n  \"touts\": -2,\r\n  \"tragedy\": -2,\r\n  \"tragic\": -2,\r\n  \"tranquil\": 2,\r\n  \"trap\": -1,\r\n  \"trapped\": -2,\r\n  \"trauma\": -3,\r\n  \"traumatic\": -3,\r\n  \"travesty\": -2,\r\n  \"treason\": -3,\r\n  \"treasonous\": -3,\r\n  \"treasure\": 2,\r\n  \"treasures\": 2,\r\n  \"trembling\": -2,\r\n  \"tremulous\": -2,\r\n  \"tricked\": -2,\r\n  \"trickery\": -2,\r\n  \"triumph\": 4,\r\n  \"triumphant\": 4,\r\n  \"trouble\": -2,\r\n  \"troubled\": -2,\r\n  \"troubles\": -2,\r\n  \"true\": 2,\r\n  \"trust\": 1,\r\n  \"trusted\": 2,\r\n  \"tumor\": -2,\r\n  \"twat\": -5,\r\n  \"tears\": -2,\r\n  \"ugly\": -3,\r\n  \"unacceptable\": -2,\r\n  \"unappreciated\": -2,\r\n  \"unapproved\": -2,\r\n  \"unaware\": -2,\r\n  \"unbelievable\": -1,\r\n  \"unbelieving\": -1,\r\n  \"unbiased\": 2,\r\n  \"uncertain\": -1,\r\n  \"unclear\": -1,\r\n  \"uncomfortable\": -2,\r\n  \"unconcerned\": -2,\r\n  \"unconfirmed\": -1,\r\n  \"unconvinced\": -1,\r\n  \"uncredited\": -1,\r\n  \"undecided\": -1,\r\n  \"underestimate\": -1,\r\n  \"underestimated\": -1,\r\n  \"underestimates\": -1,\r\n  \"underestimating\": -1,\r\n  \"undermine\": -2,\r\n  \"undermined\": -2,\r\n  \"undermines\": -2,\r\n  \"undermining\": -2,\r\n  \"undeserving\": -2,\r\n  \"undesirable\": -2,\r\n  \"uneasy\": -2,\r\n  \"unemployment\": -2,\r\n  \"unequal\": -1,\r\n  \"unequaled\": 2,\r\n  \"unethical\": -2,\r\n  \"unfair\": -2,\r\n  \"unfocused\": -2,\r\n  \"unfulfilled\": -2,\r\n  \"unhappy\": -2,\r\n  \"unhealthy\": -2,\r\n  \"unified\": 1,\r\n  \"unimpressed\": -2,\r\n  \"unintelligent\": -2,\r\n  \"united\": 1,\r\n  \"unjust\": -2,\r\n  \"unlovable\": -2,\r\n  \"unloved\": -2,\r\n  \"unmatched\": 1,\r\n  \"unmotivated\": -2,\r\n  \"unprofessional\": -2,\r\n  \"unresearched\": -2,\r\n  \"unsatisfied\": -2,\r\n  \"unsecured\": -2,\r\n  \"unsettled\": -1,\r\n  \"unsophisticated\": -2,\r\n  \"unstable\": -2,\r\n  \"unstoppable\": 2,\r\n  \"unsupported\": -2,\r\n  \"unsure\": -1,\r\n  \"untarnished\": 2,\r\n  \"unwanted\": -2,\r\n  \"unworthy\": -2,\r\n  \"upset\": -2,\r\n  \"upsets\": -2,\r\n  \"upsetting\": -2,\r\n  \"uptight\": -2,\r\n  \"urgent\": -1,\r\n  \"useful\": 2,\r\n  \"usefulness\": 2,\r\n  \"useless\": -2,\r\n  \"uselessness\": -2,\r\n  \"vindicates\": 2,\r\n  \"vague\": -2,\r\n  \"validates\": 1,\r\n  \"validating\": 1,\r\n  \"verdict\": -1,\r\n  \"verdicts\": -1,\r\n  \"vested\": 1,\r\n  \"vexation\": -2,\r\n  \"vexing\": -2,\r\n  \"vibrant\": 3,\r\n  \"vicious\": -2,\r\n  \"victim\": -3,\r\n  \"victimize\": -3,\r\n  \"victimized\": -3,\r\n  \"victimizes\": -3,\r\n  \"victimizing\": -3,\r\n  \"victims\": -3,\r\n  \"vigilant\": 3,\r\n  \"vile\": -3,\r\n  \"vindicate\": 2,\r\n  \"vindicated\": 2,\r\n  \"validated\": 1,\r\n  \"vindicating\": 2,\r\n  \"violate\": -2,\r\n  \"violated\": -2,\r\n  \"violates\": -2,\r\n  \"violating\": -2,\r\n  \"violence\": -3,\r\n  \"violent\": -3,\r\n  \"virtuous\": 2,\r\n  \"virulent\": -2,\r\n  \"vision\": 1,\r\n  \"visionary\": 3,\r\n  \"visioning\": 1,\r\n  \"visions\": 1,\r\n  \"vitality\": 3,\r\n  \"vitamin\": 1,\r\n  \"vitriolic\": -3,\r\n  \"vivacious\": 3,\r\n  \"vociferous\": -1,\r\n  \"vulnerability\": -2,\r\n  \"vulnerable\": -2,\r\n  \"validate\": 1,\r\n  \"walkout\": -2,\r\n  \"walkouts\": -2,\r\n  \"wanker\": -3,\r\n  \"want\": 1,\r\n  \"war\": -2,\r\n  \"warfare\": -2,\r\n  \"warm\": 1,\r\n  \"warmth\": 2,\r\n  \"warn\": -2,\r\n  \"warned\": -2,\r\n  \"warning\": -3,\r\n  \"warnings\": -3,\r\n  \"warns\": -2,\r\n  \"waste\": -1,\r\n  \"wasted\": -2,\r\n  \"wasting\": -2,\r\n  \"wavering\": -1,\r\n  \"weak\": -2,\r\n  \"weakness\": -2,\r\n  \"wealth\": 3,\r\n  \"wealthy\": 2,\r\n  \"weary\": -2,\r\n  \"weep\": -2,\r\n  \"weeping\": -2,\r\n  \"weird\": -2,\r\n  \"welcome\": 2,\r\n  \"welcomed\": 2,\r\n  \"welcomes\": 2,\r\n  \"whimsical\": 1,\r\n  \"whitewash\": -3,\r\n  \"whore\": -4,\r\n  \"wicked\": -2,\r\n  \"widowed\": -1,\r\n  \"willingness\": 2,\r\n  \"win\": 4,\r\n  \"winner\": 4,\r\n  \"winning\": 4,\r\n  \"wins\": 4,\r\n  \"winwin\": 3,\r\n  \"wish\": 1,\r\n  \"wishes\": 1,\r\n  \"wishing\": 1,\r\n  \"withdrawal\": -3,\r\n  \"woebegone\": -2,\r\n  \"woeful\": -3,\r\n  \"won\": 3,\r\n  \"wonderful\": 4,\r\n  \"woo\": 3,\r\n  \"woohoo\": 3,\r\n  \"wooo\": 4,\r\n  \"woow\": 4,\r\n  \"worn\": -1,\r\n  \"worried\": -3,\r\n  \"worry\": -3,\r\n  \"worrying\": -3,\r\n  \"worse\": -3,\r\n  \"worsen\": -3,\r\n  \"worsened\": -3,\r\n  \"worsening\": -3,\r\n  \"worsens\": -3,\r\n  \"worshiped\": 3,\r\n  \"worst\": -3,\r\n  \"worth\": 2,\r\n  \"worthless\": -2,\r\n  \"worthy\": 2,\r\n  \"wow\": 4,\r\n  \"wowow\": 4,\r\n  \"wowww\": 4,\r\n  \"wrathful\": -3,\r\n  \"wreck\": -2,\r\n  \"wrong\": -2,\r\n  \"wronged\": -2,\r\n  \"wtf\": -4,\r\n  \"yeah\": 1,\r\n  \"yearning\": 1,\r\n  \"yeees\": 2,\r\n  \"yes\": 1,\r\n  \"youthful\": 2,\r\n  \"yucky\": -2,\r\n  \"yummy\": 3,\r\n  \"zealot\": -2,\r\n  \"zealots\": -2,\r\n  \"zealous\": 2\r\n}");

  doesWordExist = function(word) {
    if (word in afinnWordList) {
      return true;
    } else {
      return false;
    }
  };

  getScoreOfWord = function(word) {
    if (afinnWordList[word]) {
      return afinnWordList[word];
    } else {
      return 0;
    }
  };

  getWordsInSentence = function(sentence) {
    sentence = sentence != null ? sentence : '';
    sentence = typeof sentence === 'string' ? sentence : '';
    sentence = sentence.toLowerCase();
    sentence = sentence.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    sentence = sentence.replace(/[^\w\s]/gi, '');
    sentence = sentence.split(' ');
    sentence = sentence.filter(function(n) {
      return n !== '';
    });
    return sentence = removeDuplicates(sentence);
  };

  removeDuplicates = function(arr) {
    var i, key, ref, res, results, value;
    if (arr.length === 0) {
      return [];
    }
    res = {};
    for (key = i = 0, ref = arr.length - 1; 0 <= ref ? i <= ref : i >= ref; key = 0 <= ref ? ++i : --i) {
      res[arr[key]] = arr[key];
    }
    results = [];
    for (key in res) {
      value = res[key];
      results.push(value);
    }
    return results;
  };

  scaleScore = function(score) {
    score = score > 10 ? 10 : score;
    score = score < -10 ? -10 : score;
    return score / 10;
  };

  analyseSentence = function(sentence) {
    var i, len, score, word, wordsArr;
    score = 0;
    wordsArr = getWordsInSentence(sentence);
    for (i = 0, len = wordsArr.length; i < len; i++) {
      word = wordsArr[i];
      if (doesWordExist(word)) {
        score += getScoreOfWord(word);
      }
    }
    return scaleScore(score);
  };

  module.exports = analyseSentence;

  if (process.env.NODE_ENV === 'test') {
    module.exports = {
      main: analyseSentence,
      _private: {
        scaleScore: scaleScore,
        doesWordExist: doesWordExist,
        getScoreOfWord: getScoreOfWord,
        removeDuplicates: removeDuplicates,
        getWordsInSentence: getWordsInSentence
      }
    };
  }

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */
}).call(this,require('_process'))
},{"_process":1}],4:[function(require,module,exports){
var updateChart;

updateChart = function(data) {
  return $("#textAreaMain").text(data).keydown();
};

module.exports.updateChart = updateChart;


},{}],5:[function(require,module,exports){
var height, initialiseChart, prelimWordCloud, updateChart, width, words;

prelimWordCloud = null;

words = [];

height = 0;

width = 0;

initialiseChart = function() {
  var draw, svg;
  height = Math.round($("#cloud").parent().width());
  width = Math.round($("#cloud").parent().width());
  svg = d3.select('#cloud').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(250,250)');
  draw = function(words) {
    var cloud;
    cloud = svg.selectAll('g text').data(words, function(d) {
      return d.word;
    });
    cloud.enter().append('text').style('font-family', 'Impact').style('fill', function(d) {
      return d.color;
    }).attr('text-anchor', 'middle').attr('font-size', 1).text(function(d) {
      return d.word;
    });
    cloud.transition().duration(600).style('font-size', function(d) {
      return d.size + 'px';
    }).attr('transform', function(d) {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
    }).style('fill-opacity', 1);
    return cloud.exit().transition().duration(200).style('fill-opacity', 1e-6).attr('font-size', 1).remove();
  };
  return prelimWordCloud = {
    update: function(words) {
      return d3.layout.cloud().size([height, width]).words(words).padding(5).rotate(function() {
        return ~~(Math.random() * 2) * 90;
      }).font('Impact').fontSize(function(d) {
        return d.size;
      }).on('end', draw).start();
    }
  };
};

updateChart = function(wordsObjArr) {
  var fillScale, scaleColors, sizeScale;
  sizeScale = d3.scale.linear().domain([0, 10]).range([25, 100]);
  scaleColors = ["#c80303", "#d7621a", "#828282", "#c0d71a", "#04b213"];
  fillScale = d3.scale.linear().domain([-1, -0.2, 0, 0.2, 1]).range(scaleColors);
  return prelimWordCloud.update(wordsObjArr.map(function(d) {
    return {
      word: d.word,
      size: sizeScale(d.count),
      color: fillScale(d.sentiment)
    };
  }));
};

module.exports.initialiseChart = initialiseChart;

module.exports.updateChart = updateChart;


},{}],6:[function(require,module,exports){
var requestEntityData;

requestEntityData = function(tweetBody) {
  var body, j, makeHtmlProgress, renderResults;
  makeHtmlProgress = function(label, img, num) {
    var html;
    html = "";
    html += "<div class='chip sml-margin tooltipped' data-tooltip='" + num + " occurrences'>";
    if (img != null) {
      if (img !== '') {
        html += "<img src='" + img + "' />";
      }
    }
    html += "" + label;
    html += "</div>";
    return html;
  };
  renderResults = function(results) {
    var category, i, img, item, j, k, l, len, len1, ref;
    i = 0;
    for (k = 0, len = results.length; k < len; k++) {
      category = results[k];
      i += 1;
      $('#entityResults' + i).append("<h5 class='flow-text'>" + category.name + "</h5>");
      ref = category.items;
      for (l = 0, len1 = ref.length; l < len1; l++) {
        item = ref[l];
        img = item.additional_information.image;
        $('#entityResults' + i).append(makeHtmlProgress(item.normalized_text, img, item.matches.length));
      }
    }
    $('#entityLoader').fadeOut('fast');
    j = 1;
    while (j <= 8) {
      $('#entityResults' + j).slideDown('slow');
      j++;
    }
    $('img').error(function() {
      return $(this).hide();
    });
    return $('.tooltipped').tooltip({
      delay: 50
    });
  };
  j = 1;
  while (j <= 8) {
    $('#entityResults' + j).hide();
    j++;
  }
  body = tweetBody.replace(/[^a-zA-Z ]/g, " ");
  return $.post('/api/entity', {
    text: tweetBody
  }, function(results) {
    return renderResults(results);
  });
};

module.exports.updateChart = requestEntityData;


},{}],7:[function(require,module,exports){
var gauge, initialiseChart, powerGauge, updateGauge;

powerGauge = null;

gauge = function(container, configuration) {
  var arc, centerTranslation, config, configure, deg2rad, donut, isRendered, newAngle, pointer, pointerHeadLength, r, range, render, scale, svg, that, tickData, ticks, update, value;
  that = {};
  config = {
    size: 200,
    clipWidth: 200,
    clipHeight: 110,
    ringInset: 20,
    ringWidth: 20,
    pointerWidth: 10,
    pointerTailLength: 5,
    pointerHeadLengthPercent: 0.9,
    minValue: 0,
    maxValue: 10,
    minAngle: -90,
    maxAngle: 90,
    transitionMs: 750,
    majorTicks: 10,
    labelFormat: d3.format(',g'),
    labelInset: 10,
    arcColorFn: d3.interpolateHsl(d3.rgb('#DF0101'), d3.rgb('#04B404'))
  };
  range = void 0;
  r = void 0;
  pointerHeadLength = void 0;
  value = 0;
  svg = void 0;
  arc = void 0;
  scale = void 0;
  ticks = void 0;
  tickData = void 0;
  pointer = void 0;
  donut = d3.layout.pie();
  deg2rad = function(deg) {
    return deg * Math.PI / 180;
  };
  newAngle = function(d) {
    return config.minAngle + scale(d) * range;
  };
  configure = function(configuration) {
    var prop;
    prop = void 0;
    for (prop in configuration) {
      prop = prop;
      config[prop] = configuration[prop];
    }
    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
    scale = d3.scale.linear().range([0, 1]).domain([config.minValue, config.maxValue]);
    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {
      return 1 / config.majorTicks;
    });
    return arc = d3.svg.arc().innerRadius(r - config.ringWidth - config.ringInset).outerRadius(r - config.ringInset).startAngle(function(d, i) {
      return deg2rad(config.minAngle + (d * i) * range);
    }).endAngle(function(d, i) {
      return deg2rad(config.minAngle + (d * (i + 1)) * range);
    });
  };
  centerTranslation = function() {
    return 'translate(' + r + ',' + r + ')';
  };
  isRendered = function() {
    return svg !== void 0;
  };
  render = function(newValue) {
    var arcs, centerTx, lg, lineData, pg, pointerLine;
    svg = d3.select(container).append('svg:svg').attr('class', 'gauge').attr('width', config.clipWidth).attr('height', config.clipHeight);
    centerTx = centerTranslation();
    arcs = svg.append('g').attr('class', 'arc').attr('transform', centerTx);
    arcs.selectAll('path').data(tickData).enter().append('path').attr('fill', function(d, i) {
      return config.arcColorFn(d * i);
    }).attr('d', arc);
    lg = svg.append('g').attr('class', 'label').attr('transform', centerTx);
    lg.selectAll('text').data(ticks).enter();
    lineData = [[config.pointerWidth / 2, 0], [0, -pointerHeadLength], [-(config.pointerWidth / 2), 0], [0, config.pointerTailLength], [config.pointerWidth / 2, 0]];
    pointerLine = d3.svg.line().interpolate('monotone');
    pg = svg.append('g').data([lineData]).attr('class', 'pointer').attr('transform', centerTx);
    pointer = pg.append('path').attr('d', pointerLine).attr('transform', 'rotate(' + config.minAngle + ')');
    return update(newValue === void 0 ? 0 : newValue);
  };
  update = function(newValue, newConfiguration) {
    var ratio;
    if (newConfiguration !== void 0) {
      configure(newConfiguration);
    }
    ratio = scale(newValue);
    newAngle = config.minAngle + ratio * range;
    return pointer.transition().duration(config.transitionMs).ease('elastic').attr('transform', 'rotate(' + newAngle + ')');
  };
  that.configure = configure;
  that.isRendered = isRendered;
  that.render = render;
  that.update = update;
  configure(configuration);
  return that;
};

initialiseChart = function() {
  var parentWidth;
  parentWidth = $('#power-gauge').parent().width();
  powerGauge = gauge('#power-gauge', {
    size: parentWidth,
    clipWidth: parentWidth,
    clipHeight: parentWidth / 1.8,
    ringWidth: 60,
    maxValue: 10,
    transitionMs: 4000
  });
  powerGauge.render();
  return updateGauge(0);
};

updateGauge = function(data) {
  return powerGauge.update((data / 2 + 0.5) * 10);
};

module.exports.initialiseChart = initialiseChart;

module.exports.updateChart = updateGauge;


},{}],8:[function(require,module,exports){
var height, initialiseChart, prelimWordCloud, updateChart, width, words;

prelimWordCloud = null;

words = [];

height = 0;

width = 0;

initialiseChart = function() {
  var draw, fill, svg;
  height = Math.round($("#word-spiral-container").width());
  width = Math.round($("#word-spiral-container").width()) * 1.6;
  fill = d3.scale.linear().domain([0, 15]).range(["#9C27B0", "#eeb9f7", "#6b057c"]);
  svg = d3.select('#instant-word-spiral').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(250,250)');
  draw = function(words) {
    var cloud;
    cloud = svg.selectAll('g text').data(words, function(d) {
      return d.text;
    });
    cloud.enter().append('text').style('font-family', 'Impact').style('fill', function(d, i) {
      return fill(i);
    }).attr('text-anchor', 'middle').attr('font-size', 1).text(function(d) {
      return d.text;
    });
    cloud.transition().duration(600).style('font-size', function(d) {
      return d.size + 'px';
    }).attr('transform', function(d) {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
    }).style('fill-opacity', 1);
    return cloud.exit().transition().duration(200).style('fill-opacity', 1e-6).attr('font-size', 1).remove();
  };
  return prelimWordCloud = {
    update: function(words) {
      return d3.layout.cloud().size([height, width]).words(words).padding(5).rotate(function() {
        return ~~(Math.random() * 2) * 90;
      }).font('Impact').fontSize(function(d) {
        return d.size;
      }).on('end', draw).start();
    }
  };
};

updateChart = function(newWords) {
  newWords = newWords.split(' ');
  return prelimWordCloud.update(newWords.map(function(d) {
    return {
      text: d,
      size: 3 + Math.random() * 60
    };
  }));
};

module.exports.initialiseChart = initialiseChart;

module.exports.updateChart = updateChart;


},{}],9:[function(require,module,exports){
var paceData, paceHigh, paceLow, paceMed, renderTimePaceChart, updatePace;

paceLow = 80;

paceMed = 120;

paceHigh = 200;

paceData = [];

renderTimePaceChart = function() {
  var chart, chartData, i, len, paceObj;
  chartData = {
    x: 'x',
    columns: [['x'], ['Pace']]
  };
  for (i = 0, len = paceData.length; i < len; i++) {
    paceObj = paceData[i];
    chartData.columns[0].push(paceObj.y);
    chartData.columns[1].push(paceObj.x);
  }
  return chart = c3.generate({
    bindto: '#paceTime',
    data: chartData
  });
};

updatePace = function(paceTotal, eventCount) {
  var pace, paceColor;
  pace = (paceTotal / eventCount) / 5;
  paceData.push({
    x: pace,
    y: eventCount
  });
  paceColor = '#848484';
  if (pace < paceLow) {
    paceColor = '#04B404';
  } else if (pace > paceHigh) {
    paceColor = '#DF0101';
  }
  $('#word_rate_label').text(parseInt(pace)).css('color', paceColor);
  return renderTimePaceChart();
};

module.exports.initialiseChart = renderTimePaceChart;

module.exports.updateChart = updatePace;


},{}],10:[function(require,module,exports){
var DataManager, TextCalculations, basicText, cloud, dataManager, entities, gauge, helpers, initialiseCharts, pace, pageActions, speechEmitter, spiralWords, textCalculations, textEmitter;

helpers = {};

helpers.sentimentAnalysis = require('sentiment-analysis');

helpers.removeWords = require('remove-words');

pageActions = require('./page-actions.coffee');

DataManager = require('./speech-data-manager.coffee');

speechEmitter = require('./speech-emitter.coffee');

textEmitter = require('./text-emitter.coffee');

TextCalculations = require('./text-calculations.coffee');

basicText = require('./charts/basic-text.coffee');

spiralWords = require('./charts/instant-word-spiral.coffee');

gauge = require('./charts/gauge.coffee');

cloud = require('./charts/cloud.coffee');

pace = require('./charts/pace.coffee');

entities = require('./charts/entities.coffee');

textCalculations = new TextCalculations(helpers);

dataManager = new DataManager(textCalculations);

initialiseCharts = function() {
  spiralWords.initialiseChart();
  gauge.initialiseChart();
  cloud.initialiseChart();
  return pace.initialiseChart();
};

document.addEventListener('word', (function(e) {
  dataManager.addWordResults(e.detail.t);
  spiralWords.updateChart(e.detail.t);
  gauge.updateChart(textCalculations.calcRecentSentiment(dataManager.getWords()));
  return pace.updateChart(e.detail.pace.total, e.detail.pace.count);
}), false);

document.addEventListener('sentence', (function(e) {
  dataManager.addSentenceResults(e.detail);
  basicText.updateChart(dataManager.getFullText());
  cloud.updateChart(textCalculations.prioritiseWordsArr(dataManager.getWords()));
  return entities.updateChart(dataManager.getFullText());
}), false);

window.startRecording = speechEmitter.startRecording;

window.stopRecording = speechEmitter.stopRecording;

window.initialiseCharts = initialiseCharts;


},{"./charts/basic-text.coffee":4,"./charts/cloud.coffee":5,"./charts/entities.coffee":6,"./charts/gauge.coffee":7,"./charts/instant-word-spiral.coffee":8,"./charts/pace.coffee":9,"./page-actions.coffee":11,"./speech-data-manager.coffee":12,"./speech-emitter.coffee":13,"./text-calculations.coffee":14,"./text-emitter.coffee":15,"remove-words":2,"sentiment-analysis":3}],11:[function(require,module,exports){
var firstTime, firstTimeRecordingActions, listening, toggleListening;

listening = false;

firstTime = true;

$(function() {
  $('nav').hide();
  return $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      return $('nav').fadeIn();
    } else {
      return $('nav').fadeOut();
    }
  });
});

toggleListening = function() {
  if (listening) {
    stopRecording();
    listening = false;
    $('#audioImg').fadeOut('normal');
    return $('#get-started').html("Tap to Resume").append('<br><i class="material-icons" id ="ico">play_arrow</i>').removeClass('circle');
  } else {
    startRecording();
    listening = true;
    $('#get-started').addClass('circle').html("Listening").append('<img src="images/audio.gif" id="audioImg"/>').append('<i class="material-icons" id ="ico">pause</i>');
    return $('#audioImg').fadeIn('normal');
  }
};

$('#get-started').click(function() {
  if (firstTime) {
    firstTimeRecordingActions();
  }
  return toggleListening();
});

firstTimeRecordingActions = function() {
  $('#theInput, #header-instructions, #results-container').slideDown(400);
  $('#index-banner').removeClass('index-banner-initial-height');
  $('#title-container').slideUp(400);
  window.initialiseCharts();
  return firstTime = false;
};


},{}],12:[function(require,module,exports){
var SpeechDataManager;

SpeechDataManager = (function() {
  var addWordToArr, formatFullTextNicely, fullText, sentimentAnalysis, wordsArr;

  sentimentAnalysis = null;

  wordsArr = [];

  fullText = '';

  function SpeechDataManager(helpers) {
    this.helpers = helpers;
    sentimentAnalysis = this.helpers.calcFullSentiment;
  }

  SpeechDataManager.prototype.addWordResults = function(data) {
    return addWordToArr(data);
  };

  SpeechDataManager.prototype.addSentenceResults = function(data) {
    return fullText = data;
  };

  SpeechDataManager.prototype.getWords = function() {
    return wordsArr;
  };

  SpeechDataManager.prototype.getFullText = function() {
    return formatFullTextNicely(fullText);
  };

  addWordToArr = function(word) {
    var f, i, len, r, sentiment;
    word = word.split(" ").splice(-1)[0];
    sentiment = sentimentAnalysis(word);
    f = wordsArr.filter(function(item) {
      return item.word === word;
    });
    if (!f.length) {
      wordsArr.push({
        word: word,
        sentiment: sentiment,
        count: 1
      });
    } else {
      for (i = 0, len = wordsArr.length; i < len; i++) {
        r = wordsArr[i];
        if (r.word === word) {
          r.count++;
          return r;
        }
      }
    }
    return wordsArr[wordsArr.length - 1];
  };

  formatFullTextNicely = function(rawText) {
    return rawText.charAt(0).toUpperCase() + rawText.slice(1);
  };

  return SpeechDataManager;

})();

module.exports = SpeechDataManager;


},{}],13:[function(require,module,exports){
var eventCount, final_transcript, firstTimestamp, paceActions, paceTotal, recognition, shouldResetTimestamp, startRecording, stopRecording;

recognition = new webkitSpeechRecognition;

recognition.continuous = true;

recognition.interimResults = true;

final_transcript = '';

shouldResetTimestamp = true;

startRecording = function() {
  recognition.start();
  return console.log('Recording Started');
};

stopRecording = function() {
  recognition.stop();
  shouldResetTimestamp = true;
  return console.log('Recognition Stopping');
};

eventCount = 0;

firstTimestamp = 0;

paceTotal = 0.0;

paceActions = function(event) {};

recognition.onresult = function(event) {
  var i, interim_transcript;
  interim_transcript = '';
  if (shouldResetTimestamp) {
    firstTimestamp = event.timeStamp;
    paceTotal = 0;
    shouldResetTimestamp = false;
  } else {
    paceTotal = event.timeStamp - firstTimestamp;
  }
  i = event.resultIndex;
  while (i < event.results.length) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
    ++i;
  }
  if (interim_transcript.length > 0) {
    eventCount += 1;
    event = new CustomEvent("word", {
      detail: {
        t: interim_transcript,
        pace: {
          total: paceTotal,
          count: eventCount
        }
      }
    });
    document.dispatchEvent(event);
  }
  if (final_transcript.length > 0) {
    event = new CustomEvent("sentence", {
      "detail": final_transcript
    });
    return document.dispatchEvent(event);
  }
};

module.exports.startRecording = startRecording;

module.exports.stopRecording = stopRecording;


},{}],14:[function(require,module,exports){
var TextCalculations;

TextCalculations = (function() {
  var removeWords, sentimentAnalysis;

  sentimentAnalysis = void 0;

  removeWords = void 0;

  function TextCalculations(helpers) {
    this.helpers = helpers;
    sentimentAnalysis = this.helpers.sentimentAnalysis;
    removeWords = this.helpers.removeWords;
  }

  TextCalculations.prototype.calcSentimentOfWords = function(wordsObj) {
    var count, i, len, s, totalSentiment, wordObj;
    totalSentiment = 0;
    count = 0;
    for (i = 0, len = wordsObj.length; i < len; i++) {
      wordObj = wordsObj[i];
      s = wordObj.sentiment;
      if (s > 0.1 || s < -0.1) {
        totalSentiment += s;
        count++;
      }
    }
    if (count && totalSentiment) {
      return totalSentiment / count;
    } else {
      return 0;
    }
  };

  TextCalculations.prototype.calcRecentSentiment = function(wordsObj) {
    return this.calcSentimentOfWords(wordsObj.slice(-10));
  };

  TextCalculations.prototype.calcFullSentiment = function(sentence) {
    return sentimentAnalysis(sentence);
  };

  TextCalculations.prototype.prioritiseWordsArr = function(wordsArr) {
    var i, len, newWordsArr, wordObj;
    newWordsArr = [];
    for (i = 0, len = wordsArr.length; i < len; i++) {
      wordObj = wordsArr[i];
      if (wordObj.sentiment !== 0 || wordObj.count > 1) {
        if (removeWords(wordObj.word).length > 0) {
          newWordsArr.push(wordObj);
        }
      }
    }
    return newWordsArr;
  };

  return TextCalculations;

})();

module.exports = TextCalculations;


},{}],15:[function(require,module,exports){
$('#textAreaMain').keypress(function(e) {
  var sentence, word;
  if (e.keyCode === 0 || e.keyCode === 32) {
    word = $('#textAreaMain').val().split(' ').pop();
    document.dispatchEvent(new CustomEvent("word", {
      "detail": word
    }));
  }
  if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1) {
    sentence = $('#textAreaMain').val();
    return document.dispatchEvent(new CustomEvent("sentence", {
      "detail": sentence
    }));
  }
});


},{}]},{},[10]);
