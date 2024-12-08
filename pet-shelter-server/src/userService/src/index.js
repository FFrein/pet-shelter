const express = require("express")
const amqp = require('amqplib');

const server = express();

server.use((req,res,next)=>{
    
    next();
})

server.get("/",(req,res)=>{

    res.send("ok")
})

server.listen(3100);


async function sendMessage() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'rpc_queue'; // Очередь для RPC
    const replyQueue = await channel.assertQueue('', { exclusive: true }); // Обратная очередь

    const correlationId = generateUuid(); // Уникальный идентификатор запроса
    const message = 'Hello, RabbitMQ!';

    console.log(`Sending message: ${message}`);

    // Слушаем обратную очередь
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          console.log(`Response received: ${msg.content.toString()}`);
          connection.close();
        }
      },
      { noAck: true }
    );

    // Отправляем сообщение
    channel.sendToQueue(queue, Buffer.from(message), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function generateUuid() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

sendMessage();
