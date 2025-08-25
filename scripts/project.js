const pages = ["elf-bot", "money_tracker", "tv_tracker", "crisis"];

var projectMedia, projectData, allMedia;

var selected_img_num = 0;

function updateSelectedImg() {
    let selected_img = document.getElementById('selected-img-insert');
    selected_img.src = projectMedia[selected_img_num]['path'];
    selected_img.alt= projectMedia[selected_img_num]['tag'];

    //set highlight
    var other_imgs = Array.from(document.getElementsByClassName('other-img-wrap'));
    other_imgs.forEach((other, index) => {
        other.className = "other-img-wrap";
        if (index === selected_img_num) {
            other.className = "other-img-wrap other-img-wrap-selected";
        }
    })
}

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

function addDataIn(name) {
    // Set the page title based on the project name
    document.title = `${projectData['name']} | Chibu Portfolio`;

    // path link
    document.getElementById('link-name').innerHTML = projectData['name'];
    
    // main image
    let selected_img = document.getElementById('selected-img-insert');
    selected_img.src = projectMedia[selected_img_num]['path'];
    selected_img.alt= projectMedia[selected_img_num]['tag'];

    // main text
    document.getElementById('project-title-insert').innerHTML = `${projectData['name']} (${projectData['subtitle']})`;
    document.getElementById('repo-btn-insert').href = projectData['repo'];
    document.getElementById('tagline-p-insert').innerHTML = projectData['tagline'];

    projectData['details'].forEach((detail) => {
        let detail_list_item = document.createElement('li');
        detail_list_item.innerHTML = detail;
        document.getElementById('detail-ul-insert').appendChild(detail_list_item);
    });

    // create thumbnails
    projectMedia.forEach((other, index) => {
        let img_thumbnail = document.createElement('figure');
        img_thumbnail.className = "other-img-wrap";
        if (index === selected_img_num) {
            img_thumbnail.className = "other-img-wrap other-img-wrap-selected";
        }
        img_thumbnail.onclick = () => {
            selected_img_num = index;
            updateSelectedImg();
        };
        let thumb_img = document.createElement('img');
        thumb_img.src = other['path'];
        thumb_img.alt= other['tag'];
        thumb_img.className = "other-img";
        img_thumbnail.appendChild(thumb_img);

        document.getElementById('thumbnails-list').appendChild(img_thumbnail);
    });

    // description paragraphs
    projectData['description'].forEach((paragraph) => {
        let descrip_p = document.createElement('p');
        descrip_p.innerHTML = paragraph;

        document.getElementById('project-description').appendChild(descrip_p);
    });

    // suggestion images
    var suggestions_squares_wrap = Array.from(document.getElementsByClassName('suggestions-squares-wrap'))[0];
    pages.filter(p => p !== name).forEach((page) => {
        suggestions_squares_wrap.appendChild(createProjectSquare(page, allMedia[page][0]));
    });
}

window.onload = function () {
    var params = new URLSearchParams(window.location.search);
    let name = params.get("name");
    // console.log(name);

    fetch("resources/project_data.json").then(response => {
        return response.json();
    }).then(data => {
        projectData = data[name];
        // console.log(projectData);

        fetch("resources/project_images.json").then(response => {
            return response.json();
        }).then(data => {
            projectMedia = data[name];
            allMedia = data;
            // console.log(projectMedia);

            addDataIn(name);
        });
    });
};