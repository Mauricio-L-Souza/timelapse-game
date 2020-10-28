// Make the DIV element draggable:

var ball = document.getElementById("ball");
var ballCenter = document.getElementById("ballCenter");

var containerBoundary = document.getElementById('main-container').getBoundingClientRect();

ball.style.top = ((containerBoundary.top + containerBoundary.bottom) / 2) + "px";
ball.style.left = ((containerBoundary.left + containerBoundary.right) / 2) + "px";

ballCenter.style.top = ((containerBoundary.top + containerBoundary.bottom) / 2) + "px";
ballCenter.style.left = ((containerBoundary.left + containerBoundary.right) / 2) + "px";

document.getElementById('debug-container-top').innerHTML = containerBoundary.top + " ";
document.getElementById('debug-container-right').innerHTML = containerBoundary.right + " ";
document.getElementById('debug-container-bottom').innerHTML = containerBoundary.bottom + " ";
document.getElementById('debug-container-left').innerHTML = containerBoundary.left + " ";

dragElement(ball);

function dragElement(ball) {
    var element_pos_x = 0, element_pos_y = 0, mouse_pos_x = 0, mouse_pos_y = 0;
    ball.onmousedown = dragMouseDown;

    function dragMouseDown(mouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();

        // get the mouse cursor position at startup:
        mouse_pos_x = mouseEvent.clientX;
        mouse_pos_y = mouseEvent.clientY;

        document.onmouseup = closeDragElement;

        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(mouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();
        
        // calculate the new cursor position:
        element_pos_x = mouse_pos_x - mouseEvent.clientX;
        element_pos_y = mouse_pos_y - mouseEvent.clientY;
        mouse_pos_x = mouseEvent.clientX;
        mouse_pos_y = mouseEvent.clientY;

        var ballBoundary = ball.getBoundingClientRect();

        document.getElementById('debug-element-top').innerHTML = ballBoundary.top + " ";
        document.getElementById('debug-element-right').innerHTML = ballBoundary.right + " ";
        document.getElementById('debug-element-bottom').innerHTML = ballBoundary.bottom + " ";
        document.getElementById('debug-element-left').innerHTML = ballBoundary.left + " ";

        document.getElementById('ball-elementX').innerHTML = ((ballBoundary.top + ballBoundary.bottom) / 2) + " ";
        document.getElementById('ball-elementY').innerHTML = ((ballBoundary.right + ballBoundary.left) / 2) + " ";

        // set the element's new position:
        setElementPos(element_pos_x, element_pos_y, ball);
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function setOriginVisualizerPos(element) {
        ballCenter.style.top = ((element.top + element.bottom) / 2) + "px";
        ballCenter.style.left = ((element.right + element.left) / 2) + "px";
    }

    function setElementPos(posX, posY, element) {
        mouseEvent = window.event;
        mouseEvent.preventDefault();

        var elementBoundary = element.getBoundingClientRect();

        if(containerBoundary.top > elementBoundary.top) {
            ball.style.top = (containerBoundary.top + 26) + "px";
        } else if ((containerBoundary.bottom < elementBoundary.bottom)) {
            ball.style.top = (containerBoundary.bottom - 26) + "px";
        } else {
            ball.style.top = (ball.offsetTop - posY) + "px";
        }

        if(containerBoundary.right < elementBoundary.right) {
            ball.style.left = (containerBoundary.right - 26) + "px";
        } else if ((containerBoundary.left > elementBoundary.left)) {
            ball.style.left = (containerBoundary.left + 26) + "px";
        } else {
            ball.style.left = (ball.offsetLeft - posX) + "px";
        }

        setOriginVisualizerPos(elementBoundary)
    }
}

