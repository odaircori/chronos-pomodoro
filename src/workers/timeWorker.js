self.onmessage = function (event) {
    console.log("Received message from worker: ", event.data);
}