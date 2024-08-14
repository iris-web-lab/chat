navigator.serviceWorker && navigator.serviceWorker.register('./../sw.js').then(function (registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

window.onload = function () {
  document.querySelector("#status").innerHTML = 'Loading...';

  var newDiv = "";
  
  const frame = document.querySelector(".frame");
  for (let i = 0; i < 12; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("div");
    frame.appendChild(newDiv);
  }

  document.querySelector("#status").innerHTML = '';
}
