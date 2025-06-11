const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`Serving index.html from: ${indexPath}`);
  
  if (!require('fs').existsSync(indexPath)) {
    console.error(`Error: index.html not found at ${indexPath}`);
    return res.status(500).send('Server configuration error - index.html not found');
  }
  
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Build directory: ${path.join(__dirname, 'build')}`);
}); 