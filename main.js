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

//クイズの値を取得する
class Quiz {
    constructor(quizData) {
        this._quizzes = quizData.results;
        this._correctAnswerNum = 0;
    }

    //カテゴリーの取得
    getQuizCategory(index) {
        return this._quizzes[index - 1].category;
    }
    //難易度の取得
    getQuizDifficulty(index) {
        return this._quizzes[index - 1].difficulty;
    }
    //問題文の取得
    getQuizQuestion(index) {
        return this._quizzes[index - 1].question;
    }
    //クイズの正答の取得
    getQuizCorrectAnswer(index) {
        return this._quizzes[index - 1].correct_answer;
    }
    //クイズの誤答選択肢を取得
    getQuizIncorrectAnswer0(index) {
        return this._quizzes[index - 1].incorrect_answers[0];
    }
    getQuizIncorrectAnswer1(index) {
        return this._quizzes[index - 1].incorrect_answers[1];
    }
    getQuizIncorrectAnswer2(index) {
        return this._quizzes[index - 1].incorrect_answers[2];
    }
}

//開始ボタンをクリック、APIデータ取得
startBtn.addEventListener('click', () => {
    //取得中の表示に変更
    startMsgTtl.textContent = '取得中';
    startMsgTxt.textContent = '少々お待ちください';
    startBtn.style.display = 'none';

    //APIデータ取得、1問目を表示
    getQuizData().then(quizData => {

        console.log(quizData);
        const insQuiz = new Quiz(quizData);
        showQuiz(insQuiz, 1);
    });
});

//選択肢を選んだ後の処理
selectBtn.forEach((e) => {
    e.addEventListener('click', (event) => {


        if (questionNum < 10) {
            questionNum += 1;
            showQuiz(questionNum);
        } else {
            //10問目が終わったら結果を表示
            showResult(correctNum);
        }
        // correctAnswer = objQuiz.getQuizCorrectAnswer(questionNum);

        // console.log(correctAnswer);
        // //正解であれば正解数カウントアップ
        // console.log(event.target.innerHTML);
        // console.log(correctAnswer);
        // if (event.target.innerHTML === correctAnswer) {
        //     correctNum += 1;
        // }
        // //問題を10問目まで表示
        // if (questionNum < 10) {
        //     questionNum += 1;

        //     objQuestion.set_data(resultIndex, jsonData);
        //     objQuestion.showQuiz();

        // } else {
        //     //10問目が終わったら結果を表示
        //     objResult.set_data(correctNum);
        //     objResult.showResult();
        // }
    });
});

//APIを叩いてjsonデータ取得
const getQuizData = async () => {
    try {
        const response = await fetch(url);
        const quizData = await response.json();

        return quizData;
    } catch (error) {
        console.log(error);
    }
};

//取得したjsonデータから、問題と選択肢（ランダム）を表示
const showQuiz = (quizData, questionNum) => {

    //取得表示から問題表示に切り替え
    startMsg.style.display = 'none';
    question.style.display = 'block';

    const objQuiz = quizData;

    //問題文
    const quizQuestion = objQuiz.getQuizQuestion(questionNum);
    //ジャンル
    const quizCategory = objQuiz.getQuizCategory(questionNum);
    //難易度
    const quizDifficulty = objQuiz.getQuizDifficulty(questionNum);
    //正答、誤答
    const quizCorrectAnswer = objQuiz.getQuizCorrectAnswer(questionNum);
    const quizIncorrectAnswer0 = objQuiz.getQuizIncorrectAnswer0(questionNum);
    const quizIncorrectAnswer1 = objQuiz.getQuizIncorrectAnswer1(questionNum);
    const quizIncorrectAnswer2 = objQuiz.getQuizIncorrectAnswer2(questionNum);
    const quizAnswers = [quizCorrectAnswer, quizIncorrectAnswer0, quizIncorrectAnswer1, quizIncorrectAnswer2];

    //問題を表示
    questionTtl.innerHTML = `問題${questionNum}`;
    questionCategory.innerHTML = `[ジャンル]:${quizCategory}`;
    questionDifficulty.innerHTML = `[難易度]:${quizDifficulty}`;
    questionText.innerHTML = quizQuestion;

    //選択肢をランダムに表示
    for (let i = quizAnswers.length - 1; 0 < i; i--) {
        // 0～(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));
        //要素の並び替え
        let tmp = quizAnswers[i];
        quizAnswers[i] = quizAnswers[r];
        quizAnswers[r] = tmp;
    }
    selectA.innerHTML = quizAnswers[0];
    selectB.innerHTML = quizAnswers[1];
    selectC.innerHTML = quizAnswers[2];
    selectD.innerHTML = quizAnswers[3];
}


//結果を表示する
const showResult = (correctNum) => {
    //質問の表示から結果の表示に切り替え
    question.style.display = 'none';
    startMsg.style.display = 'block';
    homeBtn.style.display = 'block';
    //結果の表示
    startMsgTtl.textContent = `あなたの正解数は${correctNum}です！！`;
    startMsgTxt.textContent = '再度チャレジしたい場合は以下をクリック';
}

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

