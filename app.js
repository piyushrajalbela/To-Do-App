document.addEventListener("DOMContentLoaded",function(){
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("task-btn-submit");
    const taskList = document.getElementById("task-list");
    const emptyImage =document.querySelector(".empty-image");
    const todosContainer=document.querySelector(".todos-container");
    const progressBar =  document.getElementById("progress");
    const progressNumbers =  document.getElementById("numbers");
    const cursor = document.querySelector(".cursor");
    const app = document.querySelector(".todo-app");


    const updateProgress = (checkCompletion=true) => {
        const totalTasks = taskList.querySelectorAll("li").length;
        const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;
        
        progressBar.style.width = totalTasks > 0 ? `${(completedTasks/totalTasks)*100}%`:"0%";

        progressNumbers.textContent = `${completedTasks}/${totalTasks}`;

    const saveTaskToLocalStorage = () => {
      const tasks = Array.from(taskList.querySelectorAll("li")).map(li => ({
        text: li.querySelector("span").textContent,
        completed: li.querySelector(".checkbox").checked
      }));
      localStorage.setItem("tasks",JSON.stringify(tasks));
    };
  

    const loadTasksFromLocalStorage = () => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(({text,completed}) => addTask(text,completed,false));
      updateProgress();
    };
    if(checkCompletion && totalTasks >0 && completedTasks === totalTasks) {
        Confetti();
    }
    };

document.addEventListener("mousemove", (e) => {
    cursor.style.left=e.pageX+"px";
    cursor.style.top=e.pageY+"px";
});
let mouseX = 0, mouseY = 0;      
    let cursorX = 0, cursorY = 0;  
    
    
    if (window.matchMedia("(hover:none)and (pointer:coarse)" ).matches){
      cursor.style.display="none";
      return;
    }

    document.addEventListener('mousemove', e => {
       
      mouseX = e.clientX;
      mouseY = e.clientY;
  
    function animate() {
      
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animate);
    }
    animate();
      
    app.addEventListener('mouseenter', () => {
      cursor.style.background = "#000";
      cursor.style.border="rgba(0, 200, 255, 0.8)";
    });

    app.addEventListener('mouseleave', () => {
      cursor.style.background =" #000";
    });
  }); 
    
    const addTask = (event) =>{
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) {
            return;
        }
        const li = document.createElement("li");
        li.innerHTML = `<input type ="checkbox" class = "checkbox">
        <span>${taskText} </span>
        <button class = "edit-btn"> <i class="fa-solid fa-pen"></i></button>
        <button class = "delete-btn"> <i class="fa-solid fa-trash"></i> </button> `;
           taskList.appendChild(li);
        taskInput.value="";
        updateProgress();
        saveTaskToLocalStorage();

        const checkbox = li.querySelector(".checkbox");
         checkbox.addEventListener("change",()=>{
        updateProgress();
        saveTaskToLocalStorage();
         });

        const editBtn = li.querySelector(".edit-btn");

        editBtn.addEventListener("click",()=>{
            if(!checkbox.checked){
                taskInput.value=li.querySelector("span").textContent;
                li.remove();
                updateProgress();
                saveTaskToLocalStorage();
            }
        })
        const deleteButton = li.querySelector(".delete-btn");
             deleteButton.addEventListener("click", ()=> {
                 li.remove();
                 updateProgress();
                 saveTaskToLocalStorage();
                 if(taskList.children.length===0){
                    printImage();
                 }
                 });
                };  
    addTaskBtn.addEventListener("click",addTask);
    taskInput.addEventListener("keypress",(e)=>{
        if(e.key === "Enter") {
            addTask(e);
        }
    })
    const emptySpace = () => {
        emptyImage.style.display = "none";
       
    } 
  addTaskBtn.addEventListener("click",emptySpace);
    updateProgress();
    saveTaskToLocalStorage();
      const printImage = () => {
        emptyImage.style.display = "inline";
        
      };
   
  loadTasksFromLocalStorage();      
});

const Confetti = () => {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);


  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
};