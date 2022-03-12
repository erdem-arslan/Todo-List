const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {// Tüm event listenerlar
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos);
}

    function clearAllTodos(e) {
        if(confirm("Tümünü silmek istediğinize eminmisiniz?")){
            // arayüzden todoları silme
            // todoList.innerHTML="";  //yavaş çalışır
            while (todoList.firstElementChild != null) {
                todoList.removeChild(todoList.firstElementChild);
            }
            localStorage.removeItem("todos")
        }
    }





    function filterTodos(e) {
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item")

    listItems.forEach(function (listItem) {
        const text=listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue)===-1 /* bulamadı */ ) {
            listItem.setAttribute("style","display:none !important")
        }
        else{
            listItem.setAttribute("style","display:block")
        }
    })
}











    function deleteTodo(e) {
        if (e.target.className==="fa fa-remove") {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
            showAlert("success" , "Todo başarılı bir şekilde silindi...")
        }

    }
function deleteTodoFromStorage(deletetodo) {
    let todos= getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo===deletetodo) {
            todos.splice(index,1);
        }

    })

    localStorage.setItem("todos",JSON.stringify(todos));
}







function loadAllTodosToUI() {   // local storage deki kayıtlı bilgileri sayfa yenilendiğinde tekrar göstermek
    let todos=getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })
}
function addTodo(e) {   // alert -  mesajlar
    const newTodo=todoInput.value.trim(); // gereksiz boslukları silme islemi trim


    if (newTodo === "") {
        showAlert("danger","lütfen bir todo giriniz...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success",`Todo başarıyla eklendi...`)
    }
    e.preventDefault();
}
function getTodosFromStorage() { //storage den todoları alma

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }

    return todos;
}
function addTodoToStorage(newTodo) { // locale ekleme
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));


}

function showAlert(type,message) {
    const alert=document.createElement("div")
    alert.className= `alert alert-${type}`; 
    alert.textContent=message;

    firstCardBody.appendChild(alert)

// SetTimeOut

setTimeout(function(){
    alert.remove();
 },1500);

}










function addTodoToUI(newTodo) { // string değeri list iitem olarak UI'ye ekleyecek
    
    /*<!-- <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>

</li>-->*/

    //list item olusturma
    const listItem=document.createElement("li");
    //link olusturma
    const link=document.createElement("a");
    link.href="#"
    link.className="delete-item"
    link.innerHTML="<i class = 'fa fa-remove'></i>"


    listItem.className="list-group-item d-flex justify-content-between";
    //text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //todoliste listıtemi ekleme
    todoList.appendChild(listItem)
    todoInput.value=""
   



}