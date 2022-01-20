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
    while (taskList.rows[1]) taskList.deleteRow(1);

    //タスク一覧の表示
    tasks.forEach((value, index) => {
        let newTr = document.createElement('tr');
        newTr.innerHTML = `<td>${index}</td>
                        <td>${value.comment}</td>
                        <td><button type="button">${value.status}</button></td>
                        <td><button type="button" id="delete-${index}">削除</button></td>`;
        taskList.appendChild(newTr);
    })
};