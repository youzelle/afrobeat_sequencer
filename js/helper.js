//BUTTON HELPERS

function swapButtons(hide, show) {
    document.getElementById(show).classList.remove("hidden");
    document.getElementById(hide).classList.add("hidden");
}

function toggleDisable(button) {
    let ele = document.getElementById(button)
    if (ele.disabled) {
        console.log("Enabling button", button);
        ele.removeAttribute("disabled");
    } else {
        console.log("Disabling button", button);
        ele.setAttribute("disabled", "disabled");
    }
}