const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Log the current directory and list files in build directory
console.log('Current directory:', __dirname);
try {
  console.log('Files in build directory:', fs.readdirSync(path.join(__dirname, 'build')));
} catch (e) {
  console.error('Error reading build directory:', e);
}

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`Serving index.html from root route: ${indexPath}`);
  res.sendFile(indexPath);
});

// Handle all other routes
app.use((req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`Serving index.html from catch-all route: ${indexPath}`);
  res.sendFile(indexPath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Build directory: ${path.join(__dirname, 'build')}`);
  
  // Log the contents of the current and build directories
  try {
    console.log('Current directory contents:', fs.readdirSync(__dirname));
    console.log('Build directory contents:', fs.readdirSync(path.join(__dirname, 'build')));
  } catch (e) {
    console.error('Could not read directories:', e.message);
  }
}); 