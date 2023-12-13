function injectScript() {
  const timeToClick = new Date(
    document.getElementById("time-to-click").value
  ).getTime();

  document.getElementById("status").innerHTML = "Time Set 😛";

  let clicked = false;

  setInterval(() => {
    let remainingTime = (timeToClick - Date.now()) / 1000;

    if (!clicked) {
      document.getElementById(
        "timer"
      ).innerHTML = `Seconds remaining: ${remainingTime.toFixed(1)}`;
    } else {
      document.getElementById("timer").innerHTML = "Clicked!";
    }

    if (!clicked && timeToClick <= Date.now()) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          func: () => {
            if (document.getElementById("DERIVED_SSR_FL_SSR_ENROLL_FL")) {
              document.getElementById("DERIVED_SSR_FL_SSR_ENROLL_FL").click();
            }
          },
          target: {
            tabId: tabs[0].id,
          },
          world: "MAIN",
        });
      });

      clicked = true;
    }
  }, 1);
}

document.getElementById("set-time-btn").addEventListener("click", injectScript);
