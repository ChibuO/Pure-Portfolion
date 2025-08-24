var teamMedia, teamData;

const addDataIn = () => {
    // table of contents
    let toc = document.getElementById('toc-list-insert');
    let toc_final_item = document.getElementById('toc-final-item');
    teamData.forEach((team, i) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = `#${team.id}`;
        a.innerHTML = team.name;
        li.appendChild(a);
        toc.insertBefore(li, toc_final_item);
    });


    // sections
    let sections_body = document.getElementById('wiki-page-body');
    let other_clubs_section = document.getElementById('other-clubs');
    teamData.forEach((team, i) => {
        let section = document.createElement('section');
        section.id = team.id;

        let h2 = document.createElement('h2');
        h2.innerHTML = `${team.name} (${team.duration})`;
        section.appendChild(h2);

        let hr = document.createElement('hr');
        section.appendChild(hr);

        team.description.forEach((desc) => {
            let p = document.createElement('p');
            p.innerHTML = desc;
            section.appendChild(p);
        });

        let image_box_container = document.createElement('div');
        image_box_container.id = "wiki-image-box-container";

        teamMedia[team.id].forEach((image, index) => {
            // wiki image box
            let wiki_image_box = document.createElement('aside');
            wiki_image_box.className = 'wiki-image-box';

            let img = document.createElement('img');
            img.src = image.path;
            img.alt = image.tag;
            img.className = 'wiki-image-box-image';
            wiki_image_box.appendChild(img);

            let caption = document.createElement('p');
            caption.className = 'wiki-image-box-caption';
            caption.innerHTML = image.tag;
            wiki_image_box.appendChild(caption);

            image_box_container.appendChild(wiki_image_box);
        });

        section.appendChild(image_box_container);
        sections_body.insertBefore(section, other_clubs_section);
    });
};

window.onload = function () {
    Promise.all([
        fetch("resources/team_data.json").then(response => response.json()),
        fetch("resources/team_images.json").then(response => response.json())
    ]).then(([data, media]) => {
        teamData = data;
        teamMedia = media;
        console.log(teamData, teamMedia);

        // Call addDataIn only after both are fetched
        addDataIn();
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
};