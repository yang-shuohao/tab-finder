const searchInput = document.getElementById("search");
const results = document.getElementById("results");

let tabs = [];

chrome.tabs.query({}, (allTabs) => {
  tabs = allTabs;
  showResults(tabs);
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = tabs.filter(tab =>
    tab.title.toLowerCase().includes(term) ||
    tab.url.toLowerCase().includes(term)
  );
  showResults(filtered);
});

function showResults(filteredTabs) {
  results.innerHTML = "";
  filteredTabs.forEach(tab => {
    const li = document.createElement("li");
    li.textContent = `${tab.title}`;
    li.title = tab.url;
    li.addEventListener("click", () => {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.update(tab.windowId, { focused: true });
    });
    results.appendChild(li);
  });
}

document.getElementById('shortcut-settings').addEventListener('click', () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

document.getElementById('github-button').addEventListener('click', () => {
  chrome.tabs.create({ url: "https://github.com/yang-shuohao/tab-finder?tab=readme-ov-file" });
});
