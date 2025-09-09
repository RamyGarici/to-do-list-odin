export default class Todo {
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = this.validatePriority(priority);
        this.completed = false;
        this.created = new Date();

    }
    toggleComplete(){
        this.completed = !this.completed;
    
    }

   validatePriority(priority){
    const valid = ['low','medium','high']
    return valid.includes(priority)? priority:'medium';
   }


  
}
