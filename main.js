'use strict';

const buttonAction = document.getElementById('button-action');
const output = document.getElementById('output');
const FizzNum = document.getElementById('FizzNum');
const BuzzNum = document.getElementById('BuzzNum');

buttonAction.addEventListener('click', () => {
    const FizzNumValue = Number.parseFloat(FizzNum.value);
    const BuzzNumValue = Number.parseFloat(BuzzNum.value);

    //出力クリア
    output.innerHTML = '';
    //整数値判定
    if (Number.isInteger(FizzNumValue) && Number.isInteger(BuzzNumValue)) {
        //FizzBuzz関数
        for (let i = 1; i < 100; i++) {
            //FizzNumValueの倍数かつBuzzNumValueの倍数ならFizzBuzzと表示
            if (i % FizzNumValue == 0 && i % BuzzNumValue == 0) {
                createOutput(`FizzBuzz ${i}`);
                //FizzNumValueの倍数ならFizzと表示
            } else if (i % FizzNumValue == 0) {
                createOutput(`Fizz ${i}`);
                //BuzzNumValueの倍数ならBuzzと表示
            } else if (i % BuzzNumValue == 0) {
                createOutput(`Buzz ${i}`);
            }
        }
    } else {
        createOutput('整数値を入力してください');
    }
});

//出力内容生成
const createOutput = (result) => {
    let newLi = document.createElement('li');
    newLi.style.listStyle = 'none';
    newLi.innerHTML = result;
    output.appendChild(newLi);
};
