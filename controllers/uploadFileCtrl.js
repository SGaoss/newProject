const formidable = require('formidable')

module.exports = {
  uploadFile(req,res){
    var form = new formidable.IncomingForm()

    form.encoding = 'utf-8';

    form.uploadDir = "./static/uploads";

    form.keepExtensions = true;

    form.maxFieldsSize = 20* 1024 * 1024;

    form.maxFileSize = 200* 1024 * 1024;

    form.maxFields = 1000;

    form.parse(req,function(err,fields,files){
       if (err) return res.json({
         "code": 1,
         "msg": "上传失败"
       })

       res.json({
         "code": 0,
         "msg": "上传成功",
         "src": files.avatar.path
       })
      
    })
  }
}