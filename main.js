'use strict';

const buttonAddTask = document.getElementById('button-addtask');
const newTaskComment = document.getElementById('new-task-comment');
const taskList = document.getElementById('task-list');
//タスク一覧
const tasks = [];

//タスク追加・一覧表示
buttonAddTask.addEventListener('click', () => {

    //新規タスク追加
    let newTask = {
        comment: newTaskComment.value,
        status: '作業中',
    };
    tasks.push(newTask);

    showTaskList();
});

//タスク一覧の表示
const showTaskList = () => {

    //タスク一覧の表示クリア（ヘッダー除く）
    taskList.innerHTML = "";

    //タスク一覧の中身を表示
    tasks.forEach((task, index) => {
        const newTr = document.createElement('tr');
        newTr.innerHTML = `<td>${index}</td>
                        <td>${task.comment}</td>
                        <td><button type="button">${task.status}</button></td>
                        <td><button type="button" id="delete-${index}">削除</button></td>`;
        taskList.appendChild(newTr);
    });
};