
// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
// let close = document.getElementsByClassName("close");
// for (let i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//         let div = this.parentElement;
//         div.style.display = "none";
//     }
// }

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        remove(div)
    }
}

function remove(el) {
    let element = el;
    element.remove()
}

// // Add a "checked" symbol when clicking on a list item
// let list = document.querySelector('ul');
// list.addEventListener('click', function (ev) {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);


function newElement() {
    let input = document.createElement("input");
    input.setAttribute("type", "text")
    input.setAttribute("name", "task")
    input.setAttribute("class", "form-control")
    document.getElementById("myUL").appendChild(input);

}

