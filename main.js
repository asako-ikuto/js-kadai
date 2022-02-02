'use strict';

//開始・取得。結果表示部分
const startBtn = document.getElementById('start-button');
const question = document.getElementById('question');
const homeBtn = document.getElementById('home-button');

//問題表示部分
const questionDetail = document.getElementById('question-detail');
const questionCategory = document.getElementById('question-category');
const questionDifficulty = document.getElementById('question-difficulty');
const answersArea = document.getElementById('answers-area');

// Open Trivia DBのAPI URL
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

//クイズの値を取得する
class Quiz {
    constructor(quizData) {
        this._quizzes = quizData.results;
        this._correctAnswerNum = 0;
        this._numQuizzes = quizData.results.length;
    }

    //取得したクイズの数を取得
    getNumQuizzes() {
        return this._numQuizzes;
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

    getCorrectAnswerNum() {
        return this._correctAnswerNum;
    }

    //クイズの正解数をカウントする
    countCorrectAnswers(index, answer) {
        if (this._quizzes[index - 1].correct_answer === answer) {
            this._correctAnswerNum++;
        }
    }
}

//開始ボタンをクリック、APIデータ取得
startBtn.addEventListener('click', () => {
    //取得中の表示に変更
    // startBtn.style.display = 'none';
    startBtn.hidden = 'true';

    //APIデータ取得、1問目を表示
    fetchQuizData(1);
});

//クイズAPIからデータを取得
const fetchQuizData = async (index) => {
    try {
        //取得中の表示に変更
        title.textContent = '取得中';
        question.textContent = '少々お待ちください';

        const response = await fetch(url);
        const quizData = await response.json();
        const quiz = new Quiz(quizData);

        setNextQuiz(quiz, index);
    } catch (error) {
        console.log(error);
    }
};

//次のクイズを表示、最後に結果の画面を表示
const setNextQuiz = (quiz, index) => {
    while (answersArea.firstChild) {
        answersArea.removeChild(answersArea.firstChild);
    }
    if (index <= quiz.getNumQuizzes()) {
        makeQuiz(quiz, index);
    } else {
        finishQuiz(quiz);
    }
}

//クイズの表示部分（クイズ詳細、回答選択肢ボタン）を作成
const makeQuiz = (quiz, index) => {

    questionDetail.style.display = 'block';

    title.innerHTML = `問題${index}`;
    questionCategory.innerHTML = `[ジャンル]:${quiz.getQuizCategory(index)}`;
    questionDifficulty.innerHTML = `[難易度]:${quiz.getQuizDifficulty(index)}`;
    question.innerHTML = quiz.getQuizQuestion(index);

    const answers = buildAnswers(quiz, index);

    answers.forEach((answer) => {
        const answerElement = document.createElement('li');
        answerElement.style.marginBottom = '3px';
        answersArea.appendChild(answerElement);

        const buttonElement = document.createElement('button');
        buttonElement.innerHTML = answer;
        answerElement.appendChild(buttonElement);
        buttonElement.addEventListener('click', () => {
            quiz.countCorrectAnswers(index, answer);
            index++
            answersArea.removeChild(answersArea.firstChild);
            setNextQuiz(quiz, index);
        });
    });
}

//クイズの正答・誤答をランダムに配列に入れて返す
const buildAnswers = (quiz, index) => {

    //正答、誤答
    const quizCorrectAnswer = quiz.getQuizCorrectAnswer(index);
    const quizIncorrectAnswer0 = quiz.getQuizIncorrectAnswer0(index);
    const quizIncorrectAnswer1 = quiz.getQuizIncorrectAnswer1(index);
    const quizIncorrectAnswer2 = quiz.getQuizIncorrectAnswer2(index);
    const quizAnswers = [quizCorrectAnswer, quizIncorrectAnswer0, quizIncorrectAnswer1, quizIncorrectAnswer2];

    //選択肢をランダムに表示
    for (let i = quizAnswers.length - 1; 0 < i; i--) {
        // 0～(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));
        //要素の並び替え
        let tmp = quizAnswers[i];
        quizAnswers[i] = quizAnswers[r];
        quizAnswers[r] = tmp;
    }

    return quizAnswers;
}

//結果を表示する
const finishQuiz = (quiz) => {
    questionDetail.style.display = 'none';
    homeBtn.style.display = 'block';

    const correctNum = quiz.getCorrectAnswerNum();

    //結果の表示
    title.textContent = `あなたの正解数は${correctNum}です！！`;
    question.textContent = '再度チャレジしたい場合は以下をクリック';

}

//ホームに戻るボタンを押した時の処理
homeBtn.addEventListener('click', () => {

    //スタートの表示に戻る
    title.textContent = `ようこそ`;
    question.textContent = '以下のボタンをクリック';
    startBtn.style.display = 'block';
    homeBtn.style.display = 'none';
});

