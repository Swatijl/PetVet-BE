const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const middleware = require('./src/middleware/index');
app.use(middleware.decodeToken);

app.use(cors());

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/',(req,res) => {
    res.send('Hello World');
})

app.get('/api/tasks', (req, res) => {
	return res.json({
		tasks: [
			{title: 'Task1',},
			{title: 'Task2',},
		],
	});
});