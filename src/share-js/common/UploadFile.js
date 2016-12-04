var UploadFile = {}

UploadFile.uploadBase64Image = function(func) {
    var img_file = "";
    var maxsize = 200 * 1024;

    $(".js-file").on('change', function() {
        img_file = this.files[0];
        var image = new Image(),
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d');
        var reader = new FileReader();

        reader.onload = function() {
            var imageurl = this.result;
            //对图片进行压缩处理
            if (imageurl.length > maxsize) {
                image.src = imageurl;
                image.onload = function() {
                    var w = image.naturalWidth,
                        h = image.naturalHeight,
                        ViewWidth, ViewHeight,
                        scale = Math.max(w / $(window).width(), h / $(window).height());
                    if (scale > 1) {
                        ViewWidth = w / 4;
                        ViewHeight = h / 4;
                    } else {
                        ViewWidth = w;
                        ViewHeight = h;
                    }
                    canvas.width = ViewWidth;
                    canvas.height = ViewHeight;
                    ctx.drawImage(image, 0, 0, ViewWidth, ViewHeight);
                    var data = canvas.toDataURL("image/jpeg");
                    data = data.split(',')[1];
                    func(data);
                };
            } else {
                func(imageurl.split("base64,")[1]);
            }
        }
        reader.readAsDataURL(this.files[0]);
    });
}
UploadFile.initBase64QiniuToken = function(upImage, func) {
    $.getJSON(GlobalModel.SERVER_URL, {
        m: 'Media',
        a: 'refreshQiniuToken',
        c: 'publicApi',
    }, function(data) {
        UploadFile.putb64(data.data, upImage, func);
    });
}

UploadFile.putb64 = function(p_qiniuToken, upImage, func) {
    var url = "http://up.qiniu.com/putb64/" + "-1";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = func;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + p_qiniuToken);
    xhr.send(upImage);
}
module.exports = UploadFile;
