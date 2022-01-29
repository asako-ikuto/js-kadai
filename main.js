'use strict';

//開始・取得。結果表示部分
const startMsgTtl = document.getElementById('start-message-title');
const startMsg = document.getElementById('start-message');
const startMsgTxt = document.getElementById('start-message-text');
const startBtn = document.getElementById('start-button');
const question = document.getElementById('question');
const homeBtn = document.getElementById('home-button');

//問題表示部分
const questionTtl = document.getElementById('question-title');
const questionCategory = document.getElementById('question-category');
const questionDifficulty = document.getElementById('question-difficulty');
const questionText = document.getElementById('question-text');
const selectA = document.getElementById('selectA');
const selectB = document.getElementById('selectB');
const selectC = document.getElementById('selectC');
const selectD = document.getElementById('selectD');
const selectBtn = document.querySelectorAll('.question__select-button');

// Open Trivia DBのAPI URL
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

//初期値
let resultIndex = 0;
//正解数の初期値
let correctNum = 0;

//問題と選択肢を表示するクラス
class questionClass {
    constructor() {
        this.category = '';
        this.difficulty = '';
        this.question = '';
        this.correctAnswer = '';
        this.incorrectAnswer0 = '';
        this.incorrectAnswer1 = '';
        this.incorrectAnswer2 = '';
        this.questionNum = 0;
        this.answers = [];
    }

    set_data(resultIndex, data) {
        this.category = data.results[resultIndex].category;
        this.difficulty = data.results[resultIndex].difficulty;
        this.question = data.results[resultIndex].question;
        this.correctAnswer = data.results[resultIndex].correct_answer;
        this.incorrectAnswer0 = data.results[resultIndex].incorrect_answers[0];
        this.incorrectAnswer1 = data.results[resultIndex].incorrect_answers[1];
        this.incorrectAnswer2 = data.results[resultIndex].incorrect_answers[2];
        this.questionNum = resultIndex + 1;
        this.answers = [this.correctAnswer, this.incorrectAnswer0, this.incorrectAnswer1, this.incorrectAnswer2];
    }

    //正解の答えを得る
    getCorrectAnswer() {
        return this.correctAnswer;
    }

    //問題と選択肢（ランダム）を表示
    showQuestion() {
        //問題を表示
        questionTtl.innerHTML = `問題${this.questionNum}`;
        questionCategory.innerHTML = `[ジャンル]:${this.category}`;
        questionDifficulty.innerHTML = `[難易度]:${this.difficulty}`;
        questionText.innerHTML = this.question;

        //選択肢をランダムに表示
        for (let i = this.answers.length - 1; 0 < i; i--) {
            // 0～(i+1)の範囲で値を取得
            let r = Math.floor(Math.random() * (i + 1));
            //要素の並び替え
            let tmp = this.answers[i];
            this.answers[i] = this.answers[r];
            this.answers[r] = tmp;
        }
        selectA.innerHTML = this.answers[0];
        selectB.innerHTML = this.answers[1];
        selectC.innerHTML = this.answers[2];
        selectD.innerHTML = this.answers[3];
    }
}

//結果を表示するクラス
class resultClass {

    constructor() {
        this.correctNum = '';
    }

    set_data(correctNum) {
        this.correctNum = correctNum;
    }
    //結果を表示
    showResult() {
        //質問の表示から結果の表示に切り替え
        question.style.display = 'none';
        startMsg.style.display = 'block';
        homeBtn.style.display = 'block';
        //結果の表示
        startMsgTtl.textContent = `あなたの正解数は${this.correctNum}です！！`;
        startMsgTxt.textContent = '再度チャレジしたい場合は以下をクリック';
    }
}


let jsonData;
let correctAnswer;
const objQuestion = new questionClass();
const objResult = new resultClass();

//開始ボタンをクリック、APIデータ取得
startBtn.addEventListener('click', () => {
    //取得中の表示に変更
    startMsgTtl.textContent = '取得中';
    startMsgTxt.textContent = '少々お待ちください';
    startBtn.style.display = 'none';
    //APIデータ取得
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            jsonData = data;
            //取得表示から問題表示(1問目の表示）に切り替え
            startMsg.style.display = 'none';
            question.style.display = 'block';
            objQuestion.set_data(resultIndex, jsonData); //resultIndex = 0;
            objQuestion.showQuestion();
        })
        .catch((error) => console.log(error));
});

//選択肢を選んだ後の処理
selectBtn.forEach((e) => {
    e.addEventListener('click', (event) => {
        correctAnswer = objQuestion.getCorrectAnswer();
        //正解であれば正解数カウントアップ
        console.log(event.target.innerHTML);
        console.log(correctAnswer);
        if (event.target.innerHTML === correctAnswer) {
            correctNum += 1;
        }
        //問題を10問目まで表示
        if (resultIndex < 9) {
            resultIndex += 1;

            objQuestion.set_data(resultIndex, jsonData);
            objQuestion.showQuestion();

        } else {
            //10問目が終わったら結果を表示
            objResult.set_data(correctNum);
            objResult.showResult();
        }
    });
});

//ホームに戻るボタンを押した時の処理
homeBtn.addEventListener('click', () => {
    //値のリセット
    resultIndex = 0;
    correctNum = 0;

    //スタートの表示に戻る
    startMsgTtl.textContent = `ようこそ`;
    startMsgTxt.textContent = '以下のボタンをクリック';
    startBtn.style.display = 'block';
    homeBtn.style.display = 'none';
});

