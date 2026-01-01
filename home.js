const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const subInput = document.getElementById('subInput');
const taskInput = document.getElementById('taskInput');
const homeView = document.getElementById('home-view');
const focusOverlay = document.getElementById('focus-overlay');
const timerDisplay = document.getElementById('timer');
const focusTitle = document.getElementById('focusTitle');
const finishBtn = document.getElementById('finishBtn');

let tasks = JSON.parse(localStorage.getItem('learnGridData')) || [];
let timerInt;
let sessionSecs = 0;
let activeIdx = null;

function format(s){
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

function render(){
    localStorage.setItem('learnGridData', JSON.stringify(tasks));
    taskList.innerHTML = '';
    tasks.forEach((t, i) => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <div>
                <small style="color:var(--primary); font-weight:700;">${t.sub.toUpperCase()}</small>
                <h3>${t.name}</h3>
            </div>
            <div class="action-group">
                ${t.totalTime > 0 ? `<div class="time-display">${format(t.totalTime)}</div>` : ''}
                <button class="btn-start" data-index="${i}" data-action="start">
                    ${t.totalTime > 0 ? 'Resume' : 'Start'}
                </button>
                <button class="btn-remove" data-index="${i}" data-action="delete">×</button>
            </div>
        `;
        taskList.appendChild(item);
    });
}

addBtn.addEventListener('click', () => {
    if(subInput.value.trim() && taskInput.value.trim()) {
        tasks.push({ sub: subInput.value, name: taskInput.value, totalTime: 0 });
        subInput.value = ''; taskInput.value = '';
        render();
    }
});

taskList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if(!btn) return;
    const idx = btn.dataset.index;
    const act = btn.dataset.action;

    if(act === 'delete') {
        tasks.splice(idx, 1);
        render();
    } else if(act === 'start') {
        activeIdx = idx;
        homeView.style.display = 'none';
        focusOverlay.classList.add('active');
        focusTitle.innerText = tasks[idx].name;
        sessionSecs = 0;
        timerInt = setInterval(() => {
            sessionSecs++;
            timerDisplay.innerText = format(sessionSecs);
        }, 1000);
    }
});

finishBtn.addEventListener('click', () => {
    clearInterval(timerInt);
    if(activeIdx !== null) tasks[activeIdx].totalTime += sessionSecs;
    focusOverlay.classList.remove('active');
    homeView.style.display = 'block';
    timerDisplay.innerText = '00:00';
    activeIdx = null;
    render();
});

render();