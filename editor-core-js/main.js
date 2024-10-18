// Make the toolbar items draggable

main_panel_collapse();
var newElement = null;
var old_Backgroundcolor = 0;
var parent_element = null;
document.addEventListener("DOMContentLoaded", () => {
  interact(".draggable").draggable({
    inertia: true,
    autoScroll: true,
    onstart(event) {
      event.target.classList.add("dragging");
      event.target.style.transition = 'none';
    },
    onend(event) {
      event.target.classList.remove("dragging");
      event.target.style.transition = '0.4s ease-in-out';
    },
    onmove(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
  });

  // Dropzones: Enable columns to accept dropped items
  interact(
    ".super_container, ._section, ._container, ._12_4devider1, ._12_2devider1, ._12_2devider2, ._12_3devider1, ._12_4devider, ._12_1devider, ._12_1devider1, ._row , .flex_row_container"
  ).dropzone({
    accept: ".draggable", // Accept only elements with 'draggable' class
    overlap: 0.5, // Item must be at least 50% over the dropzone
    ondropactivate(event) {
      event.target.classList.add("drop-active");
    },
    ondropdeactivate(event) {
      event.target.classList.remove("drop-active");
    },
    ondragenter(event) {
      const dropzoneElement = event.target;
      const draggableElement = event.relatedTarget;

      // Add hover effect when draggable enters the dropzone (20% overlap)
      dropzoneElement.classList.add("drop-active");
    },
    ondragleave(event) {
      const dropzoneElement = event.target;

      // Remove hover effect when draggable leaves the dropzone
      dropzoneElement.classList.remove("drop-active");
    },
    ondrop(event) {
      const draggableElement = event.relatedTarget; // The dragged item
      const dropzoneElement = event.target; // The dropzone where it's dropped

      // Ensure draggableElement doesn't get appended twice
      if (!dropzoneElement.contains(draggableElement)) {
        // Remove dragging class and reset transformation
        draggableElement.classList.remove("dragging");
        draggableElement.style.transform = "none";
        draggableElement.removeAttribute("data-x");
        draggableElement.removeAttribute("data-y");

        // Determine the type of the draggable element
        const type = draggableElement.dataset.type;
        // Logic for creating new elements based on type
        if (type === "text") {
          newElement = document.createElement("p");
          newElement.textContent = "New Paragraph";
        } else if (type === "image") {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.onchange = function (e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
              const img = document.createElement("img");
              img.src = event.target.result;
              img.className = "img-preview";
              dropzoneElement.appendChild(img); // Append image to dropzone
              makeDraggableAndResizable(img, dropzoneElement);
              fileInput.style.display = "none";
            };
            reader.readAsDataURL(file);
          };
          newElement = fileInput;
        } else if (type === "button") {
          newElement = document.createElement("button");
          newElement.innerText = "button1";
          newElement.className = "btn btn-primary";
        } else if (type === "section") {
          newElement = document.createElement("section");
          newElement.classList.add("_section");
          newElement.style.minHeight = "100px";
        } else if (type === "container") {
          newElement = document.createElement("div");
          newElement.classList.add("container");
          newElement.classList.add("_container");
          newElement.textContent = "New Container";
          newElement.style.minHeight = "100px";
        } else if (type === "row") {
          newElement = document.createElement("div");
          newElement.classList.add("row");
          newElement.classList.add("_row");
          newElement.textContent = "New Row";
          newElement.style.minHeight = "100px";
          newElement.style.width = "100%";
        } else if (type === "flexRow") {
          newElement = document.createElement("div");
          newElement.classList.add("d-flex");
          newElement.classList.add("flex_row_container");
          newElement.style.minHeight = "100px";
          newElement.style.width = "100%";
        } else if (type === "12_2_devider") {
          const newdevider12_2 = document.createElement("div");
          newdevider12_2.classList.add("row", "_row");

          const new_first_div = document.createElement("div");
          new_first_div.classList.add("col-md-6", "col-12", "_12_2devider1");
          new_first_div.style.minHeight = "100px";

          const new_second_div = document.createElement("div");
          new_second_div.classList.add("col-md-6", "col-12", "_12_2devider2");
          new_second_div.style.minHeight = "100px";

          newdevider12_2.appendChild(new_first_div);
          newdevider12_2.appendChild(new_second_div);

          newElement = newdevider12_2;
        } else if (type === "12_3_devider") {
          const newdevider12_3 = document.createElement("div");
          newdevider12_3.classList.add("row", "_row");

          const new_first_div = document.createElement("div");
          new_first_div.classList.add("col-md-4", "col-12", "_12_3devider1");

          new_first_div.style.minHeight = "100px";

          const new_second_div = document.createElement("div");
          new_second_div.classList.add("col-md-4", "col-12", "_12_2devider2");

          new_second_div.style.minHeight = "100px";

          const new_third_div = document.createElement("div");
          new_third_div.classList.add("col-md-4", "col-12", "_12_2devider2");

          new_third_div.style.minHeight = "100px";

          newdevider12_3.appendChild(new_first_div);
          newdevider12_3.appendChild(new_second_div);
          newdevider12_3.appendChild(new_third_div);

          newElement = newdevider12_3;
        } else if (type === "12_4_devider") {
          const newdevider12_4 = document.createElement("div");
          newdevider12_4.classList.add("row", "_row");

          const new_first_div = document.createElement("div");
          new_first_div.classList.add("col-md-3", "col-12", "_12_4devider1");

          new_first_div.style.minHeight = "100px";

          const new_second_div = document.createElement("div");
          new_second_div.classList.add("col-md-3", "col-12", "_12_2devider2");

          new_second_div.style.minHeight = "100px";

          const new_third_div = document.createElement("div");
          new_third_div.classList.add("col-md-3", "col-12", "_12_2devider2");

          new_third_div.style.minHeight = "100px";

          const new_fourth_div = document.createElement("div");
          new_fourth_div.classList.add("col-md-3", "col-12", "_12_2devider2");

          new_fourth_div.style.minHeight = "100px";

          newdevider12_4.appendChild(new_first_div);
          newdevider12_4.appendChild(new_second_div);
          newdevider12_4.appendChild(new_third_div);
          newdevider12_4.appendChild(new_fourth_div);

          newElement = newdevider12_4;
        } else if (type === "12_1_devider") {
          const newdevider12_1 = document.createElement("div");
          newdevider12_1.classList.add("row", "_row");

          const new_first_div = document.createElement("div");
          new_first_div.classList.add("col-md-12", "col-12", "_12_1devider1");

          new_first_div.style.minHeight = "100px";

          newdevider12_1.appendChild(new_first_div);

          newElement = newdevider12_1;
        }
        // Append the new element to the dropzone
        dropzoneElement.appendChild(newElement);

        // Make the new element draggable and resizable
        makeDraggableAndResizable(newElement, dropzoneElement);

        // on hover on element function
        mouse_Enter_and_Leave_on_element(newElement);


        // Add click event for deletion and style customization
        newElement.onclick = function (e) {
          selectElementForDeletion(e);
          selectElementForCustomize(e);
        };

        // Stop event propagation to prevent bubbling
        event.stopPropagation();
      } else {
        // Handle moving the element within the same dropzone
        dropzoneElement.appendChild(draggableElement);
      }
    },
  });
});

// Function to handle element selection for deletion
function selectElementForDeletion(element) {
  // Remove the selected class from any previously selected element
  var selectedElement = null;
  document.querySelectorAll('.selected').forEach((selected) =>{
    selected.classList.remove('selected');
  }) // To keep track of the currently selected element
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }

  // Set the clicked element as the selected element
  selectedElement = element;
  selectedElement.target.classList.add("selected");

  // Show the delete button in the toolbar
  document.getElementById("delete-button").style.display = "block";
  // Handle delete button click
  document.getElementById("delete-button").onclick = function () {
    if (selectedElement.target) {
      console.log("deleted");
      selectedElement.target.remove(); // Remove the selected element
      selectedElement = null; // Clear the selected element
      this.style.display = "none"; // Hide the delete button
    }
  };
}

// Function to handle element customization like background color and background imag and so on
function selectElementForCustomize(element) {
  // get parent of element because when i click on element hover layer would selected not element it self
  
  get_all_user_customization_for_element(element);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function makeDraggableAndResizable(element, dropzoneElement) {
  // Draggable within the dropzone
  interact(element)
    .draggable({
      modifiers: [
        interact.modifiers.restrict({
          restriction: dropzoneElement, // Restrict movement within the dropzone
          endOnly: true,
        }),
      ],
      onmove(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    })
    .resizable({
      edges: {
        left:
         false,
        right:
         false,
        bottom: false,
        top: false,
      },
      listeners: {
        move(event) {
          const target = event.target;
          let { width, height } = event.rect;

          // Update the element's style
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
        },
      },
    });
    // .resizable({
    //   edges: {
    //     left:
    //       element.classList.contains("_row") ||
    //       element.classList.contains("_section")
    //         ? false
    //         : true,
    //     right:
    //       element.classList.contains("_row") ||
    //       element.classList.contains("_section")
    //         ? false
    //         : true,
    //     bottom: true,
    //     top: true,
    //   },
    //   listeners: {
    //     move(event) {
    //       const target = event.target;
    //       let { width, height } = event.rect;

    //       // Update the element's style
    //       target.style.width = `${width}px`;
    //       target.style.height = `${height}px`;
    //     },
    //   },
    // });
     

  // Resizable from the edges and corners
}

let currentlyEditableElement = null; // Global variable to track currently selected element

//this event listener for super_container when clicked
document.querySelector(".super_container")
  .addEventListener("click", function (e) {
    selectElementForCustomize(e);
  });


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function get_all_user_customization_for_element(element) {
  if (element.target.classList.contains("flex_row_container")) {
    document
      .getElementById("justifyContent")
      .addEventListener("change", function () {
        document.querySelector(".flex_row_container").style.justifyContent =
          this.value;
      });

    document
      .getElementById("alignItems")
      .addEventListener("change", function () {
        document.querySelector(".flex_row_container").style.alignItems =
          this.value;
      });

    document
      .getElementById("flexDirection")
      .addEventListener("change", function () {
        console.log(this.value);
        document.querySelector(".flex_row_container").style.flexDirection =
          this.value;
      });
  }

  const editableElement = element.target;

  // Update the global variable with the newly selected element
  currentlyEditableElement = editableElement;

  const colorPicker = document.getElementById("colorPicker");

  // Remove any previous event listeners to prevent multiple elements being colored
  const newColorPicker = colorPicker.cloneNode(true);
  colorPicker.parentNode.replaceChild(newColorPicker, colorPicker);

  // Add color picker functionality for the currently selected element only
  newColorPicker.addEventListener("input", function () {
    const selectedColor = this.value;
    currentlyEditableElement.style.backgroundColor = selectedColor;
    let delete_style_btn = document.getElementById('delete-style');
    delete_style_btn.classList.remove('deleteStyle-btn');
    delete_style_btn.classList.add('deleteStyle-btn-active');
    delete_style_btn.addEventListener('click' , (e)=>{
      currentlyEditableElement.style['backgroundColor'] = '';
      delete_style_btn.classList.add('deleteStyle-btn');
    })
  });

  // Alignment functionality
  document.getElementById("alignLeft").addEventListener("click", function () {
    currentlyEditableElement.style.textAlign = "left";
  });

  document.getElementById("alignCenter").addEventListener("click", function () {
    currentlyEditableElement.style.textAlign = "center";
  });

  document.getElementById("alignRight").addEventListener("click", function () {
    currentlyEditableElement.style.textAlign = "right";
  });
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mouse_Enter_and_Leave_on_element(element) {
  let current_element = element;

  current_element.addEventListener("mouseenter", (event) => {
    current_element.style.border = "2px dashed black";
    let children_list = current_element.children;
    if(children_list){
      let childrenArray = Array.from(children_list);

      childrenArray.forEach((child) => {
        child.style.border = "1px solid black";
      });
    }
   
    old_Backgroundcolor = current_element.style.backgroundColor;
    current_element.classList.add("hover_overlay");
    if(current_element.parentElement)
    {
      current_element.parentElement.classList.remove('hover_overlay');
    }
    event.stopPropagation();
  });
  current_element.addEventListener("mouseleave", (event) => {
    current_element.style.border = "none";
    let children_list = current_element.children;
    let childrenArray = Array.from(children_list);
    childrenArray.forEach((child) => {
      child.style.border = "none";
    });
    current_element.classList.remove("hover_overlay");
    if(current_element.parentElement && !current_element.parentElement.contains('super_container'))
    {
 
        mouse_Enter_and_Leave_on_element(current_element.parentElement);
    }
    else
    {
      return;
    }

    current_element.style.backgroundColor = old_Backgroundcolor;
    current_element.style.opacity = "1";
    event.stopPropagation();
  });
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function main_panel_collapse()
{
  let collapse_button = document.querySelector('.fa');
  let main_panel_element = document.querySelector('.main-panel');
  let back_solid_main_panel_temp_spacer = document.querySelector(".temp-spacer");
  let super_container_element = document.querySelector(".super_container");
  if(main_panel_element.style.width === "25%")
  {
   
    collapse_button.classList.add('fa-arrow-right');
    collapse_button.classList.remove('fa-arrow-left');

  }
  else
  {
    collapse_button.classList.add('fa-arrow-left');
    collapse_button.classList.remove('fa-arrow-right');
  }

  collapse_button.addEventListener('click' , (e) =>{
    if(main_panel_element.style.width === "25%")
    {
     
    collapse_button.classList.add('fa-arrow-right');
    collapse_button.classList.remove('fa-arrow-left');
    main_panel_element.style.width = '50px';
    super_container_element.style.width = '100%';
    back_solid_main_panel_temp_spacer.style.width = "50px";
    }
    else{
      collapse_button.classList.add('fa-arrow-left');
      collapse_button.classList.remove('fa-arrow-right');
      main_panel_element.style.width = '25%';
      super_container_element.style.width = '75%';
      back_solid_main_panel_temp_spacer.style.width = "25% ";
    }
  });
}
