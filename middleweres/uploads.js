const multer = require('multer');
 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' + file.originalname)
    }
})
const fileUpload = multer({storage});

module.exports = fileUpload;