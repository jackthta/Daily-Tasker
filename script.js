/* FUNCTIONS */
/*

    MAKE IT SO THAT WHEN YOU HOVER OFF THE >TASK'S DIV< THEN SHRINK THE OPTION MENU.

*/

function createIMG(picPath)
{
    let img = document.createElement("img");
        img.src = picPath;
    return img;
}

function createButtonWithIMG(picPath)
{
    let btn = document.createElement("button");
    btn.appendChild(createIMG(picPath));
    return btn;
}

function enablePointerEvent(e)
{
    e.currentTarget.style.pointerEvents = "all";
}

function disablePointerEvent(e)
{
    e.currentTarget.style.pointerEvents = "none";
}

function deleteTask(e)
{
    //Maybe modify this in the future to prompt the user for confirmation before actually deleting it.
    let thisTask = e.currentTarget.parentNode.parentNode;
    thisTask.parentNode.removeChild(thisTask);
}

function finishedTask(e)
{
    let thisTask = e.currentTarget.parentNode.parentNode;
    
    //Delete menu and complete buttons.
    let menuDiv = e.currentTarget.parentNode;
    while(menuDiv.firstChild)
    {
        menuDiv.removeChild(menuDiv.firstChild);
    }
    menuDiv.appendChild(createButtonWithIMG("img/close.svg"));
    menuDiv.firstChild.addEventListener("click", deleteTask, "e");
    menuDiv.firstChild.setAttribute("class", "delete-button in-option-button");
    menuDiv.firstChild.style.border = "1px solid #000";
    
    //Move task to finished task's container.
    thisTask.setAttribute("class", "fin-task-div div-standard");
    document.querySelector("#fin-tasks").appendChild(thisTask);
}

function shrinkOptions(e)
{
    //This function can only execute IF the menuDiv has been expanded === menuDiv childnode length > 1
    //Checks for if the menuDiv has more than one child, if it does then it
    //runs this function to shrink the options back to the menu button.
    
    //This menuDiv
    let thisMenuDiv = e.currentTarget;
    
    //Checks if the menu has expanded yet
    if (thisMenuDiv.childNodes.length > 1)
    {
        //Removes all buttons in the div.
        while(thisMenuDiv.firstChild)
        {
            thisMenuDiv.removeChild(thisMenuDiv.firstChild);
        }
        
        //Places back in the menu button.
        let taskMenu = createButtonWithIMG("img/list.svg");
        taskMenu.setAttribute("class", "menu-button");
        taskMenu.addEventListener("mouseover", expandOptions, "e");
        thisMenuDiv.appendChild(taskMenu);
    }
}

function expandOptions(e)
{
    //Checks for if the menuDiv has more than one child, if it does then it can't
    //run this function because it'll just create more than intended buttons.
    
    //This grabs the currently clicked button's parent node which is the menuDiv of that clicked button.
    let menuDiv = e.currentTarget.parentNode;
    
    if (menuDiv.childNodes.length === 1)
    {
        //Delete menu button
        menuDiv.removeChild(menuDiv.firstChild);
    
        //Create move button
        //let moveBtn = createButtonWithIMG("img/")

        //Create delete button
        let deleteBtn = createButtonWithIMG("img/close.svg");
            deleteBtn.setAttribute("class", "delete-button in-option-button");
            deleteBtn.style.marginRight = "10px";
            deleteBtn.addEventListener("click", deleteTask, "e");

        //Create finish button
        let finishBtn = createButtonWithIMG("img/check.svg");
            finishBtn.setAttribute("class", "finish-button in-option-button"); 
            finishBtn.addEventListener("click", finishedTask, "e");
        
        //Append the buttons to the menuDiv
        menuDiv.appendChild(deleteBtn);
        menuDiv.appendChild(finishBtn);
    }
}

function createNewTask()
{
    //This DIV contains the whole task including the option buttons AND textarea.
    let newTask = document.createElement("div");
        newTask.setAttribute("class", "task-div div-standard");
    
    //This TEXTAREA is where the user can type in their task.
    let taskText = document.createElement("textarea");
        taskText.setAttribute("class", "task-input");
        taskText.rows = "10";
        taskText.cols = "20";
        taskText.wrap = "soft";
        taskText.placeholder = "Type task here ...";
    newTask.appendChild(taskText);
    
    //This DIV contains the IMG buttons.
    let menuDiv = document.createElement("div");
        menuDiv.setAttribute("class", "option-menu");
        menuDiv.addEventListener("mouseleave", shrinkOptions, "e");
    
    //This is the button that users can click on.
    let taskMenu = createButtonWithIMG("img/list.svg");
        taskMenu.setAttribute("class", "menu-button");
        taskMenu.addEventListener("mouseover", expandOptions, "e");
        menuDiv.appendChild(taskMenu);
    
    //Once the button have been pushed into btnMenuDiv, append it to the task DIV.
    newTask.appendChild(menuDiv);
    
    //Add blank task into the task-container;
    document.querySelector("#tasks-container").appendChild(newTask);
}

function showFinishedTasks()
{
    let main = document.querySelector("main");
    main.style.gridTemplateAreas = '"new-task title date-time" "fin-container fin-container fin-container"';
    
    document.querySelector("#tasks-container").style.display = "none";
    document.querySelector("#fin-container").style.display = "flex";
    document.querySelector("#show-fin-tasks").innerHTML = "Hide Finished Tasks";
}

function hideFinishedTasks()
{
    let main = document.querySelector("main");
    main.style.gridTemplateAreas = '"new-task title date-time" "tasks-container tasks-container tasks-container"';
    
    document.querySelector("#fin-container").style.display = "none";
    document.querySelector("#tasks-container").style.display = "flex";
    document.querySelector("#show-fin-tasks").innerHTML = "Show Finished Tasks";
}

function isEllipsisActive(element)
{
    return !(element.offsetWidth < element.scrollWidth);
}

//Time Functions
function getTimeOfDay(hour)
{
    return (hour >= 12) ? 'AM' : 'PM';
}

function updateHeader(header, data)
{
    header.innerHTML = data;
}

function updateTime(now, header)
{
    //Obtain time and format.
    let hr = now.getHours();
    hr = hr > 12 ? '0' + (hr - 12) : hr; //12-hour clock
    let min = now.getMinutes();
    min = min < 10 ? '0' + min : min; //Prefixes minute with 0 if minute is less than 10.
    let sec = now.getSeconds();
    sec = sec < 10 ? '0' + sec : sec; //Prefixes second with 0 if second is less than 10.
    let timeOfDay = getTimeOfDay(hr);
    let userTime = hr + ':' + min + ':' + sec + ' ' + timeOfDay;
    
    //Update time.
    updateHeader(header, userTime);
}

function updateDate(now, header)
{
    //Obtain date and format.
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = now.getDate();
    day = day < 10 ? '0' + day : day; //Prefixes day with 0 if day is less than 10.
    let year = now.getFullYear();
    let userDate = month + '/' + day + '/' + year;
    
    //Update date
    updateHeader(header, userDate);
}
/* END OF FUNCTIONS */


//If ADD TASK button is clicked, create new task.
document.querySelector("#new-task button").onclick = function()
{
    createNewTask();
};

//If SHOW/HIDE FINISHED TASK button is clicked, show/hide fin-container.
let showFinBtn = document.querySelector("#show-fin-tasks");
showFinBtn.onclick = function()
{
    //Check if the button is in "SHOW" state or "HIDE" state.
    let isShowBtn = showFinBtn.innerHTML === "Show Finished Tasks";
    if (isShowBtn)
        showFinishedTasks();
    else
        hideFinishedTasks();
};

/* TITLE OPERATIONS */
let title = document.querySelector("#title input");
title.placeholder = 'Whose task list?';
title.maxLength = '20';

/* DATE AND TIME OPERATIONS */
//Refreshes the time every second to simulate a working clock.
setInterval('updateTime(new Date(), document.querySelector("#time"))', 1000);
//Update the date -- every second.
setInterval('updateDate(new Date(), document.querySelector("#date"))', 1000);