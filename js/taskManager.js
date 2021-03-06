// Individual Task object class
class taskObject {
    constructor(tId, tName, tDescription, tAssignee, tDate, tStatus, tPriority) {
        this.tId = tId;
        this.tName = tName;
        this.tDescription = tDescription;
        this.tAssignee = tAssignee;
        this.tDate = tDate;
        this.tStatus = tStatus;
        this.tPriority = tPriority;
    }
}

// Task Manager Object
class taskManager {
    constructor() {
        this.taskManagerList = [];
    }

    // Function getAllTasks retruns list of all tasks
    getAllTasks() {
        if (this.taskManagerList.length == 0) alert("Empty taskManagerList !!")
        else return this.taskManagerList;
    }

    // Return the task when requested using an ID field 
    getTaskById(id) {
        for (let i = 0; i < this.taskManagerList.length; i++) {
            if (this.taskManagerList[i].tId == id) return this.taskManagerList[i];
            else console.log(`id:${id} not found in TaskList.`)
        }
    }

    // Return the task when requested using an ID field 
    deleteTaskById(id) {
            for (let i = 0; i < this.taskManagerList.length; i++) {
                if (this.taskManagerList[i].tId == id) {
                    this.taskManagerList.splice(i, 1);
                    console.log(this.taskManagerList)
                    window.localStorage.setItem('tasks', JSON.stringify(this.taskManagerList));
                    return this.taskManagerList;
                } else console.log(`id:${id} not found in TaskList.`);
            }
        }
        // Return the task when requested using an ID field
    editTaskById(id) {
        for (let i = 0; i < this.taskManagerList.length; i++) {
            if (this.taskManagerList[i].tId == id) {
                return this.taskManagerList[i];
            } else console.log(`id:${id} not found in TaskList.`);
        }
    }

    // Function addTask adds task to back of aray object
    addTask(task) {
        return this.taskManagerList.push(task);
    }

    // Function deleteTask deletes task from task list
    deleteTask(task) {
            return this.taskManagerList.pop();
        }
        // Function updateTask updates the task status
    updateTask(taskId, status) {
            for (let i = 0; i < this.taskManagerList.length; i++) {
                if (i.Id == taskId) i.tStatus = status
            }
            return this.taskManagerList;
        }
        // Function assignTask updates assignee to task
    assignTask(taskId, assignee) {
        for (let i = 0; i < this.taskManagerList.length; i++) {
            if (i.Id == taskId) i.tAssignee = assignee;
        }
        return this.taskManagerList;
    }

    save(currentId) {
        console.log("------- Saving Task and Id --------- ")
        window.localStorage.setItem('tasks', JSON.stringify(this.taskManagerList));

        // Store the currentId in localStorage
        window.localStorage.setItem('currentId', String(currentId));
    }

    load() {
        // Check if any tasks are saved in localStorage
        if (window.localStorage.getItem('tasks')) {
            // Convert it to an array and store it in our TaskManager
            let Id;
            console.log("------- Load Task --------- ")
            this.taskManagerList = JSON.parse(localStorage.getItem('tasks'));
            console.log(this.taskManagerList);


            // Check if the currentId is saved in localStorage
            if (window.localStorage.getItem('currentId')) {
                // Convert the currentId to a number and store it in our TaskManager
                Id = Number(window.localStorage.getItem('currentId'));
                console.log(`Retriveing ID from Local Storage: ${Id}`);
            }
            return (this.taskManagerList.length == 0) ? [false] : [true, Id];
        } else {
            return [false];
        }

    }

    edit(currentId, modTask) {
        console.log("------- editting task      --------- ")
        let editTask = JSON.parse(localStorage.getItem('tasks'));
        for (let idx = 0; idx < editTask.length; idx++) {
            if (editTask[idx].tId == currentId) {
                console.log(`Edit Task inserting modified: ${modTask}`);
                editTask[idx] = modTask;
            }

            window.localStorage.setItem('tasks', JSON.stringify(editTask));

            // Store the currentId in localStorage
            window.localStorage.setItem('currentId', String(currentId));
        }
    }
}
