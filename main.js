'use strict';

const taskTitle = `============================
現在持っているタスクの一覧
============================`;

//タスク初期値
const example1 = {
    content: '机を片付ける',
    genre: '掃除',
};

const example2 = {
    content: '牛乳を買う',
    genre: '買い物',
};

const example3 = {
    content: '散歩する',
    genre: '運動',
};

const tasks = [example1, example2, example3];

//タスク一覧を表示する
const taskIndex = () => {

    console.log(taskTitle);
    tasks.forEach((value, index) => {
        console.log(`${index} : [内容]${value.content}、[ジャンル]${value.genre}`);
    });
};

//タスクを追加する
const addTask = () => {

    //操作内容確認
    let confOpe = prompt('「確認,追加,削除,終了」の4つのいずれかを入力してください');

    //タスク入力・タスク一覧に追加
    let newContent = prompt('タスクを入力してください');
    let newGenre = prompt('ジャンルを入力してください');
    let newTask = {
        content: newContent,
        genre: newGenre,
    };
    tasks.push(newTask);
    alert('新しいタスクを追加しました');

    taskIndex();
    addTask();
};

taskIndex();
addTask();