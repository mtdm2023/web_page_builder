// Function to update element's style
sub_main_panel_menus();
global_events_listeners_UI();
function updateElementStyle(element, property, value) {
  if (property && value !== "") {
    element.style[property] = value;
  }
}

// Event listeners for real-time style updates
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".style-editor input, .style-editor select")
    .forEach((input) => {
      input.addEventListener("input", (e) => {
        const selectedElement = document.querySelector(".selected"); // Assuming the selected element has the class 'selected'

        switch (e.target.id) {
          case "height":
            updateElementStyle(selectedElement, "height", e.target.value);
            break;
          case "width":
            updateElementStyle(selectedElement, "width", e.target.value);
            break;
          case "Min-width":
            updateElementStyle(selectedElement, "minWidth", e.target.value);
            break;
          case "Max-width":
            updateElementStyle(selectedElement, "maxWidth", e.target.value);
            break;
          case "Min-height":
            updateElementStyle(selectedElement, "minHeight", e.target.value);
            break;
          case "Max-height":
            updateElementStyle(selectedElement, "maxHeight", e.target.value);
            break;
          case "Margin-top":
            updateElementStyle(selectedElement, "marginTop", e.target.value);
            break;
          case "Margin-bottom":
            updateElementStyle(selectedElement, "marginBottom", e.target.value);
            break;
          case "Margin-left":
            updateElementStyle(selectedElement, "marginLeft", e.target.value);
            break;
          case "Margin-right":
            updateElementStyle(selectedElement, "marginRight", e.target.value);
            break;
          case "Padding-top":
            updateElementStyle(selectedElement, "paddingTop", e.target.value);
            break;
          case "Padding-bottom":
            updateElementStyle(
              selectedElement,
              "paddingBottom",
              e.target.value
            );
            break;
          case "Padding-right":
            updateElementStyle(selectedElement, "paddingRight", e.target.value);
            break;
          case "Padding-left":
            updateElementStyle(selectedElement, "paddingLeft", e.target.value);
            break;
          case "borderRadius":
            updateElementStyle(selectedElement, "borderRadius", e.target.value);
            break;
          case "border":
            updateElementStyle(selectedElement, "border", e.target.value);
            break;
          case "padding":
            updateElementStyle(selectedElement, "padding", e.target.value);
            break;
          case "backgroundImage":
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = function (event) {
                updateElementStyle(
                  selectedElement,
                  "backgroundImage",
                  `url(${event.target.result})`
                );
                updateElementStyle(
                  selectedElement,
                  "backgroundRepeat",
                  "no-repeat"
                );
              };
              reader.readAsDataURL(file);
            }
            break;
          case "textColor":
            updateElementStyle(selectedElement, "color", e.target.value);
            break;
          case "opacityValue":
            updateElementStyle(selectedElement, "opacity", e.target.value);
            break;
          case "margin":
            updateElementStyle(selectedElement, "margin", e.target.value);
            break;
          case "display":
            updateElementStyle(selectedElement, "display", e.target.value);
            break;
          case "position":
            updateElementStyle(selectedElement, "position", e.target.value);
            break;
          case "top":
            updateElementStyle(selectedElement, "top", e.target.value);
            break;
          case "right":
            updateElementStyle(selectedElement, "right", e.target.value);
            break;
          case "bottom":
            updateElementStyle(selectedElement, "bottom", e.target.value);
            break;
          case "left":
            updateElementStyle(selectedElement, "left", e.target.value);
            break;
          default:
            break;
        }
      });
    });
});

// this function for update fields like opacity input rlated to other inputs
function global_events_listeners_UI() {
  document.addEventListener("DOMContentLoaded", (e) => {
    const opacitySlider = document.getElementById("opacity");
    const opacityValueInput = document.getElementById("opacityValue");
    // Event listener for the number input to sync with the slider
    opacityValueInput.addEventListener("input", function () {
      const value = opacityValueInput.value;
      opacitySlider.value = value; // Update the slider input
      // Apply the opacity value to the selected element
      // Example: selectedElement.style.opacity = value;
    });
  });
}

// this function to make opthins menu collapsed and decollapsed
function sub_main_panel_menus() {
  document.addEventListener("DOMContentLoaded", (e) => {
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
  });
}
