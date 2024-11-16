
import fs from "fs/promises"

export function formatString(string, ...args) {
    return string.replace(/{([0-9]+)}/g, (match, index) => {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
};
  
export async function readJson(rutaJson){
    let file;
    let jsonFile;
    try{
        file = await fs.readFile(rutaJson,'utf-8');     
        jsonFile = JSON.parse(file)?? {tasks:[],count: 0} ;
        return jsonFile;
    }catch(error){
        if (error.code === 'ENOENT') {
            console.error('File does not exist');
            await fs.writeFile(rutaJson, JSON.stringify({tasks:[],count: 0}), 'utf-8');
            console.log('File created');
            
            file = await fs.readFile(rutaJson,'utf-8');
            jsonFile = JSON.parse(file);
            return jsonFile; 
          }
    }   
}

export async function addTaskToFile(file, description, status, rutaJson){   
      const {tasks, count} = file;
      const nowDate = getNowDate();
      const newTask = {id:count, description, status, createdAt: nowDate, updatedAt:nowDate};
      const newFile ={tasks:[...tasks, newTask], count:count+1} ;
      await fs.writeFile(rutaJson, JSON.stringify(newFile), 'utf-8');
      console.log('Task added');
}

function getNowDate (){
  const dateObject = new Date();
  const date = dateObject.toLocaleDateString();
  const fecha = dateObject.toLocaleTimeString("es-ES", {hour12: false});   
  return date +" "+fecha;
}

export async function updateTaskFile(file, id, description, status, rutaJson) {
      const {tasks, count} = file;
      const index = tasks.findIndex((task) => task.id == id);
      tasks[index].status = status; 
      tasks[index].updatedAt = getNowDate();
      tasks[index].description = description;
      await fs.writeFile(rutaJson, JSON.stringify({tasks, count}), "utf-8");
      console.log("Task updated in file");
}

export async function deleteTaskFile(file, id, rutaJson){
    const {tasks,count} = file;
    const newTasks = tasks.filter((task) => task.id != id);
    await fs.writeFile(rutaJson, JSON.stringify({tasks:newTasks, count:count-1}), "utf-8");
    console.log("Tasks deleted");
}

export async function isNotNull(string){
  if (string.length==0){
    return false;
  }
  return true;
}