window.onload = function() {
    var loremIpsumGenerator = new LoremIpsum();
    var contentElement = document.getElementById("content");
    contentElement.innerText = loremIpsumGenerator.generate(3000);
}