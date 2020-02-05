//---- File Upload Code start
const multer  =   require('multer');
const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './views/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage : storage}).single('myfile');
//---- File Upload Code end

module.exports = upload;