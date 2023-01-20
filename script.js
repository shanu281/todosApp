let input = document.querySelector(".input-area");
let ul = document.querySelector(".ul");
let all = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let clear = document.querySelector(".clear");


let byDefault = all;

let allToDo = JSON.parse(localStorage.getItem("todo")) || [];

function handleDelete(event) {
  let id = event.target.dataset.id;
  allToDo.splice(id, 1);
  localStorage.setItem("todo", JSON.stringify(allToDo));
  createUI();
}

function handleToggle(event) {
  let id = event.target.dataset.id;
  allToDo[id].isDone = !allToDo[id].isDone;
  localStorage.setItem("todo", JSON.stringify(allToDo));
  createUI();
}

function elm(type, attr = {}){
  let element = document.createElement(type);
  for(let key in attr){
  if(key.startsWith('data-')){
    element.setAttribute(key, attr[key]);
  }else {
    element[key]= attr[key];
  }
}
  return element;
}

function createUI() {
  ul.innerHTML = "";
  allToDo.forEach((todo, index) => {
    let li = elm("li");
    let input = elm("input", {type: "checkbox", checked: todo.isDone, "data-id": index, });
    input.addEventListener("input", handleToggle);
  
    let p = elm("p" ,{innerText: todo.eventName});
    

    p.addEventListener("dblclick", (event) => {
      let input2 = elm("input" , {value: p.innerText,  });
      //input2.value = p.innerText;
      input.style.display = "none";
      span.style.display = "none";
      p.style.display = "none";
      input2.style.padding = "0.5rem 0rem";
      input2.style.fontSize = "1.25rem";


      li.append(input2);

      let submit = elm("button", {innerText: "Submit", });
      //submit.innerText = "Submit";
      submit.style.padding = "0.75rem 1rem";
      submit.style.fontWeight = "700";
      li.append(submit);

      submit.addEventListener("click", (event) => {
        p.innerText = input2.value;

        li.prepend(input);
        li.append(p);
        li.append(span)
        input.style.display = "block";
        p.style.display = "block";
        span.style.display = "block";
        todo.eventName = input2.value;

        input2.style.display = "none";
        submit.style.display = "none";
      })
    })

    if (input.checked === true) {
      p.style.textDecoration = "line-through";
    } else {
      p.style.textDecoration = "none";
    }

    active.addEventListener("click", (event) => {
      if (input.checked === false) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
      byDefault = "active";
      updateActiveButton();
    });

    completed.addEventListener("click", (event) => {
      if (input.checked === false) {
        li.style.display = "none";
      } else {
        li.style.display = "flex";
      }
      byDefault = "completed";
      updateActiveButton();
    });

    let span = elm("span", {innerText: "❌ ","data-id": index });
    //span.innerText = "❌ ";
    //span.setAttribute("data-id", index);
    span.addEventListener("click", handleDelete);

    li.append(input, p, span);
    ul.append(li);
  });
}

input.addEventListener("keyup", (event) => {
  let value = event.target.value;
  if (event.keyCode === 13 && value !== "") {
    let todo = {
      eventName: value,
      isDone: false,
    };
    allToDo.push(todo);
    event.target.value = "";
    createUI();
    localStorage.setItem("allToDo", JSON.stringify(allToDo));
  }

});

all.addEventListener("click", (event) => {
  allToDo.forEach((elm) => {
    createUI(elm);
  });
  byDefault = "all";
  updateActiveButton();
});

clear.addEventListener("click", () => {
  allToDo = allToDo.filter((todo) => !todo.isDone);
  createUI();
  byDefault = "clear";
  updateActiveButton();
  localStorage.setItem("todo", JSON.stringify(allToDo));

});

function updateActiveButton(btn = byDefault) {
  all.classList.remove("selected");
  active.classList.remove("selected");
  completed.classList.remove("selected");
  clear.classList.remove("selected");

  if (btn === "all") {
    all.classList.add("selected")
  }

 if (btn === "active") {
    active.classList.add("selected");
  }

  if (btn === "completed") {
    completed.classList.add("selected");
  }
 if(btn === "clear") {
    clear.classList.add("selected");
  } 

}
