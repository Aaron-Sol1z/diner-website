//variables for review slider
const slides = document.querySelectorAll(".slides p");
let slideIndex = 0;
//variables for FAQ accordion
let question = document.getElementsByClassName("faq-question");

/* review slider */
//show first slide on startup
document.addEventListener("DOMContentLoaded", initializeSlider);
function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
    }
}
//show respective slide by index
function showSlide(index, dir){
    if(index >= slides.length){ //reset to first slide
        slideIndex = 0;
    }
    else if(index < 0){ //go to last slide
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        //determine slide animation
        if(dir === 'prev'){
            slide.setAttribute("style", "animation-name: swipeRight; animation-duration: 1s;");
        } else if(dir === 'next'){
            slide.setAttribute("style", "animation-name: swipeLeft; animation-duration: 1s;");
        }
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}
//show last slide
function prevSlide(){
    slideIndex--;
    showSlide(slideIndex, 'prev');
}
//show next slide
function nextSlide(){
    slideIndex++;
    showSlide(slideIndex, 'next');
}

/*Frequently Asked Questions*/
for(let i = 0; i < question.length; i++){
    question[i].addEventListener("click", event => {
        //pick corresponding answer to question
        let answer = question[i].nextElementSibling;
        //toggle display style for answer
        if(answer.style.display === "block"){
            answer.style.display = "none";
        } else{
            answer.style.display = "block";
        }
    });
}