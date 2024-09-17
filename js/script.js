function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    const canvas = document.getElementById('qrcodeCanvas');

    if (url.trim() === "") {
        alert("请输入有效的URL。");
        return;
    }

    QRCode.toCanvas(canvas, url, {
        width: 200,
        color: {
            dark: '#000000',  // 二维码颜色
            light: '#FFFFFF'  // 背景颜色
        }
    }, function (error) {
        if (error) console.error(error);
        console.log('二维码已生成！');
    });
}

function decodeQRCode(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                document.getElementById('decodedUrl').innerHTML = `解码后的URL: <a href="${code.data}" target="_blank">${code.data}</a>`;
            } else {
                document.getElementById('decodedUrl').innerText = "未找到二维码。";
            }
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
}