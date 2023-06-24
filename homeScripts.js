const pages = ["elf-bot", "money_tracker", "tv_tracker", "crisis"];

var projectMedia;

var squares_wrap = Array.from(document.getElementsByClassName('squares-wrap'))[0];

function createProjectSquare(page, image) {
    var para = new URLSearchParams();
    para.append("name", page);
    url = "./project.html?" + para.toString();

    let square_link = document.createElement('a');
    square_link.href = url;
    let square_wrap = document.createElement('div');
    square_wrap.className = 'square-wrap';
    let square = document.createElement('div');
    square.className = 'square';
    let square_img_wrap = document.createElement('div');
    square_img_wrap.className = 'square-img-wrap';
    let square_img = document.createElement('img');
    square_img.src = image['path'];
    square_img.className = 'square-img';
    square_img.alt = image['tag'];
    let image_name = document.createElement('h2');
    image_name.className = 'image-name';
    image_name.innerHTML = image['ptitle'];

    square_img_wrap.appendChild(square_img);
    square.appendChild(square_img_wrap);
    square.appendChild(image_name);
    square_wrap.appendChild(square);
    square_link.appendChild(square_wrap);

    return square_link;
}

window.onload = function () {
    fetch("resources/project_images.json").then(response => {
        return response.json();
    }).then(projectMedia => {
        pages.forEach((page) => {
            console.log(projectMedia[page][0]);
            squares_wrap.appendChild(createProjectSquare(page, projectMedia[page][0]));
        })
    });
};