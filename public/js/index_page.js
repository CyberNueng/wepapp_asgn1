var socket = io();
var modal = document.getElementById('loginPop');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}