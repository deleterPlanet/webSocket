var clients = {},
    data = [],
    webSocketServer = new require('ws');
webSocketServer = new webSocketServer.Server({
    port: 8080
});
for (var i = 0; i < 100; i++){
    data[i] = i + 1;
}

webSocketServer.on('connection', function(ws) {
  var i = 0,
    id = Math.random(),
    idInterval;
  clients[id] = ws;
  console.log("новое соединение " + id);


  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);
    worker({start : message, id : id, data : data}, end);
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    clearInterval(idInterval);
  });

  function end(id){
    console.log('данные отправленны ' + id);
    /*delete clients[id];*/
  }

  async function worker (task, callback){
    i = task.start;
    idInterval = setInterval(function a (){
      console.log(i);
      clients[task.id].send(task.data[i]);
      i++;
      if (i > task.data.length - 1){
        callback(task.id)
        clearInterval(idInterval);
      }
    }, 1000);
  }

});