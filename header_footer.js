const h_template = document.createElement('template');
const f_template = document.createElement('template');

h_template_innerHTML = `
<div id="nav-scroll" class='navbar-wrap'>
    <div class='navbar container'>
        <h3 onClick=""><a href="./index.html#about-scroll">ABOUT</a></h3>
        <h3 onClick=""><a href="#footer-section">CONTACT</a></h3>
        <h3><a href="./index.html#home-scroll">CHIBU</a></Link>
        </h3>
        <h3 onClick=""><a href="./index.html#proj-scroll">PROJECTS</a></h3>
        <h3><a href="https://drive.google.com/file/d/1qmAVEf_EP5jWGvwrgn3Sl64JmU-fyhq5/view?usp=share_link"
                target="blank">RESUME</a></h3>
    </div>
</div>
`

f_template.innerHTML = `
<div id="footer-section" class='footer-outer'>
    <div class='footer container'>
        <div class='contact-side'>
            <h2>Contact!</h2>
            <div class='icon-line'>
                <i class="fa fa-envelope"></i>
                <h2><a href="mailto:023813C@gmail.com" target="blank">023813C@gmail.com</a></h2>
            </div>
            <div class='icon-line'>
                <i class="fa fa-linkedin"></i>
                <h2><a href="http://linkedin.com/in/chibueze-i-o-2001" target="blank">LinkedIn</a></h2>
            </div>
        </div>
        <div class='name-side'>
            <h2>Chibueze Onyenemezu</h2>
            <div class='to-top-div' onclick="topFunction()">
                <i class="fa fa-chevron-up"></i>
                <h3>Back to Top</h3>
            </div>
        </div>
    </div>
    <div class='footer-bg'></div>
</div>
`

if(window.location.pathname.includes("index")) {
    document.getElementById('about-scroll').insertAdjacentHTML('beforebegin', h_template_innerHTML);
} else {
    document.body.insertAdjacentHTML('afterbegin', h_template_innerHTML);
}
document.body.appendChild(f_template.content);

//scroll to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}