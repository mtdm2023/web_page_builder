
<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Editor with 12 Columns - Drag and Drop</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/elementToolbar-style.css">
    <link rel="stylesheet" href="css/all.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/templateParts.css">
</head>

<body class="d-flex position-relative">
   <div class="main-panel position-fixed ">
    <i class="fa fa-arrow-right"></i>
    <h1 class="text-center mb-4 text-white">Tikno builder</h1>

    <!-- Toolbar with draggable items -->
    <div class="d-flex flex-wrap gap-5 justify-content-center w-75 m-auto bg-dark mb-4 " id="toolbar">
        <div id="editableElement" class="draggable" draggable="true" data-type="text">Text Block</div>
        <div id="editableElement" class="draggable" draggable="true" data-type="image">Image Block</div>
        <div id="editableElement" class="draggable" draggable="true" data-type="button">Button Block</div>
        <div id="editableElement" class="draggable " draggable="true" data-type="section">Section Block</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="container">container Block</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="flexRow">flex container </div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="row">row Block</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="12_2_devider">12/2 devider</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="12_3_devider">12/3 devider</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="12_4_devider">12/4 devider</div>
        <div id="editableElement" class="draggable  " draggable="true" data-type="12_1_devider">12/1 devider</div>
        <div class="toolbar">
            <label for="colorPicker">Choose Color:</label>
            <input type="color" id="colorPicker" value="#000000" />
    
            <div class="alignment-controls">
                <button id="alignLeft">Left</button>
                <button id="alignCenter">Center</button>
                <button id="alignRight">Right</button>
            </div>
        </div>
        <!-- Delete button in toolbar -->
        <button id="delete-button" class="toolbar-delete-btn">Delete Selected</button>
    </div>
    <div class="flex-toolbar">
        <label>Justify Content:</label>
        <select id="justifyContent">
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
        </select>
      
        <label>Align Items:</label>
        <select id="alignItems">
          <option value="stretch">Stretch</option>
          <option value="center">Center</option>
          <option value="flex-start">Start</option>
          <option value="flex-end">End</option>
          <option value="baseline">Baseline</option>
        </select>
      
        <label>Flex Direction:</label>
        <select id="flexDirection">
          <option value="row">Row</option>
          <option value="row-reverse">Row Reverse</option>
          <option value="column">Column</option>
          <option value="column-reverse">Column Reverse</option>
        </select>
      </div>

       <!-- Style Inputs -->
      <div class="style-editor">
       
         <?php
            $htmlContent = file_get_contents(__DIR__ . '/templat-parts/General.html');
            echo $htmlContent;
          ?>
         <?php
            $htmlContent = file_get_contents(__DIR__ . '/templat-parts/Dimention.html');
            echo $htmlContent;
          ?>
        <?php
            $htmlContent = file_get_contents(__DIR__ . '/templat-parts/Decoration.html');
            echo $htmlContent;
          ?>
      
    </div>
     
   </div>
    <div class="temp-spacer "></div>
       
          
        <!-- Super container of wis-wig TS Editor -->
        <div class="super_container " id="grid">

        </div>



        <!-- Interact.js for Drag-and-Drop functionality -->
        <script src="global-js/jquery-3.5.1.min.js"></script>
        <script src="global-js/bootstrap.min.js"></script>
        <script src="global-js/popper.min.js"></script>
        <script src="global-js/interact.min.js"></script>
        <script src="editor-core-js/main.js"></script>
        <script src="editor-core-js/update-element-styles.js"></script>

</body>

</html>