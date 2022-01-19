'use strict';

const buttonAction = document.getElementById('button-action');
const output = document.getElementById('output');
const FizzNum = document.getElementById('FizzNum');
const BuzzNum = document.getElementById('BuzzNum');

buttonAction.addEventListener('click', () => {
    const FizzNumValue = Number.parseFloat(FizzNum.value);
    const BuzzNumValue = Number.parseFloat(BuzzNum.value);
    let newDiv = document.createElement('div');

    //整数値判定
    if (Number.isInteger(FizzNumValue) && Number.isInteger(BuzzNumValue)) {
        //FizzBuzz関数
        for (let i = 1; i < 100; i++) {
            newDiv = document.createElement('div');
            //FizzNumValueの倍数かつBuzzNumValueの倍数ならFizzBuzzと表示
            if (i % FizzNumValue == 0 && i % BuzzNumValue == 0) {
                newDiv.innerHTML = `FizzBuzz ${i}`;
                //FizzNumValueの倍数ならFizzと表示
            } else if (i % FizzNumValue == 0) {
                newDiv.innerHTML = `Fizz ${i}`;
                //BuzzNumValueの倍数ならBuzzと表示
            } else if (i % BuzzNumValue == 0) {
                newDiv.innerHTML = `Buzz ${i}`;
            }
            output.appendChild(newDiv);
        }
    } else {
        newDiv = document.createElement('div');
        newDiv.innerHTML = '整数値を入力してください';
        output.appendChild(newDiv);
    }
});
