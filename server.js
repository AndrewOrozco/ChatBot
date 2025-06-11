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
console.log('Files in build directory:', fs.readdirSync(path.join(__dirname, 'build')));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`Attempting to serve index.html from: ${indexPath}`);
  
  try {
    if (fs.existsSync(indexPath)) {
      console.log('index.html found, serving file');
      res.sendFile(indexPath);
    } else {
      console.error(`Error: index.html not found at ${indexPath}`);
      res.status(500).send(`Server configuration error - index.html not found. 
        Current directory: ${__dirname}
        Looking for file at: ${indexPath}
        Directory contents: ${fs.readdirSync(__dirname).join(', ')}
        Build directory contents: ${fs.existsSync(path.join(__dirname, 'build')) ? fs.readdirSync(path.join(__dirname, 'build')).join(', ') : 'build directory not found'}`);
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
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
  
  // Log the contents of the current and build directories
  console.log('Current directory contents:', fs.readdirSync(__dirname));
  try {
    console.log('Build directory contents:', fs.readdirSync(path.join(__dirname, 'build')));
  } catch (e) {
    console.log('Could not read build directory:', e.message);
  }
}); 