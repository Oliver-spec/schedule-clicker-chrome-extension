const injectScript = () => {
  const timeToClick = new Date(
    document.getElementById("time-to-click").value
  ).getTime();
  // const clickCount = document.getElementById("click-count-selector").value;
  const targetBtnId = document.getElementById("id-selector").value;

  document.getElementById("status").innerHTML = "Time Set 😛";

  let clicked = false;

  setInterval(() => {
    if (!clicked && timeToClick <= Date.now()) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          func: (id) => {
            if (document.getElementById(id)) {
              document.getElementById(id).click();
              console.log("clicked");
            }
          },
          args: [targetBtnId],
          target: {
            tabId: tabs[0].id,
          },
          world: "MAIN",
        });
      });

      clicked = true;
    }
  }, 1);
};

document.getElementById("set-time-btn").addEventListener("click", injectScript);
