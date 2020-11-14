// This program looks at a selection of text,
// determines whether or not it is within an input field or text area,
// and based on the key pressed, encloses that selection within certain characters (brackets, quotations, etc). 

var enclosingCharacters = ["'", '"', '`', '/', '\\', '|', '[', ']', '(', ')', '{', '}', '<', '>'];

// Look for the selected text when a key is pressed -- if its within an input field, enclose it within the appropriate character
document.onkeydown = function(e) {
    let _keyDown = e.key;
    //Determine if the key pressed corresponds to an enclosing character
    if (enclosingCharacters.includes(_keyDown)) {
        let _activeElement = document.activeElement;
        let _elementTagName = _activeElement ? _activeElement.tagName.toLocaleLowerCase() : null;

        // Determine if the element selected can be input into
        if (
            (_elementTagName === "textarea") || 
            (_elementTagName === "input" &&
            /^(?:text|search|password|tel|url)$/i.test(_activeElement.type)) &&
            (typeof _activeElement.selectionStart == "number")
        ) {    
            let _start = _activeElement.selectionStart;
            let _end = _activeElement.selectionEnd;   
            let _text = _activeElement.value.slice(_start, _end);
            
            // Disable the field to prevent the character from being added to the end
            _activeElement.disabled = true;

            switch(_keyDown) {
                default:
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        _keyDown + 
                        _text + 
                        _keyDown + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                    break;
                case '[':
                case ']':
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        '[' + 
                        _text + 
                        ']' + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                    break;
                case '(':
                case ')':
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        '(' + 
                        _text + 
                        ')' + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                    break;
                case '{':
                case '}':
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        '{' + 
                        _text + 
                        '}' + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                    break;
                case '<':
                case '>':
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        '<' + 
                        _text + 
                        '>' + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                    break;                    
            }                
            // Re-enable and reselect the field
            _activeElement.disabled = false;
            _activeElement.setSelectionRange(_start + 1, _end + 1);
            //Call after a delay so the actual input is ignored, otherwise highlighted text is replaced
            setTimeout(function() { reselectField(_activeElement); }, 1);
        }
    }
}
function reselectField(_field) {
    _field.focus();
}