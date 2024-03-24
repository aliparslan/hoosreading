chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        // The URL you want to redirect users to on first install
        const firstTimeUrl = "https://hoosreading.us";
        chrome.tabs.create({ url: firstTimeUrl });
    }
});
