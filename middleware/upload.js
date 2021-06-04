var multer  = require('multer')

var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "my-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports = multer({
  storage,
  fileFilter
});
