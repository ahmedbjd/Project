let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
function fctTotal() {
   if (price.value.length > 0) {
    total.value = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = total.value;
    total.style.background="green";
   }else {
    total.innerText = '';
    total.style.background="red";
   }
}


let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createB = document.getElementById("create");
let search = document.getElementById("search");

let arrProduct;
if (localStorage.product != null){
    arrProduct = JSON.parse(localStorage.product);
}else{
  arrProduct = [];
}

var x = -1;
function create(){
  if ((title.value != '') & (price.value != '') & (taxes.value != '') & (ads.value != '') & (discount.value != '') & (category.value != '') & ((count.value > 0) & (count.value <= 100))){
   let newProduct = {
     title:title.value.toLowerCase(),
     price:price.value,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     total:total.value,
     count:count.value,
     category:category.value.toLowerCase(),
   };
  if(x<0){
   if(newProduct.count>1){
   for(let i = 0 ; i<count.value ; i++){
   arrProduct.push(newProduct);
   }}else{
    arrProduct.push(newProduct);
   }
  }else{
    arrProduct[x] = newProduct;
    createB.innerText = 'Create';
    count.style.display='block';
    x = -1;
  }
   localStorage.setItem('product',JSON.stringify(arrProduct));
   clearData();
   showData();
   buttonDeleteAll();
  }
}

function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerText = '';
  count.value = '';
  category.value = '';
  search.value = '';
  total.style.background="red";
}

//display
function showData(){  
   let tbody = '';
   for(let i=0 ; i<arrProduct.length ; i++){
    tbody += `<tr>
      <td>${i+1}</td>
      <td>${arrProduct[i].title}</td>
      <td>${arrProduct[i].price}</td>
      <td>${arrProduct[i].taxes}</td>
      <td>${arrProduct[i].ads}</td>
      <td>${arrProduct[i].discount}</td>
      <td>${arrProduct[i].total}</td>
      <td>${arrProduct[i].category}</td>
      <td><button onclick="updateProduct( ${i} )" id="update">update</button></td>
      <td><button onclick="clearProduct( ${i} )" id="delete">delete</button></td>
    </tr>`;
   }
   document.querySelector("tbody").innerHTML = tbody;
}
showData();

//clear
function clearProduct(i){    
  arrProduct.splice(i,1);
  localStorage.product = JSON.stringify(arrProduct);
  showData();
  buttonDeleteAll();
  search.value = '';
}

//clear all
let deleteAll = document.querySelector(".deleteAll");
function buttonDeleteAll(){
if(arrProduct.length > 0){
  deleteAll.innerHTML = `
  <button onclick="clearProductAll()" id="deleteAll">delete All (${arrProduct.length})</button>
  `;
}else{
  deleteAll.innerHTML = '';
}
}
buttonDeleteAll();

function clearProductAll(){
  localStorage.clear();
  arrProduct.splice(0,arrProduct.length);
  showData();
  deleteAll.innerHTML = '';
}

//update
function updateProduct(i){
  title.value = arrProduct[i].title;
  price.value = arrProduct[i].price;
  taxes.value = arrProduct[i].taxes;
  ads.value = arrProduct[i].ads;
  discount.value = arrProduct[i].discount;
  category.value = arrProduct[i].category;
  fctTotal();
  count.style.display='none';
  createB.innerText = 'Update';
  window.scroll({
    top:0,
    behavior:"smooth",
  });
  x = i;
}

//search
let searchName = 'title';
function searchFct(name){
  search.placeholder = 'Search By '+name;
  search.focus();
  searchName = name;
  search.value = '';
  showData();
}
function searchProduct(value){
  let tbody = '';
  for (let i=0 ; i<arrProduct.length ; i++){
    let prd = `<tr>
    <td>${i+1}</td>
    <td>${arrProduct[i].title}</td>
    <td>${arrProduct[i].price}</td>
    <td>${arrProduct[i].taxes}</td>
    <td>${arrProduct[i].ads}</td>
    <td>${arrProduct[i].discount}</td>
    <td>${arrProduct[i].total}</td>
    <td>${arrProduct[i].category}</td>
    <td><button onclick="updateProduct( ${i} )" id="update">update</button></td>
    <td><button onclick="clearProduct( ${i} )" id="delete">delete</button></td>
  </tr>`;
  if (searchName == 'title'){
    if (arrProduct[i].title.includes(value.toLowerCase())){
      tbody += prd;
   }
  }else{
      if (arrProduct[i].category.includes(value.toLowerCase())){
        tbody += prd;
      }
}
  }
  document.querySelector("tbody").innerHTML = tbody;
}



