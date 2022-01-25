const fs = require('fs');
const execSync = require('child_process').execSync;

try {
    if (fs.existsSync('gulpfile.js')) {
        console.log('Run npm i');
        execSync('npm i');
        console.log('Run gulp');
        execSync('gulp');
    }
} catch(err) {
    console.error(err);
}
