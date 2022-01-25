const fs = require('fs');
const execSync = require('child_process').execSync;

try {
    if (fs.existsSync('gulpfile.js')) {
        console.log('Run npm ci');
        execSync('npm ci');
        console.log('Run gulp');
        execSync('gulp');
    }
} catch(err) {
    console.error(err);
}
