const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const subInput = document.getElementById('subInput');
const taskInput = document.getElementById('taskInput');
const homeView = document.getElementById('home-view');
const focusOverlay = document.getElementById('focus-overlay');
const timerDisplay = document.getElementById('timer');
const focusTitle = document.getElementById('focusTitle');
const finishBtn = document.getElementById('finishBtn');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let timerInt;
let totalSecs = 0;

function render() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    taskList.innerHTML = '';
    tasks.forEach((t, i) => {
    const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
                    <div>
                        <small style="color:var(--primary)">${t.sub}</small>
                        <h3>${t.name}</h3>
                    </div>
                    <button class="btn-start" data-index="${i}">Start</button>
                `;
                taskList.appendChild(item);
            });
        }

addBtn.addEventListener('click', () => {
    if(subInput.value && taskInput.value) {
        tasks.push({ sub: subInput.value, name: taskInput.value });
        subInput.value = ''; taskInput.value = '';
        render();
    }
});

taskList.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-start')) {
        const index = e.target.getAttribute('data-index');
        const task = tasks[index];
                
        homeView.style.display = 'none';
        focusOverlay.classList.add('active');
        focusTitle.innerText = task.name;
                
        totalSecs = 0;
        timerInt = setInterval(() => {
            totalSecs++;
            const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
            const s = (totalSecs % 60).toString().padStart(2, '0');
            timerDisplay.innerText = `${m}:${s}`;
        }, 1000);
    }
});

finishBtn.addEventListener('click', () => {
    clearInterval(timerInt);
    focusOverlay.classList.remove('active');
    homeView.style.display = 'block';
    timerDisplay.innerText = '00:00';
});

render();