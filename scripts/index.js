//variables for menu items
const listDisplay = document.querySelector(".menu");
const menuDisplay = document.querySelector(".menu-items");
//variables for review slider
const slides = document.querySelectorAll(".slides p");
let slideIndex = 0;
//variables for FAQ accordion
let question = document.getElementsByClassName("faq-question");

//render menu and review slider on startup
document.addEventListener("DOMContentLoaded", menuJsonToVariable);
document.addEventListener("DOMContentLoaded", initializeSlider);

/*menu items*/
//fetch data from json file
async function getJsonData(){
    try{
        //fetch data from json file
        const response = await fetch('./json/limitedMenu.json');
        if(!response.ok){
            throw new Error(`Status: ${response.status}`);
        }
        //convert response into readable json
        const jsonData = await response.json();
        return jsonData;
    } catch(error) {
        console.error("Could not fetch the data:", error);
        return null;
    }
}
//render menu items to page
async function menuJsonToVariable(){
    const menuData = await getJsonData();
    if(menuData){
        console.log("Menu:", menuData);
        //iterate through menu by each section of json
        Object.keys(menuData).forEach(key => {
            menuDisplay.classList.add("menuDisplay");
            //create title element
            const sectionDisplay = document.createElement("h2");
            sectionDisplay.textContent = key;
            sectionDisplay.classList.add("sectionDisplay");
            menuDisplay.appendChild(sectionDisplay);
            //create item container element
            const listDisplay = document.createElement("div");
            listDisplay.classList.add("listDisplay");
            menuDisplay.appendChild(listDisplay);
            //iterate for loop for amount of items
            const sectionLength = Object.keys(menuData[key]).length;
            console.log(`sectionLength: ${sectionLength}`);
            for(let i = 0; i < sectionLength; i++){
                //make new menu item
                const itemDisplay = document.createElement("div");
                //make sections for name, image, price, calories, and description
                const nameDisplay = document.createElement("p");
                const imgDisplay = document.createElement("img");
                //test price and cal in one element
                const statDisplay = document.createElement("p");
                const descDisplay = document.createElement("p");
                //text content
                nameDisplay.textContent = menuData[key][i].name;
                imgDisplay.src = menuData[key][i].img;
                statDisplay.textContent = `$${menuData[key][i].price} | ${menuData[key][i].cal} cal`;
                descDisplay.textContent = menuData[key][i].desc;
                //add class for css
                itemDisplay.classList.add("itemDisplay");
                nameDisplay.classList.add("nameDisplay");
                imgDisplay.classList.add("imgDisplay");
                statDisplay.classList.add("statDisplay");
                descDisplay.classList.add("descDisplay");
                //append displays to item and menu displays
                itemDisplay.appendChild(nameDisplay);
                itemDisplay.appendChild(imgDisplay);
                itemDisplay.appendChild(statDisplay);
                itemDisplay.appendChild(descDisplay);
                
                listDisplay.appendChild(itemDisplay);
            }
        });        
    } else{
        console.log("Failed to load JSON file.");
    }
}

/* review slider */
//show first slide
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