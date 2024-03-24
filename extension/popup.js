// Event listener for the dropdown selection
document.getElementById('reading-level').addEventListener('change', function () {
    const levelText = this.value; // The value of the selected option

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "translate",
            level: levelText // Send the selected level to the content script
        });
    });
});

// Event listener for the "Revert Changes" button
document.getElementById('revert').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "revert" });
    });
});

// Placeholder for "save settings"
document.getElementById('save').addEventListener('click', function () {
    // For now, do nothing
});
