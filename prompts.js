import inquirer from "inquirer";

inquirer.registerPrompt("initPrompt",
    [
        {
            "type":"rawlist",
            "name":"option",
            "message":"¿Qué deseas hacer?",
            "choices":[
                    {
                        "name":"List tasks",
                        "value":0
                    },
                    {
                        "name":"Add taks",
                        "value":1
                    },
                    {
                        "name":"Update tasks",
                        "value":2
                    },
                    {
                        "name":"Update tasks",
                        "value":3
                    }
                ]
        }
    ] );
inquirer.registerPrompt("addTaskPrompt", 
    [
        {
            "type":"input",
            "name":"description",
            "message":"Task description?"
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
    ]
);

inquirer.registerPrompt("enterIdPrompt", {
    "type":"input",
    "name":"id",
    "message":"Enter Task ID:"
});

export default inquirer;