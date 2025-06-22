chrome.commands.onCommand.addListener((command) => {
  if (command === "open-tab-search") {
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 500,
      height: 600,
    });
  }
});
