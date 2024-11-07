
 class TiknoBuilder {
  constructor() {
    this.EditCode = document.querySelector(".Edite_code");
    this.EditCode.addEventListener("click", () => {
      this.loadEditableHTMLDesignToLocalStorage();
      this.Codeinitializer();
     document.querySelector('.super_container').querySelectorAll('*')
      .forEach((element) => {
            // Make the new element draggable and resizable
       
            let dropzoneData = JSON.parse(element.getAttribute("data-dropzoneObject"));
             this.makeDraggableAndResizable(element, dropzoneData);

            // on hover on element function
            this.mouse_Enter_and_Leave_on_element(element);
  
            element.onclick = (e) => {
              this.selectElementForDeletion(e);
              this.selectElementForCustomize(e);
            };
      })
   
    });
    this.Codeinitializer();
  }

 
  Codeinitializer()
  {
   
    console.log('initialized');
  // interact dragable and dropzone events begain
    interact(".draggable").draggable({
      inertia: true,
      autoScroll: true,
      onstart: (event) => {
        event.target.classList.add("dragging");
        event.target.style.transition = "none";
      },
      onend: (event) => {
        event.target.classList.remove("dragging");
        event.target.style.transition = "0.4s ease-in-out";
      },
      onmove: (event) => {
        const target = event.target;
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    });

    interact(
          ".super_container, ._section, ._container, ._12_4devider1, ._12_2devider1, ._12_2devider2, ._12_3devider1, ._12_4devider, ._12_1devider, ._12_1devider1, ._row , .flex_row_container , ._div" 
    ).dropzone({
      accept: ".draggable",
      overlap: 0.5,
      ondropactivate: (event) => {
        event.target.classList.add("drop-active");
      },
      ondropdeactivate: (event) => {
        event.target.classList.remove("drop-active");
        const draggableElement = event.relatedTarget;
        draggableElement.classList.remove("dragging");
        draggableElement.style.transform = "none";
        draggableElement.removeAttribute("data-x");
        draggableElement.removeAttribute("data-y");
      },
      ondragenter: (event) => {
        const dropzoneElement = event.target;
        dropzoneElement.classList.add("drop-active");
      },
      ondragleave: (event) => {
        const dropzoneElement = event.target;
        dropzoneElement.classList.remove("drop-active");
      },
      ondrop: (event) => {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        if (!dropzoneElement.contains(draggableElement)) {
          draggableElement.classList.remove("dragging");
          draggableElement.style.transform = "none";
          draggableElement.removeAttribute("data-x");
          draggableElement.removeAttribute("data-y");

          const type = draggableElement.dataset.type;

          if (type === "text") {
            this.newElement = document.createElement(this.selected_text_type_element);
            console.log("text");
            this.newElement.textContent = this.content_of_text_type_element.value;
            document.querySelector(".text_content").style.display = "none";
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
                const jsonString = JSON.stringify(dropzoneElement);
                img.setAttribute("data-dropzoneObject", jsonString);
                
                this.makeDraggableAndResizable(img, dropzoneElement);
               
              };
              reader.readAsDataURL(file);
              fileInput.style.display = "none";
            };
          
            this.newElement = fileInput;

          } else if (type === "button") {
            this.newElement = document.createElement("button");
            this.newElement.innerText = "button1";
            this.newElement.className = "btn btn-primary";
            const jsonString = JSON.stringify(dropzoneElement);
            console.log(jsonString);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "section") {
            this.newElement = document.createElement("section");
            this.newElement.classList.add("_section");
            this.newElement.style.minHeight = "100px";
            const jsonString = JSON.stringify(dropzoneElement);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "div") {
            this.newElement = document.createElement("div");
            this.newElement.classList.add('_div');
            this.newElement.style.width = "100px";
            this.newElement.style.height = "50px";
            const jsonString = JSON.stringify(dropzoneElement);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "container") {
            this.newElement = document.createElement("div");
            this.newElement.classList.add("container");
            this.newElement.classList.add("_container");
            this.newElement.textContent = "New Container";
            this.newElement.style.minHeight = "100px";
            const jsonString = JSON.stringify(dropzoneElement);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "row") {
            this.newElement = document.createElement("div");
            this.newElement.classList.add("row");
            this.newElement.classList.add("_row");
            this.newElement.textContent = "New Row";
            this.newElement.style.minHeight = "100px";
            this.newElement.style.width = "100%";
            const jsonString = JSON.stringify(dropzoneElement);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "flexRow") {
            this.newElement = document.createElement("div");
            this.newElement.classList.add("d-flex");
            this.newElement.classList.add("flex_row_container");
            this.newElement.style.minHeight = "100px";
            this.newElement.style.width = "100%";
            const jsonString = JSON.stringify(dropzoneElement);
            this.newElement.setAttribute("data-dropzoneObject", jsonString);
          } else if (type === "12_2_devider") {
            const newdevider12_2 = document.createElement("div");
            newdevider12_2.classList.add("row", "_row");

            const new_first_div = document.createElement("div");
            new_first_div.classList.add(
              "col-md-6",
              "col-12",
              "_12_2devider1"
            );
            new_first_div.style.minHeight = "100px";
            new_first_div.setAttribute('dropzone-element' , newdevider12_2);
            const new_second_div = document.createElement("div");
            new_second_div.classList.add(
              "col-md-6",
              "col-12",
              "_12_2devider2"
            );
            new_second_div.style.minHeight = "100px";
            new_second_div.setAttribute('dropzone-element' , newdevider12_2);
            newdevider12_2.appendChild(new_first_div);
            newdevider12_2.appendChild(new_second_div);
            newdevider12_2.setAttribute('dropzone-element' , dropzoneElement);
            this.newElement = newdevider12_2;
          } else if (type === "12_3_devider") {
            const newdevider12_3 = document.createElement("div");
            newdevider12_3.classList.add("row", "_row");

            const new_first_div = document.createElement("div");
            new_first_div.classList.add(
              "col-md-4",
              "col-12",
              "_12_3devider1"
            );

            new_first_div.style.minHeight = "100px";

            const new_second_div = document.createElement("div");
            new_second_div.classList.add(
              "col-md-4",
              "col-12",
              "_12_2devider2"
            );

            new_second_div.style.minHeight = "100px";

            const new_third_div = document.createElement("div");
            new_third_div.classList.add(
              "col-md-4",
              "col-12",
              "_12_2devider2"
            );

            new_third_div.style.minHeight = "100px";

            newdevider12_3.appendChild(new_first_div);
            newdevider12_3.appendChild(new_second_div);
            newdevider12_3.appendChild(new_third_div);

            this.newElement = newdevider12_3;
          } else if (type === "12_4_devider") {
            const newdevider12_4 = document.createElement("div");
            newdevider12_4.classList.add("row", "_row");

            const new_first_div = document.createElement("div");
            new_first_div.classList.add(
              "col-md-3",
              "col-12",
              "_12_4devider1"
            );

            new_first_div.style.minHeight = "100px";

            const new_second_div = document.createElement("div");
            new_second_div.classList.add(
              "col-md-3",
              "col-12",
              "_12_2devider2"
            );

            new_second_div.style.minHeight = "100px";

            const new_third_div = document.createElement("div");
            new_third_div.classList.add(
              "col-md-3",
              "col-12",
              "_12_2devider2"
            );

            new_third_div.style.minHeight = "100px";

            const new_fourth_div = document.createElement("div");
            new_fourth_div.classList.add(
              "col-md-3",
              "col-12",
              "_12_2devider2"
            );

            new_fourth_div.style.minHeight = "100px";

            newdevider12_4.appendChild(new_first_div);
            newdevider12_4.appendChild(new_second_div);
            newdevider12_4.appendChild(new_third_div);
            newdevider12_4.appendChild(new_fourth_div);

            this.newElement = newdevider12_4;
          } else if (type === "12_1_devider") {
            const newdevider12_1 = document.createElement("div");
            newdevider12_1.classList.add("row", "_row");

            const new_first_div = document.createElement("div");
            new_first_div.classList.add(
              "col-md-12",
              "col-12",
              "_12_1devider1"
            );

            new_first_div.style.minHeight = "100px";

            newdevider12_1.appendChild(new_first_div);

            this.newElement = newdevider12_1;
          }
          // Append the new element to the dropzone
          dropzoneElement.appendChild(this.newElement);

          // Make the new element draggable and resizable
          this.makeDraggableAndResizable(this.newElement, dropzoneElement);

          // on hover on element function
          this.mouse_Enter_and_Leave_on_element(this.newElement);

          this.newElement.onclick = (e) => {
            this.selectElementForDeletion(e);
            this.selectElementForCustomize(e);
          };

          event.stopPropagation();
        }
      },
    });

   // Function to update element's style
   this.sub_main_panel_menus();
   this.global_events_listeners_UI();
   // Event listeners for real-time style updates
   this.ElementStyleSetter();



   this.currentlyEditableElement = null; // Global variable to track currently selected element

   // delete design button
   this.delete_btn = document.querySelector('.fa-trash');
   this.delete_btn.addEventListener("click" , (e) =>{
    // refresh window 
    window.location.assign(window.location.href);

   })

   // opend code button
   this.openCode = document.querySelector(".open_code");
   this.openCode.addEventListener("click", () => {
     this.loadChildrenStylesFromLocalStorage();
   });

   //view_code button
   this.ViewCodeInModal = document.querySelector(".view_code");
   this.ViewCodeInModal.addEventListener("click", () => {
    document.querySelector('.spiner-html').style.visibility ="visible";
    document.querySelector('.spiner-css').style.visibility ="visible";
    const HTML_old_content = document.querySelector(".html_modal_body");
    HTML_old_content.innerHTML = "";
    const CSS_old_content = document.querySelector(".CSS_modal_body");
    CSS_old_content.innerHTML =""
    setTimeout(()=>{
      
      const savedHTML = localStorage.getItem("savedChildrenHTML");
      const savedCSS = localStorage.getItem("savedChildrenCSS");
      if (savedHTML && savedCSS) {
        // Inject saved HTML content
        const tempHTML = document.querySelector(".html_modal_body");
        tempHTML.innerHTML = savedHTML;
   
        // Create a new style element and append saved CSS
        const tempCSS = document.querySelector(".CSS_modal_body");
        tempCSS.innerHTML = savedCSS;
        
      } else {
        console.warn("No saved HTML or CSS found in localStorage.");
      }
      document.querySelector('.spiner-html').style.visibility ="hidden";
      document.querySelector('.spiner-css').style.visibility ="hidden";
    }, 2000)
  
 
  
   });

   
  // save_code_button 
   this.saveCode = document.querySelector(".save_code");
   this.saveCode.addEventListener("click", () => {
    console.log("save code clicked");
    if(document.querySelector('.super_container').children.length > 0)
    {
      this.saveChildrenStylesToLocalStorage(".super_container");
      document.querySelector('.super_container').querySelectorAll('*').forEach((element) => {
        element.remove();
      })
    }

    else
    {
      alert ('you should make a new design or edite exist design to save');
    }
   });

 

   // Event listener for super_container when clicked
   document.querySelector(".super_container")
     .addEventListener("click", (e) => {
       this.selectElementForCustomize(e);
     });

   this.main_panel_collapse();
   this.newElement = null;
   this.selected_text_type_element = null;
   this.content_of_text_type_element = null;
   this.selector = document.querySelector(".text_type select");

   this.selector.addEventListener("change", (e) => {
     document.querySelector(".text_content").style.display = "flex";
     this.selected_text_type_element = e.target.value;
   });

   this.content_of_text_type_element = document.getElementById("content");
   this.old_Backgroundcolor = 0;
   this.parent_element = null;
   this.previousElement = null;

  }

 
  
  
  
  // this function for update fields like opacity input rlated to other inputs
   global_events_listeners_UI() {

      const opacitySlider = document.getElementById("opacity");
      const opacityValueInput = document.getElementById("opacityValue");
      // Event listener for the number input to sync with the slider
      opacityValueInput.addEventListener("input", function () {
        const value = opacityValueInput.value;
        opacitySlider.value = value; // Update the slider input
        // Apply the opacity value to the selected element
        // Example: selectedElement.style.opacity = value;
      });
 
  }
  
  // this function to make opthins menu collapsed and decollapsed
   sub_main_panel_menus() {

      let general_option_menu = document.querySelector(".general_options");
      let general_panel = document.querySelector(".General_panel");
      let arrow = document.querySelector(".fas_general");
      let current_editable_menu = general_panel;
      current_editable_menu.addEventListener("click", (event) => {
        if (general_option_menu.style.height == "0px") {
          general_option_menu.style.height = "600px";
          general_option_menu.style.padding = "8px";
          arrow.classList.add("fa-caret-down");
          arrow.classList.remove("fa-caret-right");
        } else {
          general_option_menu.style.height = "0px";
          general_option_menu.style.padding = "0px";
  
          arrow.classList.remove("fa-caret-down");
          arrow.classList.add("fa-caret-right");
        }
        event.stopPropagation();
      });
  
      let Dimension_option_menu = document.querySelector(".dimension_options");
      let Dimension_panel = document.querySelector(".Dimention_panel");
      let Dimension_arrow = document.querySelector(".fas_dimension");
      let Dimension_current_editable_menu = Dimension_panel;
      Dimension_current_editable_menu.addEventListener("click", (event) => {
        if (Dimension_option_menu.style.height == "0px") {
          Dimension_option_menu.style.height = " 610px";
          Dimension_option_menu.style.padding = "8px";
          Dimension_arrow.classList.add("fa-caret-down");
          Dimension_arrow.classList.remove("fa-caret-right");
        } else {
          console.log("collaps");
          Dimension_option_menu.style.height = "0px";
          Dimension_option_menu.style.padding = "0px";
  
          Dimension_arrow.classList.remove("fa-caret-down");
          Dimension_arrow.classList.add("fa-caret-right");
        }
        event.stopPropagation();
      });
  
      let decoration_option_menu = document.querySelector(".decoration_options");
      let decoration_panel = document.querySelector(".decoration_panel");
      let decoration_arrow = document.querySelector(".fas_decoration");
      let decoration_current_editable_menu = decoration_panel;
      decoration_current_editable_menu.addEventListener("click", (event) => {
        if (decoration_option_menu.style.height == "0px") {
          decoration_option_menu.style.height = " 610px";
          decoration_option_menu.style.padding = "8px";
          decoration_arrow.classList.add("fa-caret-down");
          decoration_arrow.classList.remove("fa-caret-right");
        } else {
          console.log("collaps");
          decoration_option_menu.style.height = "0px";
          decoration_option_menu.style.padding = "0px";
  
          decoration_arrow.classList.remove("fa-caret-down");
          decoration_arrow.classList.add("fa-caret-right");
        }
        event.stopPropagation();
      });
      let flex_option_menu = document.querySelector(".flex_options");
      let flex_panel = document.querySelector(".flex_panel");
      let flex_arrow = document.querySelector(".fas_flex");
      let flex_current_editable_menu = flex_panel;
      flex_current_editable_menu.addEventListener("click", (event) => {
        if (flex_option_menu.style.height == "0px") {
          flex_option_menu.style.height = " 610px";
          flex_option_menu.style.padding = "8px";
          flex_arrow.classList.add("fa-caret-down");
          flex_arrow.classList.remove("fa-caret-right");
        } else {
          console.log("collaps");
          flex_option_menu.style.height = "0px";
          flex_option_menu.style.padding = "0px";
  
          flex_arrow.classList.remove("fa-caret-down");
          flex_arrow.classList.add("fa-caret-right");
        }
        event.stopPropagation();
      });
  
  }
  
  // Function to handle element selection for deletion and add select class to element for handling in all application sides
  selectElementForDeletion(element) {
    var selectedElement = null;
    // Remove the selected class from any previously selected element
    let i = 0;
    if (selectedElement) {
      element.target.classList.remove("selected");
      this.previousElement = element;
    }

    document.querySelectorAll(".selected").forEach((selected) => {
      selected.classList.remove("selected");
    }); // To keep track of the currently selected element

    // Set the clicked element as the selected element
    selectedElement = element;
    console.log(selectedElement);
    selectedElement.target.classList.add("selected");

    this.addGoToParentElementNav(
      `.ts${selectedElement.target.tagName}`,
      "\\f062",
      selectedElement
    );

    // Show the delete button in the toolbar
    document.getElementById("delete-button").style.display = "block";
    // Handle delete button click
    document.getElementById("delete-button").onclick = (e) => { 
      if (selectedElement.target) {
        console.log("deleted");
        selectedElement.target.remove(); // Remove the selected element
        selectedElement = null; // Clear the selected element
        e.target.style.display = "none"; // Hide the delete button
        document.querySelectorAll("style").forEach((style) => style.remove());
      }
    };
  }

  // Function to handle element customization like background color and background imag and so on
  selectElementForCustomize(element) {
    // get parent of element because when i click on element hover layer would selected not element it self

    this.get_all_user_customization_for_element(element);
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  makeDraggableAndResizable(element, dropzoneElement) {
    // Initialize position attributes
    if (!element.hasAttribute("data-x")) {
      element.setAttribute("data-x", 0);
    }
    if (!element.hasAttribute("data-y")) {
      element.setAttribute("data-y", 0);
    }
  
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
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + (event.dx || 0);
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + (event.dy || 0);
  
          // Apply new position to the element
          console.log(x);
          console.log(y);
          target.setAttribute("data-x",`${x}`);
          target.setAttribute("data-y", `${y}`);
          target.style.transform = `translate(${x}px, ${y}px)`;
  
          // Update `data-x` and `data-y`
        },
      })
      .resizable({
        edges: {
          left: false,
          right: false,
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
  }
  
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  get_all_user_customization_for_element(element) {
    const editableElement = document.querySelector(".selected");
    console.log(editableElement.tagName);
    // Update the global variable with the newly selected element
    this.currentlyEditableElement = editableElement;

    const colorPicker = document.getElementById("colorPicker");

    // Remove any previous event listeners to prevent multiple elements being colored
    const newColorPicker = colorPicker.cloneNode(true);
    colorPicker.parentNode.replaceChild(newColorPicker, colorPicker);

    // Add color picker functionality for the currently selected element only
    newColorPicker.addEventListener("input", (e) => {
      const selectedColor = e.target.value;
      console.log(selectedColor);
      this.currentlyEditableElement.style.backgroundColor = selectedColor;
      let delete_style_btn = document.getElementById("delete-style");
      delete_style_btn.classList.remove("deleteStyle-btn");
      delete_style_btn.classList.add("deleteStyle-btn-active");
      delete_style_btn.addEventListener("click", (e) => {
        this.currentlyEditableElement.style["backgroundColor"] = "";
        delete_style_btn.classList.add("deleteStyle-btn");
      });
    });

    // Alignment functionality
    document.getElementById("alignLeft").addEventListener("click", () => {
      this.currentlyEditableElement.style.textAlign = "left";
    });

    document.getElementById("alignCenter").addEventListener("click", () => {
      this.currentlyEditableElement.style.textAlign = "center";
    });

    document.getElementById("alignRight").addEventListener("click", () => {
      this.currentlyEditableElement.style.textAlign = "right";
    });
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  mouse_Enter_and_Leave_on_element(element) {
    let current_element = element;

    current_element.addEventListener("mouseenter", (event) => {
      current_element.style.border = "2px dashed black";
      let children_list = current_element.children;
      if (children_list) {
        let childrenArray = Array.from(children_list);

        childrenArray.forEach((child) => {
          child.style.border = "1px solid black";
        });
      }

      this.old_Backgroundcolor = current_element.style.backgroundColor;
      current_element.classList.add("hover_overlay");
      if (current_element.parentElement) {
        current_element.parentElement.classList.remove("hover_overlay");
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
      if (
        current_element.parentElement &&
        !current_element.parentElement.contains("super_container")
      ) {
        this.mouse_Enter_and_Leave_on_element(current_element.parentElement);
      } else {
        return;
      }

      current_element.style.backgroundColor = this.old_Backgroundcolor;
      current_element.style.opacity = "1";
      event.stopPropagation();
    });
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  main_panel_collapse() {
    let collapse_button = document.querySelector(".main-panel .fa");
    let main_panel_element = document.querySelector(".main-panel");

    let super_container_element = document.querySelector(".super_container");
    if (main_panel_element.style.width === "25%") {
      collapse_button.classList.add("fa-arrow-right");
      collapse_button.classList.remove("fa-arrow-left");
    } else {
      collapse_button.classList.add("fa-arrow-left");
      collapse_button.classList.remove("fa-arrow-right");
    }

    collapse_button.addEventListener("click", (e) => {
      if (main_panel_element.style.width === "25%") {
        collapse_button.classList.add("fa-arrow-right");
        collapse_button.classList.remove("fa-arrow-left");
        main_panel_element.style.width = "50px";
        super_container_element.style.width = "100%";
        super_container_element.style.marginLeft = "0";
      } else {
        collapse_button.classList.add("fa-arrow-left");
        collapse_button.classList.remove("fa-arrow-right");
        main_panel_element.style.width = "25%";
        super_container_element.style.width = "75%";
        super_container_element.style.marginLeft = "25%";
      }
    });
  }

  // Function to add element navigation to parent
  addGoToParentElementNav(selector, content, element) {
    document.querySelectorAll(".GoToPaerentNav").forEach((GoToPaerentNav) => {
      GoToPaerentNav.remove();
    });
    if (element.target.querySelectorAll(".GoToPaerentNav").length === 0) {
      let goToParentElement = document.createElement("div");
      goToParentElement.style.height = "30px";
      goToParentElement.style.cursor = "pointer";
      goToParentElement.style.position = "absolute";
      goToParentElement.style.top = "0";
      goToParentElement.style.right = "0";
      goToParentElement.style.width = "30px";
      goToParentElement.style.display = "flex";
      goToParentElement.style.justifyContent = "center";
      goToParentElement.style.alignItems = "center";
      goToParentElement.style.backgroundColor = "#0d6efd";
      goToParentElement.classList.add("GoToPaerentNav");
      let icon = document.createElement("i");
      icon.classList.add("fa", "fa-arrow-up");
      goToParentElement.appendChild(icon);
      element.target.appendChild(goToParentElement);
      icon.style.color = "white";
      let currnetGotoParentElement = goToParentElement;
      currnetGotoParentElement.addEventListener("click", (e) => {
        document.querySelectorAll(".selected").forEach((selected) => {
          selected.classList.remove("selected");
        });

        let parentNode = currnetGotoParentElement.parentElement.parentElement;
        document
          .querySelectorAll(".GoToPaerentNav")
          .forEach((GoToPaerentNav) => {
            GoToPaerentNav.remove();
          });
        console.log("parent");
        parentNode.appendChild(currnetGotoParentElement);
        parentNode.classList.add("selected");
        this.get_all_user_customization_for_element(element);

        e.stopPropagation();
      });
      // Append the style to the document head
    }
  }


  // Function to save HTML and CSS of all child elements of a specific element to localStorage
  saveChildrenStylesToLocalStorage(selector) {
    this.saveEditableHTMLDesignToLocalStorage();
    const parentElement = document.querySelector(selector);
    if (!parentElement) {
      console.warn(`Element with selector "${selector}" not found.`);
      return;
    }

    // Get all child elements of the specified parent
    const childElements = parentElement.querySelectorAll("*");

    let cssContent = "";

    // Loop through each child element and generate a unique CSS class for each
    console.log(childElements);
    // Loop through each child element and extract inline styles
    childElements.forEach((child, index) => {
      const uniqueClass = `tsc-${index}`;

      // Add the unique class to the child element
      child.classList.add(uniqueClass);

      // Extract inline styles if any are set
      let inlineStyle = child.getAttribute("style");
      if (inlineStyle) {
        inlineStyle = inlineStyle.split(";").join(";\n");
        let childCss = `.${uniqueClass} { ${inlineStyle} }`;

        // Append the generated CSS to the overall CSS content
        cssContent += childCss + '\n';
        child.removeAttribute("style");
      }
    });

    //Loop on all elements in super_container and remove all tikno builder classes and elements 
    document.querySelectorAll("*").forEach(element => {
      if(element.classList.contains('GoToPaerentNav'))
      {
        element.remove();
      }
      if(element.hasAttribute('dropzone-element'))
      {
        element.removeAttribute('dropzone-element');
      }
      if(element.hasAttribute('data-x') && element.hasAttribute('data-y'))
      {
        element.removeAttribute('data-x');
        element.removeAttribute('data-y');
      }
      if(element.hasAttribute('accept') )
      {
        element.remove();
        
      }
    });

    // here we make new line after each element in final HTML to be more readable
    let htmlContent = parentElement.innerHTML;
    htmlContent = htmlContent.split(">").join(">\n");
    htmlContent = htmlContent.replace(/data-dropzoneobject="{}"|_section|_container|_12_4devider1|_12_2devider1|_12_2devider2|_12_3devider1|_12_4devider|_12_1devider|_12_1devider1|_row|flex_row_container|_div|selected/g, ""); 
    // Save HTML and encapsulated CSS to localStorage
    localStorage.setItem("savedChildrenHTML", htmlContent);
    localStorage.setItem("savedChildrenCSS", cssContent);

    alert(
      "HTML and CSS of all child elements have been saved to localStorage."
    );
  }

  saveEditableHTMLDesignToLocalStorage() {
    // Save HTML and encapsulated CSS to localStorage
    const allHTML = document.documentElement.outerHTML;

    localStorage.setItem("savedEditableHTML", allHTML);

    console.log(
      "HTML and CSS of all child elements have been saved to localStorage."
    );
  }

  // Function to load HTML and CSS from localStorage
  loadChildrenStylesFromLocalStorage() {
    const savedHTML = localStorage.getItem("savedChildrenHTML");
    const savedCSS = localStorage.getItem("savedChildrenCSS");

    if (savedHTML && savedCSS) {
      // Inject saved HTML content
      const tempDiv = document.querySelector(".super_container");
      tempDiv.innerHTML = savedHTML;

      // Create a new style element and append saved CSS
      const style = document.createElement("style");
      style.textContent = savedCSS;
      document.head.appendChild(style);
    } else {
      console.warn("No saved HTML or CSS found in localStorage.");
    }
  }

 
  // here any style for any element will be set
  ElementStyleSetter()
  {
    document.querySelectorAll(".style-editor input, .style-editor select")
    .forEach((input) => {
      input.addEventListener("input", (e) => {
        const selectedElement = document.querySelector(".selected");
        console.log ('selected element' + selectedElement.tagName); // Assuming the selected element has the class 'selected'

        switch (e.target.id) {
          case "height":
            this.updateElementStyle(selectedElement, "height", e.target.value);
            break;
          case "width":
            this.updateElementStyle(selectedElement, "width", e.target.value);
            break;
          case "Min-width":
            this.updateElementStyle(selectedElement, "minWidth", e.target.value);
            break;
          case "Max-width":
            this.updateElementStyle(selectedElement, "maxWidth", e.target.value);
            break;
          case "Min-height":
            this.updateElementStyle(selectedElement, "minHeight", e.target.value);
            break;
          case "Max-height":
            this.updateElementStyle(selectedElement, "maxHeight", e.target.value);
            break;
          case "Margin-top":
            this.updateElementStyle(selectedElement, "marginTop", e.target.value);
            break;
          case "Margin-bottom":
            this.updateElementStyle(selectedElement, "marginBottom", e.target.value);
            break;
          case "Margin-left":
            this.updateElementStyle(selectedElement, "marginLeft", e.target.value);
            break;
          case "Margin-right":
            this.updateElementStyle(selectedElement, "marginRight", e.target.value);
            break;
          case "Padding-top":
            this.updateElementStyle(selectedElement, "paddingTop", e.target.value);
            break;
          case "Padding-bottom":
            this.updateElementStyle(
              selectedElement,
              "paddingBottom",
              e.target.value
            );
            break;
          case "Padding-right":
            this.updateElementStyle(selectedElement, "paddingRight", e.target.value);
            break;
          case "Padding-left":
            this.updateElementStyle(selectedElement, "paddingLeft", e.target.value);
            break;
          case "Top-left":
            this.updateElementStyle(selectedElement, "borderTopLeftRadius", e.target.value+'px');
            break;
          case "Bottom-left":
            this.updateElementStyle(selectedElement, "borderBottomLeftRadius", e.target.value+'px');
            break;
          case "Top-right":
            this.updateElementStyle(selectedElement, "borderTopRightRadius", e.target.value+'px');
            break;
          case "Bottom-right":
            console.log("Bottom");
            console.log(e.target.value);
            this.updateElementStyle(selectedElement, "borderBottomRightRadius", e.target.value+'px'  );
            break;
          case "borderRadius":
            this.updateElementStyle(selectedElement, "borderRadius", e.target.value);
            break;
          case "border":
            this.updateElementStyle(selectedElement, "border", e.target.value);
            break;
          case "padding":
            this.updateElementStyle(selectedElement, "padding", e.target.value);
            break;
          case "backgroundImage":
            console.log("background_img");
            if (e.target.files.length > 0) {
              console.log("inside");
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload =  (event) =>{
                this.updateElementStyle(
                  selectedElement,
                  "backgroundImage",
                  `url(${event.target.result})`
                );
                this.updateElementStyle(
                  selectedElement,
                  "backgroundRepeat",
                  "no-repeat"
                );
                this.updateElementStyle(
                  selectedElement,
                  "backgroundSize",
                  "cover"
                );
                this.updateElementStyle(
                  selectedElement,
                  "backgroundPosition",
                  "center"
                );
              };
              reader.readAsDataURL(file);
            }
            break;
          case "textColor":
            this.updateElementStyle(selectedElement, "color", e.target.value);
            break;
          case "opacityValue":
            this.updateElementStyle(selectedElement, "opacity", e.target.value);
            break;
          case "margin":
            this.updateElementStyle(selectedElement, "margin", e.target.value);
            break;
          case "display":
            this.updateElementStyle(selectedElement, "display", e.target.value);
            break;
          case "position":
            this.updateElementStyle(selectedElement, "position", e.target.value);
            break;
          case "top":
            this.updateElementStyle(selectedElement, "top", e.target.value);
            break;
          case "right":
            this.updateElementStyle(selectedElement, "right", e.target.value);
            break;
          case "bottom":
            this.updateElementStyle(selectedElement, "bottom", e.target.value);
            break;
          case "left":
            this.updateElementStyle(selectedElement, "left", e.target.value);
            break;
          case "order":
            this.updateElementStyle(selectedElement, "order", e.target.value);
            break;
          case "shrink":
            this.updateElementStyle(selectedElement, "flexShrink", e.target.value);
            break;
          case "grow":
            this.updateElementStyle(selectedElement, "flexGrow", e.target.value);
            break;
          case "justifyContent":
            this.updateElementStyle(selectedElement, "justifyContent", e.target.value);
            break;
            break;
          case "alignItems":
            this.updateElementStyle(selectedElement, "alignItems", e.target.value);
            break;
          case "flexDirection":
            this.updateElementStyle(selectedElement, "flexDirection", e.target.value);
            break;
          default:
            break;
        }
      });
    });
  }
 // this function for delete element button
 updateElementStyle(element, property, value) {
  let delete_style_btn = document.getElementById('delete-style');
      delete_style_btn.classList.remove('deleteStyle-btn');
      delete_style_btn.classList.add('deleteStyle-btn-active');
  if (property && value !== "") {
    console.log(property);
    element.style[property] = value;
    delete_style_btn.addEventListener('click' , (e)=>{
      
      element.style[property] = '';
      delete_style_btn.classList.add('deleteStyle-btn');
    })
  }
}
  // load Design in a editable mode 
  loadEditableHTMLDesignToLocalStorage() {
    console.log("Entering Edit Mode");
    const editableSavedHTML = localStorage.getItem("savedEditableHTML");
    if (editableSavedHTML) {
      // Replace the current document with the saved HTML
      document.open(); // Clears the document
      document.write(editableSavedHTML); // Writes the saved HTML
      document.close(); // Finalizes the document
      console.log('new_object_tiknoBuilder');
    } else {
      console.log("No saved HTML found in localStorage.");
    }
  }
}

var _TiknoBuilder = new TiknoBuilder();

