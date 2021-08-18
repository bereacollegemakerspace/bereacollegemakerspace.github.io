let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";

    // Get the modal
    let modal = document.getElementById("newsModal");

    let btn = document.getElementById("newsBtn" + slideIndex);

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        function renderNews() {
                fetch("./db/events.json")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        let news = data.news;
                        let newsModal = document.getElementById("newsModal");
                        for(let i = 0; i < news.length; i++) {
                            newsModal.innerHTML += `<div class="news-modal-content">
                        <h4 class="event-title">` + news[i].title + `</h4>
    
                        <span class="event-time">`+ news[i].date_created + `</span>
                        <p class="event-desc">` + news[i].description + `<a href="#">Read more</a></p>
    
                         <form action="https://forms.gle/MGCJ1UCzmtWxWUpy8">
                               <button class="event-register-btn">Register now</button>
                         </form>
                      </div>`
                        }
                    });
            }
        /*
            1. Fetch json with corresponding id
            2. Populate content with news data
        */
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}