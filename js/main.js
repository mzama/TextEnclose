function getTextSelection() {
    console.log(window.getSelection().toString());
}
document.onkeydown = getTextSelection;