import inquirer from "./prompts.js";
import {formatString, readJson, addTaskToFile, updateTaskFile, deleteTaskFile, isNotNull} from "./helpers.js"
main();


async function  main(){
    const rutaJson = "./data.json";
    const file = await readJson(rutaJson);
    init(file, rutaJson);
}

async function init(file, rutaJson){
    try{    
        const {option} =  await inquirer.prompt(
            [
                {
                    "type":"rawlist",
                    "name":"option",
                    "message":"¿What do you want to do?",
                    "choices":[
                            {
                                "name":"List tasks",
                                "value":0
                            },
                            {
                                "name":"Add task",
                                "value":1
                            },
                            {
                                "name":"Update task",
                                "value":2
                            },
                            {
                                "name":"Delete task",
                                "value":3
                            }
                        ]
                }
            ]
        );

        switch(option){
            case 0: await listTask(file); break;
            case 1: await addTask(file, rutaJson); break;
            case 2: await updateTask(file, rutaJson); break;
            case 3: await deleteTask(file, rutaJson); break;
        }    
    }catch(error){
        console.error(error);
    }
}

async function listTask(file){
    try {
        const {tasks} = file;
        if (tasks.length === 0) {
            console.log('No tasks yet');
            return;
        }
        
        console.log('id - description - status - createdAt - updatedAt');
        tasks.forEach(e => {
            console.log(formatString(`{0} - {1} - {2} - {3} - {4}`, e.id, e.description, e.status, e.createdAt, e.updatedAt));
        });
                
    } catch (error) {
        console.error(error);
    }
}

async function addTask(file, rutaJson){
    try {
        const {description, status} = await inquirer.prompt(
            [
                {
                    "type":"input",
                    "name":"description",
                    "message":"Task description?",
                    "validate": isNotNull
                },
                {
                    "type":"list",
                    "name":"status",
                    "message":"Task status?",
                    "choices":[
                            {"name":"in-backlog","value":"in-backlog"},
                            {"name":"in-progress","value":"in-progress"},
                            {"name":"done","value":"done"}
                        ]
                }
            ]);

            addTaskToFile(file, description, status, rutaJson);
    } catch (error) {
        console.error(error);
    }
}

async function updateTask(file, rutaJson){

    try {
        const {tasks} = file;
        const {id} = await inquirer.prompt([{
            "type":"input",
            "name":"id",
            "message":"Enter Task ID",
            "validate": isNotNull
        }]);
        const index = tasks.findIndex((task) => task.id == id);
        if(index < 0){
            console.error('ID Not Valid');
            return;
        }
        const {description, status} = await inquirer.prompt(
            [
                {
                    "type":"input",
                    "name":"description",
                    "message":"Description:",
                    "default": tasks[index].description,
                    "validate":isNotNull
                },{
                    "type":"list",
                    "name":"status",
                    "message":"Status:",
                    "choices":[
                            {"name":"in-backlog","value":"in-backlog"},
                            {"name":"in-progress","value":"in-progress"},
                            {"name":"done","value":"done"}
                        ]
                }
            ]
        );
        updateTaskFile(file, id, description, status, rutaJson);
    } catch(error) {
        console.error(error);
    }
}

async function deleteTask(file, rutaJson){
    try {
        const {tasks} = file;
        const {id} = await inquirer.prompt([{
            "type":"input",
            "name":"id",
            "message":"Enter Task ID",
            "validate":isNotNull         
        }]);
        const index = tasks.findIndex((task) => task.id == id);
        if(index < 0){
            console.error('ID Not Valid');
            return;
        }        
        deleteTaskFile(file, id, rutaJson);
    } catch(error) {
        console.error(error);
    }
}