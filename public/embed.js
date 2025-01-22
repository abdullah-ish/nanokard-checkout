(function () {
  // Function to inject CSS into the document head
  function injectCSS() {
    const css = `
      .pay-with-nanokard {
        width: var(--button-width, 633px); /* Default width */
        height: var(--button-height, 62px); /* Default height */
        background-color: var(--button-color, #34bcff); /* Default color */
        gap: 16px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        transition: background-color 0.3s ease;
        padding: 0 16px;
      }
      
      .pay-with-nanokard:hover {
        background-color: var(
          --button-hover-color,
          #2ba8e1
        ); /* Default hover color */
      }

      .pay-with-nanokard img {
        width: auto;
        height: 50%;
      }

      .pay-with-nanokard .icon-text {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .pay-with-nanokard .text {
        font-family: "Open Sans", sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.4;
        color: white;
        white-space: nowrap;
      }
    `;

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  // Function to open a popup window with the provided URL
  function openPopupWindow(url) {
    const width = 839;
    const height = 819;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const windowFeatures = `
      toolbar=no,
      location=no,
      directories=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      copyhistory=no,
      width=${width},
      height=${height},
      top=${top},
      left=${left}
    `;

    const popupWindow = window.open(url, "_blank", windowFeatures);

    // Focus the popup window when it's opened
    if (popupWindow) {
      popupWindow.focus();
    }
  }

  // Function to open the widget in a new window with the provided URL
  function openNewWindow(url) {
    openPopupWindow(url);
  }

  // Function to initialize the checkout widget
  function initializeCheckoutWidget(sessionId, checkout_widget_url) {
    const url = `${checkout_widget_url}?sessionId=${sessionId}`;
    openNewWindow(url);
  }

  // Expose the SVGs as base64-encoded data URIs
  const vectorSVG =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzOS40MyAwSDEzNi42MjFWNS45NTU3NUgxMzAuNTAyQzEyNi44IDUuOTU1NzUgMTI0LjQ4OSA4LjE5MjQxIDEyNC40ODkgMTIuODIxOEMxMjQuNDg5IDE3LjQ1MTEgMTI2LjggMTkuNjg3OCAxMzAuNTAyIDE5LjY4NzhIMTM0LjMzNkMxMzcuNjQ1IDE5LjY4NzggMTM5LjQzIDE3Ljc2MzIgMTM5LjQzIDEzLjgxMDFWMFpNMTM2LjYyMSAxMy42OEMxMzYuNjIxIDE2LjAyMDcgMTM1Ljc1NCAxNy4wMDkgMTMzLjUyMiAxNy4wMDlIMTMwLjc2NUMxMjguMzc1IDE3LjAwOSAxMjcuMjk5IDE1Ljc4NjYgMTI3LjI5OSAxMi44MjE4QzEyNy4yOTkgOS44NTY5IDEyOC4zNzUgOC42MDg1MyAxMzAuNzY1IDguNjA4NTNIMTM2LjYyMVYxMy42OFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMjIuNDE4IDUuOTU1ODVIMTE2LjcxOUMxMTMuOTg4IDUuOTU1ODUgMTEyLjk2NCA3LjIwNDIyIDExMi45NjQgOS45NjEwM1YxOS42ODc5SDExNS43NDhWMTAuMzc3MkMxMTUuNzQ4IDkuMTgwOCAxMTYuMjk5IDguNjA4NjMgMTE3LjUzMyA4LjYwODYzSDEyMi40MThWNS45NTU4NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTUuODk5NSA1Ljk1NTg1SDEwNC4yMjRDMTA3LjY5IDUuOTU1ODUgMTA5LjA1NSA3Ljg4MDQyIDEwOS4wNTUgMTAuNDgxMlYxNi45MzExQzEwOS4wNTUgMTguOTA3NyAxMDguNTMgMTkuNjg3OSAxMDYuMTkzIDE5LjY4NzlIOTkuNzA3Qzk2LjQyNDcgMTkuNjg3OSA5NS4wNTkyIDE4LjEwMTQgOTUuMDU5MiAxNS41MDA3Qzk1LjA1OTIgMTMuMDAzOSA5Ni4zMTk2IDExLjU0NzUgOTkuNzMzMyAxMS41NDc1SDEwNi4zMjRWMTAuNTA3MkMxMDYuMzI0IDkuNDQwODggMTA1LjcyIDguNjA4NjMgMTA0LjE5NyA4LjYwODYzSDk1Ljg5OTVWNS45NTU4NVpNMTA1LjU2MyAxNy4wMDkxQzEwNi4xMTQgMTcuMDA5MSAxMDYuMzI0IDE2LjgwMSAxMDYuMzI0IDE2LjMwNjlWMTMuNzMyMUg5OS43ODU4Qzk4LjMxNTMgMTMuNzMyMSA5Ny43OTAxIDE0LjMzMDMgOTcuNzkwMSAxNS4zNDQ2Qzk3Ljc5MDEgMTYuMzU4OSA5OC4zNDE2IDE3LjAwOTEgOTkuNzMzMyAxNy4wMDkxSDEwNS41NjNaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNODAuNjAyNCAyLjEzMjYxSDc3LjUwMzhWMTkuNjg3OEg4MC42MDI0VjEyLjM1MzZIODIuMzA5MkM4NS42NDQxIDEyLjM1MzYgODYuMjc0MyAxMi42MTM3IDg3LjI0NTggMTQuNDg2Mkw4OS45NTA1IDE5LjY4NzhIOTMuNDE2N0w5MC41NTQ1IDE0LjE3NDJDODkuNTA0MSAxMi4xNDU2IDg4LjY5MDEgMTEuMjM1MyA4Ny4wMzU4IDEwLjc5MzJDODguNDggMTAuMTY5IDg5LjMyMDMgOS4xNTQ2OCA5MC4xMDgxIDcuNTk0MjJMOTIuODkxNSAyLjEzMjYxSDg5LjU1NjZMODYuODUyIDcuMzg2MTZDODUuODU0MSA5LjMxMDcyIDg1LjM1NTIgOS41NzA4IDgyLjMwOTIgOS41NzA4SDgwLjYwMjRWMi4xMzI2MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjUuMDg2MiA1Ljk1NTg1SDY4LjAwMDlDNzEuNjc3MiA1Ljk1NTg1IDc0LjAxNDIgOC4xOTI1MSA3NC4wMTQyIDEyLjgyMTlDNzQuMDE0MiAxNy40NTEyIDcxLjY3NzIgMTkuNjg3OSA2OC4wMDA5IDE5LjY4NzlINjUuMDg2MkM2MS4zODM3IDE5LjY4NzkgNTkuMDczIDE3LjQ1MTIgNTkuMDczIDEyLjgyMTlDNTkuMDczIDguMTkyNTEgNjEuMzgzNyA1Ljk1NTg1IDY1LjA4NjIgNS45NTU4NVpNNjcuNzM4NCA4LjYwODYzSDY1LjM0ODhDNjIuOTMzIDguNjA4NjMgNjEuODgyNiA5Ljg1NyA2MS44ODI2IDEyLjgyMTlDNjEuODgyNiAxNS43ODY3IDYyLjkzMyAxNy4wMDkxIDY1LjM0ODggMTcuMDA5MUg2Ny43Mzg0QzcwLjEyNzkgMTcuMDA5MSA3MS4yMDQ1IDE1Ljc4NjcgNzEuMjA0NSAxMi44MjE5QzcxLjIwNDUgOS44NTcgNzAuMTI3OSA4LjYwODYzIDY3LjczODQgOC42MDg2M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00OC44MzEyIDUuOTU1ODVINDMuMTA2N0M0MS43MTUgNS45NTU4NSA0MS4xNjM2IDYuNDc2MDEgNDEuMTYzNiA4LjA4ODQ4VjE5LjY4NzlINDMuOTQ3VjguOTk4NzVDNDMuOTQ3IDguNzM4NjcgNDQuMDUyMSA4LjYwODYzIDQ0LjI4ODQgOC42MDg2M0g0OC44MzEyQzUxLjc0NTkgOC42MDg2MyA1My4wMDYzIDkuODA0OTggNTMuMDA2MyAxMS45NjM2VjE5LjY4NzlINTUuODE2VjExLjk2MzZDNTUuODE2IDguMTY2NSA1My41MzE1IDUuOTU1ODUgNDguODMxMiA1Ljk1NTg1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNC4wNzI1IDUuOTU1ODVIMzIuMzk2NUMzNS44NjI3IDUuOTU1ODUgMzcuMjI4MSA3Ljg4MDQyIDM3LjIyODEgMTAuNDgxMlYxNi45MzExQzM3LjIyODEgMTguOTA3NyAzNi43MDMgMTkuNjg3OSAzNC4zNjU5IDE5LjY4NzlIMjcuODhDMjQuNTk3NyAxOS42ODc5IDIzLjIzMjIgMTguMTAxNCAyMy4yMzIyIDE1LjUwMDdDMjMuMjMyMiAxMy4wMDM5IDI0LjQ5MjYgMTEuNTQ3NSAyNy45MDYzIDExLjU0NzVIMzQuNDk3MlYxMC41MDcyQzM0LjQ5NzIgOS40NDA4OCAzMy44OTMzIDguNjA4NjMgMzIuMzcwMyA4LjYwODYzSDI0LjA3MjVWNS45NTU4NVpNMzMuNzM1NyAxNy4wMDkxQzM0LjI4NzIgMTcuMDA5MSAzNC40OTcyIDE2LjgwMSAzNC40OTcyIDE2LjMwNjlWMTMuNzMyMUgyNy45NTg4QzI2LjQ4ODMgMTMuNzMyMSAyNS45NjMxIDE0LjMzMDMgMjUuOTYzMSAxNS4zNDQ2QzI1Ljk2MzEgMTYuMzU4OSAyNi41MTQ2IDE3LjAwOTEgMjcuOTA2MyAxNy4wMDkxSDMzLjczNTdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMy42NzE3OCAxOS42ODc5VjUuNzk5ODNDMy42NzE3OCA1LjE3NTY0IDQuMDM5NCA0Ljc4NTUzIDQuNzQ4MzkgNC43ODU1M0M1LjI5OTgyIDQuNzg1NTMgNS42MTQ5MyA1LjAxOTYgNS44NTEyNiA1LjUzOTc1TDExLjAyNDIgMTYuNzQ5QzExLjc1OTUgMTguNzUxNiAxMi44ODg2IDIwIDE1LjM1NjkgMjBDMTguMDg3OSAyMCAxOS40MjcxIDE4LjQ2NTYgMTkuNDI3MSAxNi4xNTA5VjIuMTMyNzVIMTYuMzAyM1YxNi4wMjA4QzE2LjMwMjMgMTYuNjE5IDE1LjkwODQgMTcuMDA5MSAxNS4yNTE5IDE3LjAwOTFDMTQuNjc0MiAxNy4wMDkxIDE0LjMzMjggMTYuNjk3IDE0LjEyMjggMTYuMjgwOUw4Ljk0OTc5IDUuMDcxNjFDOC4yMTQ1NSAzLjA2OTAyIDcuMTExNjggMS44MjA2NiA0LjY0MzM1IDEuODIwNjZDMS44ODYxOCAxLjgyMDY2IDAuNTczMjQyIDMuMzU1MTEgMC41NzMyNDIgNS42NDM3OFYxOS42ODc5SDMuNjcxNzhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";
  const unionSVG =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzciIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM2LjUzMjMgNi41NjAwNEMzNi41MzIzIDIuOTQyMTkgMzMuNTg4NiAwIDI5Ljk3MTYgMEMyNi4zNTQ1IDAgMjMuNTkwNSAyLjczNjU3IDIzLjQxNzYgNi4yMzIzOUMyMy40MTMxIDYuMzA2OTYgMjMuNDEwOCA5LjY5NDMgMjMuNDEwOCAxMy4zODlMMTEuOTg2NCAyLjE0OTAyQzEwLjc0NjYgMC43ODQxMzMgOC45NzY3NyAwLjAwMjI2MTk1IDcuMTI5NTcgMC4wMDIyNjE5NUM1LjUwMzAzIDAuMDAyMjYxOTUgMy45NDI0NiAwLjYwMzM0OSAyLjczNDUgMS42OTI1NUMxLjM5Njg3IDIuODk5MjUgMC42MTIwNDEgNC42MjExOSAwLjU3MzM2OCA2LjQyMjJDMC41NzMzNjggNi40NDAyOCAwLjU3MTA5MSA2LjQ2MDYyIDAuNTcxMDkxIDYuNDc4N0MwLjU3MTA5MSA2LjQ3ODcgMC41NjQyNzUgMjcuNDYyNyAwLjU4MDE5OSAyOS40NDQ1QzAuNTg0NzQ5IDI5Ljk0ODQgMC43MjEyMjQgMzAuNjc4MyAwLjg0NjM0MiAzMS4xNDM4QzEuNjE1MjUgMzQuMDAyNCA0LjIyIDM2IDcuMTg0MTYgMzZDMTAuODAxMiAzNiAxMy43NDQ5IDMzLjA1NzggMTMuNzQ0OSAyOS40NFYyMi4zOTQxQzE4LjQ4MTIgMjcuMTg3IDI0LjcwNzUgMzMuNDgyNiAyNC43MDUyIDMzLjQ4MjZDMjcuMzQ4NiAzNi4yMDExIDMxLjY5NTkgMzYuNDYzMiAzNC40MDk4IDM0LjAxMTRDMzUuNzcyNSAzMi43ODIxIDM2LjU2MTkgMzEuMDIxOCAzNi41NzMyIDI5LjE4MDFDMzYuNTczMiAyOS4xODAxIDM2LjUzMjMgNi42MzQ2MiAzNi41MzIzIDYuNTYyMzFWNi41NjAwNFpNMTIuMjU3MSAyOS40Mzc3QzEyLjI1NzEgMzIuMjM1MyA5Ljk3OTk4IDM0LjUxMDggNy4xODQxNiAzNC41MTA4QzQuODkzMzcgMzQuNTEwOCAyLjg3NTU0IDMyLjk2NzQgMi4yODQwOCAzMC43NTc0QzIuMTY1NzggMzAuMzE2NyAyLjA3MjUzIDI5LjczNiAyLjA2Nzk4IDI5LjQzMDlDMi4wNTIwNSAyNy40NTU5IDIuMDU4ODcgMjMuMDQwNCAyLjA2MzQyIDE5LjgxMzVDMi4wNjM0MiAxOC44NDE4IDIuMDY1NyAxNy45NTgyIDIuMDY3OTggMTcuMjUwOUMyLjE2NTggMTUuMjEwNCAzLjAyNzk3IDE0LjY0NzcgNC4yODM3IDE0LjQ1NTZDNS40NzU3MyAxNC4yNzAzIDcuMjMxOTMgMTUuNzk1NiA5LjczODg0IDE4LjMzNTZDMTAuMzk0IDE4Ljk5NzcgMTEuMjYzIDE5Ljg3OSAxMi4yNTk0IDIwLjg4NjhWMjkuNDM3N0gxMi4yNTcxWk0zMi43NTYgMjEuMzM2NUMzMS4zMjk3IDIxLjMzNjUgMjkuOTk2NiAxOS45MjY0IDI3LjQwNzggMTcuMzIwOUwyNC44OTYzIDE0Ljg1MTFDMjQuODk2MyAxMS4zMjgxIDI0Ljg5ODYgNi41NzgxMSAyNC45MDMxIDYuMjkzMzhDMjUuMDQxOSAzLjU5NzUxIDI3LjI2NjcgMS40ODY5MyAyOS45NzE2IDEuNDg2OTNDMzIuNjc2NCAxLjQ4NjkzIDM1LjA0NDUgMy43NjI0OSAzNS4wNDQ1IDYuNTY0NTdDMzUuMDQ0NSA2LjY0MTQgMzUuMDc4NiAxMy40NTY4IDM1LjA4NTUgMTguMDYyMUMzNS4wNzY0IDE5Ljk0NDUgMzQuNjY0NiAyMS4zMzY1IDMyLjc1NiAyMS4zMzY1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI5Ljk1MyA4LjA3NjAzQzMwLjk5OTYgOC4wNzYwMyAzMS44NDggNy4yMzM0MSAzMS44NDggNi4xOTM5NkMzMS44NDggNS4xNTQ1MSAzMC45OTk2IDQuMzExODkgMjkuOTUzIDQuMzExODlDMjguOTA2NSA0LjMxMTg5IDI4LjA1ODEgNS4xNTQ1MSAyOC4wNTgxIDYuMTkzOTZDMjguMDU4MSA3LjIzMzQxIDI4LjkwNjUgOC4wNzYwMyAyOS45NTMgOC4wNzYwM1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03LjIwMTggMzEuNjgzNUM4LjI0ODM2IDMxLjY4MzUgOS4wOTY3OSAzMC44NDA5IDkuMDk2NzkgMjkuODAxNEM5LjA5Njc5IDI4Ljc2MiA4LjI0ODM2IDI3LjkxOTQgNy4yMDE4IDI3LjkxOTRDNi4xNTUyNCAyNy45MTk0IDUuMzA2ODcgMjguNzYyIDUuMzA2ODcgMjkuODAxNEM1LjMwNjg3IDMwLjg0MDkgNi4xNTUyNCAzMS42ODM1IDcuMjAxOCAzMS42ODM1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

  // Event listener to handle window closing and redirection
  window.addEventListener("message", function (event) {
    if (event.data.action === "closeWindow") {
      localStorage.removeItem("checkoutId");
      window.close();
    }

    if (event.data.action === "redirect") {
      window.location.href = event.data.url;
    }
  });

  // Inject CSS when the script is loaded
  injectCSS();

  // Expose the initialize function and SVGs to the global scope
  window.initializeCheckoutWidget = initializeCheckoutWidget;
  window.vectorSVG = vectorSVG;
  window.unionSVG = unionSVG;
})();
