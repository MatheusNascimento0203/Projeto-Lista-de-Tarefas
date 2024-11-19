const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".task-list-container");

const validadeInput = () => {
  return inputElement.value.trim().length > 0;
};

const handleAddTask = () => {
  const inputIsValid = validadeInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  // CRIANDO DIV
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  // CRIANDO PARAGRAFO E SETANDO SEU CONTEÚDO
  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  //ADICIONANDO EVENTO DE CLICK
  taskContent.addEventListener("click", () => {
    handleClik(taskContent);
  });

  //CRIANDO BOTÃO DE EXCLUSÃO
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-solid");
  deleteItem.classList.add("fa-trash-can");

  //ADICIONANDO EVENTO DE CLICK
  deleteItem.addEventListener("click", () => {
    handleDeleteClick(taskItemContainer, taskContent);
  });

  //ADICIONANDO O PARAGRAFO E O BOTÃO AO CONTAINER
  taskItemContainer.append(taskContent, deleteItem);
  taskContainer.appendChild(taskItemContainer);

  //LIMPAR O INPUT
  inputElement.value = "";

  updateLocalStorage();
};

const handleClik = (taskContent) => {
  const tasks = taskContainer.childNodes; //PEGA TODOS OS FILHOS DO CONTAINER

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = taskContainer.childNodes; //PEGA TODOS OS FILHOS DO CONTAINER

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = taskContainer.childNodes; //PEGA TODOS OS FILHOS DO CONTAINER

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted: isCompleted };
  });

  localStorage.setItem("taskss", JSON.stringify(localStorageTasks));
};

const refreshTasks = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("taskss"));

  for (const task of tasksFromLocalStorage) {
    // CRIANDO DIV
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    // CRIANDO PARAGRAFO E SETANDO SEU CONTEÚDO
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    //ADICIONANDO EVENTO DE CLICK
    taskContent.addEventListener("click", () => {
      handleClik(taskContent);
    });

    //CRIANDO BOTÃO DE EXCLUSÃO
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    //ADICIONANDO EVENTO DE CLICK
    deleteItem.addEventListener("click", () => {
      handleDeleteClick(taskItemContainer, taskContent);
    });

    //ADICIONANDO O PARAGRAFO E O BOTÃO AO CONTAINER
    taskItemContainer.append(taskContent, deleteItem);
    taskContainer.appendChild(taskItemContainer);
  }
};

refreshTasks();

addTaskButton.addEventListener("click", () => {
  handleAddTask();
});

inputElement.addEventListener("change", () => {
  handleInputChange();
});
