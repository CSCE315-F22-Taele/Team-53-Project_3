# Pom & Honey Ordering Site

## To run full application:

1. Run command `npm run dev`
2. Go to http://localhost:3000 or given port.

### To run only backend:
1. Run command `npm run server`
2. Go to http://localhost:3500 or given port.
3. To test if properly ran: http://localhost:3500/api/test

To change port:
1. package.json change  ` "proxy": "http://localhost:XX00" `
2. inputTodo.js change `const response = await fetch("http://localhost:XX00/todos", { `
3. Change server/index.js `const PORT = process.env.SERVER_PORT || XX00;`
 
### To run only frontend:
1. Run command `npm run client`
2. Go to http://localhost:3000 or given port.

### If you run into errors:
1. Download all packages.
2. Reinstall npm (`npm install`)
3. `npm -i` 
