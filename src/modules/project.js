export default class Project{
    constructor(name){
        this.name=name;
        this.todos=[];
    }

    addTodo(todo){
        this.todos.push(todo);
        
    }

    removeTodo(index){
        this.todos.splice(index,1);
    }

    getTodo(index){
        return this.todos[index];
    }
     updateTodo(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
    }
  }
    

    getAllTodos(){
        return this.todos;
    }

    getCompletedTodos(){
        return this.todos.filter(toto=>todo.completed)
    }

    getPendingTodos(){
        return this.todos.filter(toto=>!todo.completed)
    }






}