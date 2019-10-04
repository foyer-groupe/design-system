const fs = require('fs');
const execSync = require('child_process').execSync;

try {
    if (fs.existsSync('gulpfile.js')) {
        execSync('npm i');
        execSync('gulp publish-documentation');
    }
} catch(err) {
    console.error(err);
}