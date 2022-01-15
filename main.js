'use strict';

const taskTitle = `============================
現在持っているタスクの一覧
============================`;

//タスク初期値
const tasks = newArray('掃除', '買い物', '散歩');

//タスク一覧を表示する
const taskIndex = () => {
    console.log(taskTitle);
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i} : ${tasks[i]}`);
    }
};

//タスクを追加する
const addTask = () => {
    //操作内容確認
    let confOpe = prompt('「確認,追加,削除,終了」の4つのいずれかを入力してください');
    //タスク入力・タスク一覧に追加
    let newTask = prompt('タスクを入力してください');
    tasks.push(newTask);
    alert('新しいタスクを追加しました');

    taskIndex();
    addTask();
};

//1回目の処理
taskIndex();
addTask();