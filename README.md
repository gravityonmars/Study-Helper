# Study Helper

A productivity focused web application designed to help users manage tasks and enter a deep focus state with a built-in timer. This app allows users to track their learning hours per subject and stores all data locally.

## Features

* Add tasks with specific subjects
* Persistent data storage using Local Storage
* High-intensity Focus Mode with a dark interface
* Glowing real-time countdown/count-up timer
* Track and display total time spent on each task
* Resume existing tasks to accumulate time
* Remove individual tasks from the grid

## Technologies Used

* HTML5
* CSS3 (Custom Grid Background and Glow Effects)
* JavaScript (Vanilla)
* Local Storage API

## Project Structure

```
learngrid-dashboard/
│
├── index.html
├── style.css
└── script.js

```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/learngrid-focus-dashboard.git

```

### 2. Run the Project

No build process is required. Simply open `index.html` in any modern web browser to start using the dashboard.

## Usage

* **Add Task:** Enter the subject name and the specific topic, then click "Add to Grid."
* **Start Focus:** Click the "Start" button on any task to enter Focus Mode. All distractions will disappear, and a glowing timer will track your session.
* **Finish Task:** Click "Finish Task" to exit the timer. The duration of your session will be added to the task's total time.
* **Delete Task:** Click the "×" button to permanently remove a task and its recorded time from your list.

## Future Improvements

* Sound notifications upon session completion
* Data export/import functionality
* Daily and weekly productivity charts
* Customizable focus session lengths
