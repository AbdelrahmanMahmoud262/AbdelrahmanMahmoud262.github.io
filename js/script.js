// typing animation
var typed = new Typed(".typing",{
    strings:["Android Developer","Kotlin Developer",
"Java Developer"], typeSpeed:100,
BackSpeed:60,
loop:true
})

const portfolioItems = [];

function addItem(title, description, technologies, githubLink,playStoreLink,googleDriveLink, imagePath) {
    portfolioItems.push({
        title,
        description,
        technologies,
        githubLink,
        playStoreLink,
        googleDriveLink,
        imagePath,
    });

    const itemElement = document.createElement('div');
    itemElement.classList.add('portfolio-item');
    itemElement.classList.add('padd-15');

    const github = githubLink ? githubLink : "#portfolio";
    const store = playStoreLink ? playStoreLink : "#portfolio";
    const drive = googleDriveLink ? googleDriveLink : "#portfolio";


    const itemContent = `
                        <div class="portfolio-item-inner shadow-dark">

                            <div class="portfolio-img">
                                <a href="${drive}">
                                    <img src="${imagePath}" alt="Project Image" />
                                </a>
                            </div>
                            <div class="portfolio-info padd-15">
                                <h3 class="portfolio-title">${title}</h3>
                                <p class="portfolio-description">
                                    ${description}
                                </p>
                                <ul class="portfolio-technologies">
                                    ${technologies.map(technology => `<li><i class="devicon-${technology.toLowerCase().replace(/\s/g, "") }-plain"></i> ${technology}</li>`).join('')}
                                </ul>
                                <div class="portfolio-links">
                                    <a href="${github}" target="_blank">
                                        <i class="fab fa-github"></i>
                                    </a>
                                    <a href="${drive}
                                        target="_blank">
                                        <i class="fab fa-google-drive"></i>
                                    </a>
                                    <a href="${store}" target="_blank">
                                        <i class="fab fa-google-play"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

  `;

    itemElement.innerHTML = itemContent;
    document.getElementById('portfolio-items').appendChild(itemElement);
}

addItem("Task Manager", "This is a Task Manager Application", ["Java", "Android Studio", "SQLite"], "https://github.com/AbdelrahmanMahmoud262/Task-Manger-", "", "https://drive.google.com/drive/folders/1SZPmLqTIloz6v0cgLj7rstiCo4O-WbDa?usp=sharing", "images/portfolio/taskmanager.png");
addItem("Patient", "This is a patient organiser Application", ["Kotlin", "Room Database", "MVVM"], "https://github.com/AbdelrahmanMahmoud262/Patient", "", "https://drive.google.com/drive/folders/18YBLcl1gD_QuaXWpqHWZS0Bsqxg7cSxP?usp=sharing", "images/portfolio/patient.png");
addItem("Battle Royale 4k Wallpaper", "Wallpaper Application with admin panel", ["Kotlin", "Firebase", "Room Database", "MVVM", "Clean Architecture"], "", "https://play.google.com/store/apps/details?id=com.androdevelopment.wallpaper", "https://drive.google.com/drive/folders/1UTE37QxzmP_AA11JQTFelAegCUnN6T9R?usp=sharing", "images/portfolio/wallpaper.png");
// addItem("title", "description", ["Kotlin","Java","Firebase"], "githubLInk", "playstorelink", "drive link", "images/portfolio/taskmanager.png");


// send email functions




const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const subject = form.elements.subject.value;
    const message = form.elements.message.value;

    // Build the deep link
    let deepLink = `mailto:abdelrahmanmahmoudnasr@gmail.com&subject=${subject}&body=${message}`;

    // Check if the device is Android or iOS
    const platform = navigator.userAgent.toLowerCase();
    if (/android/.test(platform)) {
        deepLink = `intent://${deepLink}#Intent;scheme=mailto;package=com.google.android.gm;end`;
    } else if (/iphone|ipad|ipod/.test(platform)) {
        deepLink = `gmail://compose?subject=${subject}&body=${message}`;
    }

    // Open the deep link in a new window
    window.open(deepLink, '_blank');
});


