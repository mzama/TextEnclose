// This program looks at a selection of text,
// determines whether or not it is within an input field or text area,
// and based on the key pressed, encloses that selection within certain characters (brackets, quotations, etc). 

var enclosingCharacters = ["'", '"', '`', '/', '\\', '|', '[', ']', '(', ')', '{', '}', '<', '>'];

// Look for the selected text when a key is pressed
document.onkeydown = selectAndEncloseText;

// Get the selected text and enclose it within the appropriate character
function selectAndEncloseText(e) {
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
            let _text = _activeElement.value.slice(_activeElement.selectionStart, _activeElement.selectionEnd);
            if (_text) {
                // Disable the field to prevent the character from being added to the end
                _activeElement.disabled = true;

                switch(_keyDown) {
                    default:
                        _activeElement.value = (
                            _activeElement.value.slice(0, _activeElement.selectionStart) + 
                            _keyDown + 
                            _text + 
                            _keyDown + 
                            _activeElement.value.slice(_activeElement.selectionEnd, _activeElement.value.length)
                        );
                        break;
                    case '[':
                    case ']':
                        _activeElement.value = (
                            _activeElement.value.slice(0, _activeElement.selectionStart) + 
                            '[' + 
                            _text + 
                            ']' + 
                            _activeElement.value.slice(_activeElement.selectionEnd, _activeElement.value.length)
                        );
                        break;
                    case '(':
                    case ')':
                        _activeElement.value = (
                            _activeElement.value.slice(0, _activeElement.selectionStart) + 
                            '(' + 
                            _text + 
                            ')' + 
                            _activeElement.value.slice(_activeElement.selectionEnd, _activeElement.value.length)
                        );
                        break;
                    case '{':
                    case '}':
                        _activeElement.value = (
                            _activeElement.value.slice(0, _activeElement.selectionStart) + 
                            '{' + 
                            _text + 
                            '}' + 
                            _activeElement.value.slice(_activeElement.selectionEnd, _activeElement.value.length)
                        );
                        break;
                    case '<':
                    case '>':
                        _activeElement.value = (
                            _activeElement.value.slice(0, _activeElement.selectionStart) + 
                            '<' + 
                            _text + 
                            '>' + 
                            _activeElement.value.slice(_activeElement.selectionEnd, _activeElement.value.length)
                        );
                        break;                    
                }                
                // Re-enable and reselect the field
                _activeElement.disabled = false;
                // _activeElement.focus();
            }
        }
    }
}