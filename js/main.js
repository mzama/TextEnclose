// This program looks at a selection of text,
// determines whether or not it is within an input field or text area,
// and based on the key pressed, encloses that selection within certain characters (brackets, quotations, etc). 
var isEnabled = true;
var enclosingCharacters = [
    {
        openingChar: "'",
        closingChar: "'",
        writeWhenEmpty: false
    }, {
        openingChar: '"',
        closingChar: '"',
        writeWhenEmpty: true
    }, {
        openingChar: '`',
        closingChar: '`',
        writeWhenEmpty: true
    }, {
        openingChar: '/',
        closingChar: '/',
        writeWhenEmpty: false
    }, {
        openingChar: '\\',
        closingChar: '\\',
        writeWhenEmpty: false
    }, {
        openingChar: '|',
        closingChar: '|',
        writeWhenEmpty: false
    }, {
        openingChar: '[',
        closingChar: ']',
        writeWhenEmpty: true
    }, {
        openingChar: '(',
        closingChar: ')',
        writeWhenEmpty: true
    }, {
        openingChar: '{',
        closingChar: '}',
        writeWhenEmpty: true
    }, {
        openingChar: '<',
        closingChar: '>',
        writeWhenEmpty: false
    },
];
document.querySelector("#enableButton").addEventListener("onclick", function(){console.log("clicked")});
// Look for the selected text when a key is pressed -- if its within an input field, enclose it within the appropriate character
document.onkeydown = function(e) {
    let _keyDown = e.key;

    //Determine if the key pressed corresponds to an enclosing character
    let _encChar = enclosingCharacters.filter(c => c.openingChar === _keyDown || c.closingChar === _keyDown)[0];
    if (_encChar && isEnabled){
        //Get the current active element from the document
        let _activeElement = document.activeElement;
        let _elementTagName = _activeElement ? _activeElement.tagName.toLocaleLowerCase() : null;

        // Determine if the element selected can be input into
        if (
            (_elementTagName === "textarea") || 
            (_elementTagName === "input" &&
            /^(?:text|search|password|tel|url)$/i.test(_activeElement.type)) &&
            (typeof _activeElement.selectionStart == "number")
        ) { 
            //Get the selection indicies and the enclosed text   
            let _start = _activeElement.selectionStart;
            let _end = _activeElement.selectionEnd;   
            let _text = _activeElement.value.slice(_start, _end);

            if (_text || _encChar.writeWhenEmpty) {
                // Disable the field to prevent the character from being added to the end
                _activeElement.disabled = true;
                
                //Do not write the character if it is the next in value, to avoid doubling closing brackets
                if (_text || _keyDown !== _activeElement.value.slice(_start, _start + 1)) {
                    // Rewrite the field's value with the selected text enclosed
                    _activeElement.value = (
                        _activeElement.value.slice(0, _start) + 
                        _encChar.openingChar + 
                        _text + 
                        _encChar.closingChar + 
                        _activeElement.value.slice(_end, _activeElement.value.length)
                    );
                }
                // Re-enable and reselect the field
                _activeElement.disabled = false;
                _activeElement.setSelectionRange(_start + 1, _end + 1);
                //Call after a delay so the actual input is ignored, otherwise highlighted text is replaced
                setTimeout(function() { reselectField(_activeElement); }, 1);
            }                   
        }
    }
}

function reselectField(_field) {
    _field.focus();
}