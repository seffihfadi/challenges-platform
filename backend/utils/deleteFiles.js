import fs from 'fs'
import path from 'path'

const deleteFiles = (folder, startsWith) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    const filesToDelete = files.filter(file => file.startsWith(startsWith));
    filesToDelete.forEach(file => {
      const filePath = path.join(folder, file);
      fs.unlink(filePath);
    });
  });
}

export default deleteFiles