//limited menu variables; array of objects
const listDisplay = document.querySelector(".menu");
const menuDisplay = document.querySelector(".menu-items");
const mealTypeTitle = document.querySelector(".meal-type-title");
//nav buttons
const breakfastBtn = document.getElementById("breakfastBtn");
const allDayBtn = document.getElementById("allDayBtn");
const kidsBtn = document.getElementById("kidsBtn");
const dessertBtn = document.getElementById("dessertBtn");
const limitedBtn = document.getElementById("limitedBtn");
const drinksBtn = document.getElementById("drinksBtn");
//default menu type
let menuType = "breakfast";

//render menu on startup
document.addEventListener("DOMContentLoaded", menuJsonToVariable);
//initialize breakfast menu
let mealTitleDisplay = document.createElement("h1");
mealTitleDisplay.textContent = "Breakfast Menu";
mealTitleDisplay.classList.add("mealTitleDisplay");
mealTypeTitle.appendChild(mealTitleDisplay);
//event listeners for buttons
breakfastBtn.addEventListener("click", event => {
    if(menuType !== "breakfast"){
        menuType = "breakfast";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
allDayBtn.addEventListener("click", event => {
    if(menuType !== "allDay"){
        menuType = "allDay";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
kidsBtn.addEventListener("click", event => {
    if(menuType !== "kids"){
        menuType = "kids";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
dessertBtn.addEventListener("click", event => {
    if(menuType !== "dessert"){
        menuType = "dessert";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
limitedBtn.addEventListener("click", event => {
    if(menuType !== "limited"){
        menuType = "limited";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
drinksBtn.addEventListener("click", event => {
    if(menuType !== "drinks"){
        menuType = "drinks";
        renderNewMenu();
    }else{
        console.log("Already looking at breakfast menu.");
    }
});
//dynamically generate menu title
function renderNewMenu(){
    let title = "";
    //clear previous title
    mealTypeTitle.textContent = "";
    switch(menuType){
        case "breakfast":
            title = "Breakfast Menu";
            break;
        case "allDay":
            title = "All Day Menu";
            break;
        case "kids":
            title = "Kids Menu";
            break;
        case "dessert":
            title = "Dessert Menu";
            break;
        case "limited":
            title = "Limited Items Menu";
            break;
        case "drinks":
            title = "Drinks Menu";
            break;
        default:
            console.log("Something went wrong");
    }
    //create new title
    mealTitleDisplay = document.createElement("h1");
    mealTitleDisplay.textContent = title;
    mealTitleDisplay.classList.add("mealTitleDisplay");
    mealTypeTitle.appendChild(mealTitleDisplay);
    //clear previous menu
    menuDisplay.textContent = "";
    //generate new menu
    menuJsonToVariable();
    window.scrollTo(0, 0);
}
//fetch data from json file
async function getJsonData(){
    try{
        //fetch data from json file
        const response = await fetch(`./json/${menuType}Menu.json`);
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