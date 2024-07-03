const socket = io(); //send ev and rec
console.log("hi", msg);
const send = document.querySelector("#send");
const messageInput = document.querySelector("#msg");

const $messages = document.querySelector("#messages");

//templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

send.addEventListener("click", () => {
  send.setAttribute("disabled", "disbaled");
  const msg = document.getElementById("msg").value;
  socket.emit("msgReceived", msg, (error) => {
    send.removeAttribute("disabled");
    messageInput.value = "";
    messageInput.focus();
    if (error) return console.log(error);
    console.log("Message Delivered !");
  }); //client to server
});

const loc = document.querySelector("#send-loc");
loc.addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Not Supported");
  navigator.geolocation.getCurrentPosition((position) => {
    loc.setAttribute("disabled", "disabled");
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("shared");
        loc.removeAttribute("disabled");
      }
    );
  });
});
