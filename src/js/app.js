var loremIpsum = require('lorem-ipsum');

window.onload = function() {
    var contentElement = document.getElementById("content");
    contentElement.innerText = loremIpsum({
        count: 3000
    })
}