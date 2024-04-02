let notifications = document.querySelector(".notifications");
let success = document.querySelector("#success");
let error = document.querySelector("#error");
let warning = document.querySelector("#warning");
let info = document.querySelector("#info");

function createToast(type, icon, title, text) {
  let newToast = document.createElement("div");

  newToast.innerHTML = `<div class="toast ${type}">
            <!--  icon -->
         <div>
         ${icon}
</div>
            <div class="content">
              <div class="title">${title}</div>
              <span>${text}</span>
            </div>
            <!-- close icon -->
         <div onClick="(this.parentElement).remove()">
         <svg
         xmlns="http://www.w3.org/2000/svg"
         width="1em"
         height="1em"
         viewBox="0 0 15 15"
         >
              <path
                fill="white"
                d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
              />
                </div>
            </svg>
          </div>
 </div>
          `;
  // add on click
  notifications.appendChild(newToast);
  // remove after 5s
  newToast.timeOut = setTimeout(() => newToast.remove(), 3000);
}

// success.addEventListener("click", () => {
//   let type = "success";
//   let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>
//            `;
//   let title = "success";
//   let text = "This is  a success toast.";
//   createToast(type, icon, title, text);
// });

// error.addEventListener("click", () => {
//   let type = "error";
//   let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
//   class="toast-icons"
//   ><path fill="#f24d4c" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>`;
//   let title = "error";
//   let text = "This is  a error toast.";
//   createToast(type, icon, title, text);
// });
// warning.addEventListener("click", () => {
//   let type = "warning";
//   let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
//  class="toast-icons"
//   ><path fill="#e9bd0c" d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z"/></svg>`;
//   let title = "Warning";
//   let text = "This is  a warning toast.";
//   createToast(type, icon, title, text);
// });

// info.addEventListener("click", () => {
//   let type = "info";
//   let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
//   let title = "Info";
//   let text = "This is  a info toast.";
//   createToast(type, icon, title, text);
// });
