<!DOCTYPE html>
<html lang="en">

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
        <i class="fa fa-arrow-right collapsbtn"></i>
        <h1 class="text-center mb-4 text-white">Tikno builder</h1>

        <!-- Toolbar with draggable items -->
        <div class="d-flex flex-wrap gap-5 justify-content-center w-80 m-auto  mb-4 " id="toolbar">
            <div id="editableElement" class="draggable" draggable="true" data-type="text">
                <span class="icon-block text-center">
                    <span class="flex_container_icon  ">
                        <span class="icon-disc">
                            <i class="fa fa-text-height"></i>

                        </span>

                    </span>
                    <p class="text-center m-0">
                        Paragraph</p>
                </span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative" draggable="true" data-type="image">
                <span class="icon-block text-center"><span class="flex_container_icon "> <i class="fas fa-image fs-1"></i></span> Image</span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative" draggable="true" data-type="button">
                <span class="icon-block text-center"><span class="flex_container_icon "><i class="fas fa-square"></i></span> Button</span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative" draggable="true" data-type="section">
            <span class="icon-block text-center"><span class="flex_container_icon "> <span class="icon-disc">Section</span></span></span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative " draggable="true" data-type="container">
                <span class="icon-block text-center"><span class="flex_container_icon "> <span class="icon-disc">container</span></span> </span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative" draggable="true" data-type="flexRow">
                <span class="icon-block text-center"><span class="flex_container_icon "> <span class="icon-disc">d-flex</span></span></span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative  " draggable="true" data-type="row">
                <span class="icon-block text-center"><span class="flex_container_icon "> <span class="icon-disc">Row</span></span></span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative" draggable="true" data-type="12_2_devider">
                <span class="icon-block"><i class="fa-solid fa-table-columns  fs-1"></i></span>
                <span class="icon-disc">2 columns</span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative " draggable="true" data-type="12_3_devider">
                <span class="icon-block"><i class="fa-solid fa-table-columns fs-1"></i><i style=" margin-left: -22px;" class="fa-solid fa-table-columns fs-1"></i></span>
                <span class="icon-disc">3 columns</span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative " draggable="true" data-type="12_4_devider">
                <span class="icon-block"><i class="fa-solid fa-table-columns fs-1"></i><i style=" margin-left: -22px;" class="fa-solid fa-table-columns fs-1"></i><i style=" margin-left: -22px;" class="fa-solid fa-table-columns fs-1"></i></span>
                <span class="icon-disc">4 columns</span>
            </div>
            <div id="editableElement" class="draggable d-flex flex-column justify-content-center align-items-center gap-1 position-relative  " draggable="true" data-type="12_1_devider">
                <span class="icon-block"><i class="fa-solid fa-grip-lines-vertical fs-1"></i></span>
                <span class="icon-disc">1 column</span>
            </div>

            <!-- Delete button in toolbar -->
            <button id="delete-button" class="toolbar-delete-btn">Delete Selected</button>
             <button id="delete-style" class="deleteStyle-btn">Delete style</button>

          </div>
         

        <!-- Style Inputs -->
        <div style="width: 90%;" class="style-editor ">

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
           <?php
            $htmlContent = file_get_contents(__DIR__ . '/templat-parts/Flex.html');
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