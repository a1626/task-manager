class TaskManager {

  constructor() {
    this.addListDialog = '.add-list-dialog';
    this.newList = 'new-list';
    this.boardMainBody = '.board-main-body';
    this.listTitle = 'input[name=listTitle]';
    this.listBorderColor = 'input[name=colorPicker]';
    this.listHeader = '.list-header';
    this.listBody = '.list-body';
    this.addTaskDialog = '.add-task-dialog';
    this.newTask = 'new-task';
    this.taskContainer = '.task-container';
    this.taskTitle = 'input[name=taskTitle]';
    this.taskDescription = 'textarea[name=taskDescription]';
    this.taskTitleContainer = '.task-title';
    this.taskDescriptionContainer = '.task-description';
    this.deleteTaskElement = 'delete-task';
    this.editTask = 'edit-task';
    this.editTaskDialog = '.edit-task-dialog';
    this.editTaskDescription = 'textarea[name=taskDescriptionEdit]';
    this.taskId = 1;
    this.currentEditElement = '';
    this.taskList = '';
  }

  closeAddListDialog() {
    document.querySelector(this.addListDialog).close();

  }


  addNewList() {
    this.closeAddListDialog();
    const list = document.getElementById(this.newList);
    const body = document.querySelector(this.boardMainBody);
    const clone = document.importNode(list.content, true);
    const title = document.querySelector(this.listTitle).value;
    const borderColor = document.querySelector(this.listBorderColor).value;
    let titleContainer = clone.querySelector(this.listHeader);
    titleContainer.textContent = title || titleContainer.textContent;
    clone.querySelector(this.listBody).style.borderColor = borderColor;
    body.appendChild(clone);
  }

  getElementByQuerySelector(query) {
    return document.querySelector(query);
  }

  openAddListDialog() {
    document.querySelector(this.listBorderColor).value = '#000';
    document.querySelector(this.listTitle).value = '';
    document.querySelector(this.addListDialog).showModal();
  }

  closeAddTaskDialog() {
    document.querySelector(this.addTaskDialog).close();
  }

  addNewTask() {
    this.closeAddTaskDialog();
    const task = document.getElementById(this.newTask);
    const clone = document.importNode(task.content, true);
    const title = document.querySelector(this.taskTitle).value;
    const description = document.querySelector(this.taskDescription).value;
    let titleContainer = clone.querySelector(this.taskTitleContainer);
    titleContainer.textContent = title || titleContainer.textContent;
    let descriptionContainer = clone.querySelector(this.taskDescriptionContainer);
    descriptionContainer.textContent = description || descriptionContainer.textContent;
    clone.getElementById(this.deleteTaskElement).addEventListener('click', e => this.deleteTask(e));
    clone.getElementById(this.editTask).addEventListener('click', e => this.openEditTaskDialog(e));
    clone.firstElementChild.setAttribute('id', `task${this.taskId}`);
    this.taskId++;
    this.taskList.appendChild(clone);
    this.taskList = '';
  }

  openAddTaskDialog(e) {
    document.querySelector(this.taskTitle).value = '';
    this.taskList = e.target.parentElement.previousElementSibling;
    document.querySelector(this.taskDescription).value = '';
    document.querySelector(this.addTaskDialog).showModal();
  }

  deleteTask(e) {
    const taskBody = e.target.parentElement.parentElement;
    const taskContainer = taskBody.parentElement;
    taskContainer.removeChild(taskBody);
  }

  closeEditTaskDialog() {
    document.querySelector(this.editTaskDialog).close();
  }

  openEditTaskDialog(e) {
    const taskBody = e.target.parentElement.parentElement;
    this.currentEditElement = taskBody.querySelector(this.this.taskDescriptionContainer);
    document.querySelector(this.editTaskDescription).value = this.currentEditElement.textContent;
    document.querySelector(this.editTaskDialog).showModal();
  }

  changeDescription() {
    this.closeEditTaskDialog();
    this.currentEditElement.textContent = document.querySelector(this.editTaskDescription).value;
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = 'move';
  }

  handleDrop(event) {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains(this.taskContainer.substring(1))) {
      const data = event.dataTransfer.getData("text/plain");
      target.appendChild(document.getElementById(data));
    }
  }

  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
}

const instance = new TaskManager();
