
document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('save');
    console.log('Popup loaded'); // To check if popup.js is loaded
    saveButton.addEventListener('click', function() {
        var readingLevel = document.getElementById('reading-level').value;
        console.log('Saving reading level: ' + readingLevel); // To check if button click works
        chrome.storage.sync.set({'readingLevel': readingLevel}, function() {
            console.log('Reading level set to ' + readingLevel); // To confirm storage set
        });
    });
});
