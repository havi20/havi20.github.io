$(function() {
    $('.color').colorpicker();
});
$('#button_modal').click();

$('#apply').change(function() {

    if ($('#select_bg').val() == 'image') {
        $('#background').show();
        $('#color_bg').hide();
    } else {
        $('#background').hide();
        $('#color_bg').show();
    }

    $('#myCanvas').remove();
    $('#myCanvashigh').remove();
    $('#canvasGroup').prepend('<canvas id="myCanvas" width="620px" height="877px" style="border: 1px solid #000;"></canvas>');
    $('#canvasGroup').prepend('<canvas id="myCanvashigh" width="2480px" height="3508px" style="border: 1px solid #000; display:none;"></canvas>');

    var canvas = $('#myCanvas');
    var context = canvas.get(0).getContext("2d");

    var canvas2 = $('#myCanvashigh');
    var context2 = canvas2.get(0).getContext("2d");

    var sticker = new Image();
    sticker.crossOrigin = "anonymous";
    sticker.src = $('#sticker').val();

    var sources = {
        img: 'assets/paper/' + $('#paper_color').val() + '.jpg',
        img_bg: $('#background').val()
    };

    loadImages(sources, function(images) {
        /* Image download */
        context2.drawImage(images.img_bg, 0, 0, 2480, 3508);
        if ($('#select_bg').val() == 'color') {
            context2.fillStyle = $('#color_bg').val();
            context2.fillRect(0, 0, 2480, 3508);
        }
        context2.drawImage(images.img, 120, 200, 2240, 3200);
        context2.strokeStyle = $('#color_border').val();
        context2.lineWidth = 8;
        context2.strokeRect(120, 200, 2240, 3200);
        context2.drawImage(sticker, $('#sticker_w').val() * 4, $('#sticker_h').val() * 4, (sticker.width / $('#size_sticker').val()) * 4, (sticker.height / $('#size_sticker').val()) * 4);
        context2.font = $('#size_title').val() * 4 + "px Pacifico";
        context2.fillStyle = $('#color_title').val();
        context2.fillText($('#title').val(), $('#title_w').val() * 4, $('#title_h').val() * 4);
        context2.font = $('#size_ig').val() * 4 + "px Pacifico";
        context2.fillStyle = $('#color_ig').val();
        context2.fillText($('#ig').val(), $('#ig_w').val() * 4, $('#ig_h').val() * 4);


        /* Image preview */
        context.drawImage(images.img_bg, 0, 0, 620, 877);
        if ($('#select_bg').val() == 'color') {
            context.fillStyle = $('#color_bg').val();
            context.fillRect(0, 0, 620, 877);
        }
        context.drawImage(images.img, 30, 50, 560, 800);
        context.strokeStyle = $('#color_border').val();
        context.lineWidth = 2;
        context.strokeRect(30, 50, 560, 800);
        context.drawImage(sticker, $('#sticker_w').val(), $('#sticker_h').val(), sticker.width / $('#size_sticker').val(), sticker.height / $('#size_sticker').val());
        context.font = $('#size_title').val() + "px Pacifico";
        context.fillStyle = $('#color_title').val();
        context.fillText($('#title').val(), $('#title_w').val(), $('#title_h').val());

        context.font = $('#size_ig').val() + "px Pacifico";
        context.fillStyle = $('#color_ig').val();
        context.fillText($('#ig').val(), $('#ig_w').val(), $('#ig_h').val());
    });
});

function download_image() {
    var canvas = document.getElementById('myCanvashigh');
    image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "image-notes-paper.jpg";
    link.href = image;
    link.click();
}

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        if (sources[src] == "") {
            numImages++;
            console.log(sources[src]);
        }
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].crossOrigin = "anonymous";
        images[src].src = sources[src];
    }
}