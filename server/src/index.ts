import server from './api/server';

const port = 5000;

server.listen(port, () => {
  console.log('\n=== SERVER LISTENING ON 5000 ===\n');
});
