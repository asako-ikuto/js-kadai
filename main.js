'use strict';

const question = '日本の首都は？';
let answer = prompt(question);

//answerが'東京'になるまで繰り返す
while (answer !== '東京') {
    alert('不正解です');
    answer = prompt(question);
}

alert('正解です');