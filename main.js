'use strict';

const buttonAddTask = document.getElementById('button-add-task');
const newtaskCommentTd = document.getElementById('new-task-comment');
const taskList = document.getElementById('task-list');
const filterStatus = document.getElementsByName('filter-status');
//タスク一覧
const tasks = [];

//タスク追加・一覧表示
buttonAddTask.addEventListener('click', () => {

    //新規タスク追加
    const newTask = {
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
        //statusボタンを押すと、タスクの状態（作業中⇔完了）変化
        taskStatusBtn.addEventListener('click', () => {
            if (tasks[index].status === '作業中') {
                tasks[index].status = '完了';
            } else if (tasks[index].status === '完了') {
                tasks[index].status = '作業中';
            }
            showTaskList();
        });

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

        //ラジオボタンの選択項目（すべて、作業中、完了）で表示要素を変える
        //すべての場合
        if (filterStatus[0].checked) {
            newTr.style.display = 'visible';
            //作業中の場合
        } else if (filterStatus[1].checked) {
            //完了の項目を非表示
            if (tasks[index].status === '完了') {
                newTr.style.display = 'none';
            }
            //完了の場合
        } else if (filterStatus[2].checked) {
            //作業中の項目を非表示
            if (tasks[index].status === '作業中') {
                newTr.style.display = 'none';
            }
        }
    });
};

//ラジオボタンの選択項目（すべて、作業中、完了）が変化した時にタスク一覧を再読み込み
filterStatus.forEach((e) => {
    e.addEventListener('change', () => {
        showTaskList();
    });
});
