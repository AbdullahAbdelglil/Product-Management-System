let title = document.getElementById("title"); 
let price = document.getElementById("price"); 
let taxes = document.getElementById("taxes"); 
let ads = document.getElementById("ads"); 
let discount = document.getElementById("discount"); 
let total = document.getElementById("total"); 
let count = document.getElementById("count"); 
let category = document.getElementById("category"); 
let creat = document.getElementById("submit");
let search = document.getElementById("search");
let mood ="Create";
let tmp;

//get total()

function getTotal(){
    if(price.value!=''){
        let Total = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=(Total);
        total.style.backgroundColor="#060";
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor="#a00d02";
    }
}

//creat product()

// check if local Storage Empty Or no ?
let dataArr;
if(localStorage.product!=null){ 
    dataArr = JSON.parse((localStorage.product));
}
else{
    dataArr=[];
}

//check data is clean or no 

function isCleanData(){
    return title.value!=''&&price.value!=''&&category.value!='';
}

// creat object onClick

creat.onclick = 
function(){
    // Creat Object
    let newProd={ 
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(isCleanData()){
        if(mood==="Create")
        {
            dataArr.push(newProd); // Add this object to array of products
            localStorage.setItem('product',   JSON.stringify(dataArr)); // save data of array of products in local storage
        }
        else if(mood==="Update"){
            dataArr[tmp]=newProd;
            localStorage.product=JSON.stringify(dataArr);
            mood="Create";
            creat.innerHTML=mood;
        } 
        clearData();
        showData();
        getTotal();
    }
}

//clear inputs after creat object

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    search.value='';
}

// Show Data

function showData(){
    let table='';
    for(let i=0;i<dataArr.length;i++){
        table+=buildTable(table,i);
            }
            document.getElementById("tboby").innerHTML=table;
            let deleteall=document.getElementById("deleteall");
            if(dataArr.length>0){
            deleteall.innerHTML=`
            <button id="deleteAll" onclick="deleteAll()">Delete All Products ( ${dataArr.length} ) </button>`
        }
            else{
                deleteall.innerHTML='';
            }
    }
showData();

//Delete Product

function deleteProduct(i)
{
    if(confirm("Are You Sure ? \nWarning : All Products of this type will be deleted"))
    {
    dataArr.splice(i,1);
    localStorage.product=JSON.stringify(dataArr);
        showData();
    }
}
function decrease(i){
    if(dataArr[i].count != 0){
        dataArr[i].count -= 1;
        localStorage.product=JSON.stringify(dataArr);
        showData();
    }
}

//delete all

function deleteAll(){
    if(confirm("Are You Sure ? \nWarning : All Products will be deleted")){
        dataArr.splice(0);
        localStorage.clear();
        showData();
    }
}

// update

function updateProduct(i){
    tmp=i;
    title.value = dataArr[i].title;
    price.value = dataArr[i].price;
    taxes.value = dataArr[i].taxes;
    ads.value = dataArr[i].ads;
    discount.value = dataArr[i].discount;
    getTotal();
    count.value = dataArr[i].count;
    category.value = dataArr[i].category;
    mood="Update";
    creat.innerHTML=mood;
    scroll({
        top:0,
        behavior:"smooth"
    })
    title.focus();
}

//search

let searchMood = 'title';
function getSerchMood(id){
    if(dataArr.length>0)search.focus();
    if(id==="ttl"){
        searchMood = 'title'
    }
    else{
        searchMood = 'category';
    }
    search.placeholder=`Search By ${searchMood} : `
    search.value='';
    showData();
}

function searchData(value){
    let table='';
    for(let i=0;i<dataArr.length;i++){
    if(searchMood==='title')
    {
        if(dataArr[i].title.includes(value)){
            table+=buildTable(table,i);
        }
    }
    else
    {
        if(dataArr[i].category.includes(value)){
            table+=buildTable(table,i);
        }
    }
}
    document.getElementById("tboby").innerHTML=table;
}

// build table for Show Data and Search 

function buildTable(tbl,i){
    let tmp=i+1;
    tbl=
        `<tr>
            <td>${tmp}</td>
            <td>${dataArr[i].title}</td>
            <td>${dataArr[i].price} $</td>
            <td>${dataArr[i].taxes} $</td>
            <td>${dataArr[i].ads} $</td>
            <td>${dataArr[i].discount} $</td>
            <td>${dataArr[i].total} $</td>
            <td>${dataArr[i].count}</td>
            <td>${dataArr[i].category}</td>
            <td><button onclick="updateProduct(${i})"id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            <td><button onclick="decrease(${i})" id="decrease"> -1 </button></td>
        </tr>`;
        return tbl;
}