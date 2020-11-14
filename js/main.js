// This program looks at a selection of text,
// determines whether or not it is within an input field or text area,
// and based on the key pressed, encloses that selection within certain characters (brackets, quotations, etc). 

function getTextSelection(e) {
    let _text = "";
    let _element = document.activeElement;
    let _elementTagName = _element ? _element.tagName.toLocaleLowerCase() : null;

    if (e.keyCode===17) {
        if (
            (_elementTagName === "textarea") || 
            (_elementTagName === "input" &&
            /^(?:text|search|password|tel|url)$/i.test(_element.type)) &&
            (typeof _element.selectionStart == "number")
        ) {
            _text = _element.value.slice(_element.selectionStart, _element.selectionEnd);
            if (_text) {
                _element.value = (
                    _element.value.slice(0, _element.selectionStart) + 
                    '"' + 
                    _element.value.slice(_element.selectionStart, _element.selectionEnd) + 
                    '"' + 
                    _element.value.slice(_element.selectionEnd, _element.value.length)
                );
            }
        }
    }
}

//Look for selected text when a key is pressed
document.onkeydown = getTextSelection;