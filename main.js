'use strict';

const buttonAddTask = document.getElementById('button-add-task');
const newtaskCommentTd = document.getElementById('new-task-comment');
const taskList = document.getElementById('task-list');
//タスク一覧
const tasks = [];

//タスク追加・一覧表示
buttonAddTask.addEventListener('click', () => {

    //新規タスク追加
    let newTask = {
        comment: newtaskCommentTd.value,
        status: '作業中',
    };
    tasks.push(newTask);

    //入力欄の値をクリア
    newtaskCommentTd.value = "";

    showTaskList();
});

//タスク一覧の表示
const showTaskList = () => {

    //タスク一覧の表示クリア（ヘッダー除く）
    taskList.innerHTML = "";

    //タスク一覧の中身を表示
    tasks.forEach((task, index) => {
        const newTr = document.createElement('tr');

        //タスクのindexのtd要素を生成、trに追加
        const taskIndexTd = document.createElement('td');
        taskIndexTd.textContent = index;
        newTr.appendChild(taskIndexTd);

        //タスクのcommentのtdを作成、trに追加
        const taskCommentTd = document.createElement('td');
        taskCommentTd.textContent = task.comment;
        newTr.appendChild(taskCommentTd);

        //タスクのstatusボタンを作成、新規tdに追加、trに追加
        const taskStatusTd = document.createElement('td');
        const taskStatusBtn = document.createElement('button');
        taskStatusBtn.textContent = task.status;
        taskStatusTd.appendChild(taskStatusBtn);
        newTr.appendChild(taskStatusTd);

        //タスクの削除ボタンを作成、新規tdに追加、trに追加
        const taskDeleteTd = document.createElement('td');
        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.textContent = '削除';
        taskDeleteTd.appendChild(taskDeleteBtn);
        newTr.appendChild(taskDeleteTd);
        //削除ボタンを押すとタスクから削除、タスク一覧更新
        taskDeleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            showTaskList();
        });

        taskList.appendChild(newTr);
    });
};