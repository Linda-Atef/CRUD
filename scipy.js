let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("create");
let category = document.getElementById("category");
let count = document.getElementById("count");
let mood = "create"
let tmp;

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value
        total.innerHTML = result
        total.style.background="yellow"
    }else {
        total.style.background = "rgb(159, 205, 250)"
        total.innerHTML="total"
    }
}




let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.getItem("product"))  
} else {
     data = []
}
create.onclick = function () {
    let product = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
        
    }
    if (title.value != "" && price.value != "" && category.value != ""&&count.value<=100) {
        if (mood === "create") {
            if (product.count > 1) {
                for (let j = 0; j < product.count; j++){
                    data.push(product)
                }
            } else (
                data.push(product)
            )
        } else {
            data[tmp] = product;
            mood = "create"
            count.style.display = "block"
            create.innerHTML = "create"

        }
        clearData();
    }
   
   
   
    localStorage.setItem("product", JSON.stringify(data))
  
    showData()
    getTotal()
}

function clearData(){
    title.value=""
    price.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
    taxes.value=""
}
function showData() {
     getTotal()
    let table = "";
    for (let i = 0; i < data.length; i++){
        table += `
         <tr>
            <td>${i+1}</td>
            <td>${data[i].title}   </td>
            <td>${data[i].price}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].count}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})"  >delete</button></td>
        </tr>`
    }
    let tbody = document.getElementById("tbody")
    tbody.innerHTML = table
    let btnDelete = document.getElementById("btnDelete")
    if (data.length > 0) {
        btnDelete.innerHTML=`<button onclick="deleteAll()" >DELETE ALL(${data.length})</button>`
    } }

showData()


function deleteData(i) {
    data.splice(i, 1)
    localStorage.product = JSON.stringify(data)
    showData()
}


function deleteAll() {
    data.splice(0)
    localStorage.clear()
    showData()
    btnDelete.style.display="none"
}
function updateData(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    ads.value = data[i].ads;
    taxes.value = data[i].taxes;
    discount.value = data[i].discount;
    category.value = data[i].category;

    tmp = i;
    create.innerHTML = "update"
    count.style.display = "none";
    // getTotal()
    mood = "update"
    scroll({
        top: 0, 
        behavior:"smooth",
    })
    
}

let searchMood="title"
function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id === "title-searchy") {
        searchMood = "title"
    } else {
        searchMood = "category"
    }
search.placeholder = "search by" + searchMood
search.focus()
search.value = ""
showData()

}



function searchData(value) {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        if (searchMood === "title") {

            if (data[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})"  >delete</button></td>
                </tr>`
            }
        }else{

            if (data[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})"  >delete</button></td>
                </tr>`
            }
        }
        tbody.innerHTML = table
    }
}
