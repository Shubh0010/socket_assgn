$(function () {
  var socket = io.connect();
  var $messageForm = $(`#messageForm`);
  var $message = $(`#message`);
  var $chat = $(`#chat`)
  var $messageArea = $(`#messageArea`)
  var $userFormArea = $(`#userFormArea`)
  var $users = $(`#users`)
  var $userForm = $(`#userForm`)
  var $username = $(`#username`)
  console.log("test")
  $messageForm.submit(function (e) {
    e.preventDefault();
    console.log(`submitted`)
    socket.emit(`send message`, $message.val())
    $message.val(``)
  })

  socket.on(`new message`, (data) => {
    $chat.append(`<div class="well"><strong>` + data.user + `</strong>:` + data.msg + `</div>`)
  })
  $userForm.submit(function (e) {
    e.preventDefault();
    console.log(`submitted`)
    socket.emit(`new user`, $username.val(), (data) => {
      if (data) {
        $userFormArea.hide()
        $messageArea.show()
      }
    })
    $username.val(``)
  })
  socket.on(`get users`, (data) => {
    var html = "";
    for (i = 0; i < data.length; i++) {
      html += `<li class="list-group-item">` + data[i] + `</li>`
    }
  })
})