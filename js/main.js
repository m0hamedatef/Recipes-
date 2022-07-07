'use strict'
let recipeList =[];
let recipesDetails =[];
let closeSlide = document.getElementById('close');
let links = Array.from(document.querySelectorAll('.nav-link'));
let data = document.getElementById('data');
let innerDetails = document.getElementById('innerDetails');
let rowData =document.getElementById('rowData');
let searchValue = document.getElementById('searchInput');
let buttonSearch = document.getElementById('searchBtn');
// add event for every link in the navbar
links.forEach(element => {
  element.addEventListener('click',function(e){
   let recipe = e.target.innerHTML;
   getRecipes(recipe);
   })
});
async function getRecipes(nameRecipe ='pizza') {
  let responce = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${nameRecipe}`);
  let data = await responce.json();
  recipeList = data.recipes;
  display();
}
getRecipes();
// display recipes
function display(){
  let term ='';
  recipeList.forEach(element=>{
    term +=`
    <div class="col-md-3">
      <div class="item">
        <img src="${element.image_url}" recipe_id=${element.recipe_id} class="w-100 details" alt="" srcset="">
        <h2>${element.title}</h2>
      </div>
    </div>
    `
  })
  rowData.innerHTML=term;
}
// add event to each meal to show its deatils
// using js delegation because the recipes was dynamically added
document.addEventListener('click',function(e){
if(e.target.classList.contains('details')){
  let id = e.target.getAttribute("recipe_id");
  getDetails(id);
}})
async function getDetails(id) {
  let responce = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  let data = await responce.json();
  recipesDetails = data.recipe;
  dipslaySlide();
}
function  dipslaySlide() {
  // loop to get ingrdients
  let ingredients = recipesDetails.ingredients;
  let everyIngredients='';
  ingredients.forEach(element=>{
    everyIngredients += element;
  })
  document.querySelector('.navbar').style.cssText=`display : none`;
  data.classList.replace('d-none','d-flex');
  let term =`
 <div class="d-flex flex-column text-mine col-md-6 col-sm-12 overflow-auto" id="innerDetails">
      <i class="far fa-times-circle m-2 position-absolute top-0 end-0 closeButton text-black-50"></i>
      <img src="${recipesDetails.image_url}" height="200px" alt="" class="w-50">
      <h5 class="py-2 fw-bolder text-capitalize">Publisher: ${recipesDetails.publisher}</h5>
      <p class="p-3 lead"><span>Ingredients:</span> ${everyIngredients}</p>
    </div> 
  `;
  data.innerHTML = term;
}
// close slide also(js delegation)
function closeSlider(){
  data.classList.replace("d-flex","d-none");
  document.querySelector('.navbar').style.cssText=`display : flex`;
}
document.addEventListener('click',function(e) {
  if(e.target.classList.contains('closeButton')){
    closeSlider();
  }
});
document.addEventListener("keyup",function(e){
   if (e.code =="Escape"){
    closeSlider();
}})
// search key

searchValue.addEventListener('keyup',search)
buttonSearch.addEventListener('click',search)
function search() {
  let term ='';
  recipeList.forEach(element=>{
    let title = element.title;
   if(title.toLowerCase().includes(searchValue.value.toLowerCase())){
   console.log('exist');
  
     term +=`
     <div class="col-md-3">
       <div class="item">
         <img src="${element.image_url}" recipe_id=${element.recipe_id} class="w-100 details" alt="" srcset="">
         <h2>${element.title}</h2>
       </div>
     </div>
     `;
   }else{
     console.log('not');
   }
   rowData.innerHTML= term;
  })} 
