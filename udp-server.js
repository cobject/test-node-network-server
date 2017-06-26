const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const fs = require('fs');

const PORT = 3101;
const IP = "127.0.0.1";

var i = 0;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  setInterval(sendImage, 20);
  console.log('listening');
});

server.bind(3001);

function sendImage() {
	var name = "./image_dump/" + i.toString() + ".jpg";

	var data = fs.readFileSync(name);

	server.send(data, 0, data.length, PORT, IP, function(err, bytes) {
			if (err) {
				console.log('err');
				throw err;
			}
	});
	i++;
	if(i == 343) i = 0;
}
