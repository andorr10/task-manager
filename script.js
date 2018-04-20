const toDoListArray = [
  {
    name: "walk the dog",
    priorityLevel: "low",
    completed: false

  },
  {
    name: "take out the trash",
    priorityLevel: "medium",
    completed: false
  },
  {
    name: "finish taxes",
    priorityLevel: "high",
    completed: false
  },
  {
    name: "meal prep",
    priorityLevel: "medium",
    completed: true
  }
  ];


$(document).ready(function() { 


  $(document).on("click", ".delete", function(event) { 
      event.preventDefault; 
      let targetText = this.parentElement.firstChild.innerHTML;
      console.log("remove: "+targetText);


      toDoListArray.forEach(function(task){
        if(task.name == targetText) {
        task.completed = true;
        }
      });

      //const deletedItemArray = toDoListArray.filter((task) => task.name != targetText);
      const deletedItemArray = toDoListArray.filter((task) => task.completed === false);

      //console.log(deletedItemArray);
      buildList(deletedItemArray);
    }); 

    //console.log($(".importance-bubble").val());


    $(".new-task-add").on("click", function(event){
      event.preventDefault()
      console.log(this.parentElement.parentElement);
      let newTaskName = $("#task-name-input").val();
      let priorityLevel = $(".importance-bubble input:radio:checked").val() || "low";

      console.log("importance: "+priorityLevel);
      // console.log("Name: "+newTaskName);

      toDoListArray.push(
      {
        name: newTaskName,
        priorityLevel: priorityLevel,
        completed: false
      });
      const updatedArray = toDoListArray.filter((task) => task.completed === false)
      // console.log(updatedArray);
      $("#task-name-input").val("");
      $(".importance-bubble input:radio:checked").prop("checked",false)
      buildList(updatedArray);
    })



  $(".importance-filter").on("click", function(event){
    console.log("you filtered for " + this.value);
    arrayFilter(this.value);
    // const importanceFilter = toDoListArray.filter((task)=> task.completed===false).filter((task)=>task.priorityLevel===this.value);
    // buildList(importanceFilter);
  });

//--------------------GLOBAL FUNCTIONS TO MANIPULATE LISTS------------------------


  const arrayFilter = function(filterType){
        if (filterType==="none"){
          let importanceFilter = toDoListArray.filter((task)=> task.completed===false);
              buildList(importanceFilter);
        } 
        else if (filterType === "done"){
          let importanceFilter = toDoListArray.filter((task)=> task.completed===true);
          buildList(importanceFilter);
        }
        else {
          let importanceFilter = toDoListArray.filter((task)=> task.completed===false).filter((task)=>task.priorityLevel===filterType);
            buildList(importanceFilter);
        }
  }

  
function buildList(targetArray){
        const listSection = $("#listy");
        listSection.empty();
        console.log(targetArray);
        let index=0;
        let toDoListArray = targetArray;
        // toDoListArray.filter((task) => task.completed ===false).forEach(function(task){
        toDoListArray.forEach(function(task){
        let listItem = $("<li>")
        listItem.addClass("list-group-item");
        listItem.attr("value", toDoListArray[index].priorityLevel)
        listItem.addClass(`importance-${toDoListArray[index].priorityLevel}`)
        listItem.attr("data-place", index);
        listItem.append("<span style='float-left'>"+ toDoListArray[index].name + "</span>");
      
        listItem.append("<button class = 'btn-sm delete' data-attribute = " + index + "><icon class = 'fa fa-trash'></icon></button>");

        index++;
        listSection.append(listItem);
      })
}

    const starterArray = toDoListArray.filter((task)=> task.completed===false);
    buildList(starterArray);


});


