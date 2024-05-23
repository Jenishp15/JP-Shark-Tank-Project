
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let productdata =[]

function fetchdata(){
    fetch("https://jp-project-json-server.onrender.com/pitches")
    .then((res)=>res.json())
    .then((data)=>{
        cardList(data)
        productdata=data
    })
    .catch((err)=>console.log(err))
}
fetchdata()

function cardList(data){
    let store = data.map((el)=>card(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))

    mainSection.innerHTML=store.join("")
}

function card(id,image,title,price,founder,category,description){
    return `
    <a href="description.html?title=${encodeURIComponent(title)}&img=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}&description=${encodeURIComponent(description)}">
    <div class="card" data-id="${id}">
        <div class="card-img">
        <img src="${image}" alt="pitch">
        </div>
        <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">Founder = ${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">${price}</p>
        <a href="#" class="card-link" data-id="${id}">Edit</a>
        <button class="card-button" data-id="${id}">Delete</button>
        <button data-id="${id}" class="AddToCart"
                style="border: 1px solid white;background-color: #29717d; color: white; cursor: pointer;">ADD TO
                Cart</button>
        </div>
    </div>
    </a> `
}


// ============== ADD PRODUCT ================== 

pitchCreateBtn.addEventListener(("click"),()=>{
    let product_object={
        title:pitchTitleInput.value,
        price:pitchPriceInput.value,
        category:pitchCategoryInput.value,
        image:pitchImageInput.value,
        founder:pitchfounderInput.value
    }
    // console.log(product_object)
    
    fetch('https://jp-project-json-server.onrender.com/pitches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product_object),
    })
        .then(res => res.json())
        .then(data => console.log(data))
        alert("Product Added...")
        .catch(error => console.log( error));
        alert("Something Went wrong")


})

// ============== ADD PRODUCT  END ================== 

// =================== DELETE ===================

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-button")) {
        dataProduct(e.target.dataset.id);
    }
})

function dataProduct(id){
    fetch(`https://jp-project-json-server.onrender.com/pitches/${id}`,{
        method:'DELETE',
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("DELETED...")
        console.log(data)
    })
    .catch((err)=>console.log(err));
}

// ================= DELETE END =====================

// ================= FILTER PART =====================

filterFood.addEventListener("click",()=>{

    let filterdata = productdata.filter((el)=>el.category=="Food")
    console.log(filterdata)
    cardList(filterdata)
})
filterElectronics.addEventListener("click",()=>{

    let filterdata = productdata.filter((el)=>el.category=="Electronics")
    console.log(filterdata)
    cardList(filterdata)
})
filterPersonalCare.addEventListener("click",()=>{

    let filterdata = productdata.filter((el)=>el.category=="Personal Care")
    console.log(filterdata)
    cardList(filterdata)
})

// ================= FILTER PART END =====================


// ================= SHORT DATA  =====================

sortAtoZBtn.addEventListener("click",()=>{

    const sortAtoZdata = productdata.sort((a,b)=>a.price-b.price)
    cardList(sortAtoZdata)
})

sortZtoABtn.addEventListener("click",()=>{

    const sortAtoZdata = productdata.sort((a,b)=>b.price-a.price)
    cardList(sortAtoZdata)
})

// ================= SHORT DATA END =====================


// ================= EDIT DATA =====================

    document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("card-link")){
            let id=e.target.dataset.id;
            editproduct(id)
        }
    })

    function editproduct(id){
        fetch(`https://jp-project-json-server.onrender.com/pitches/${id}`)
        .then((res)=>res.json())
        .then((data)=>{console.log(data)

            updatePitchTitleInput.value =data.title
            updatePitchImageInput.value = data.image
            updatePitchfounderInput.value =data.founder
            updatePitchCategoryInput.value = data.category
            updatePitchPriceInput.value = data.price
            updatePitchIdInput.value = data.id
        })
        .catch((err)=>console.log(err))

    }

    updatePitchBtn.addEventListener("click",()=>{
        console.log(updatePitchPriceInput.value)

        let updateproductdata={
            title:updatePitchTitleInput.value,
            image:updatePitchImageInput.value,
            founder:updatePitchfounderInput.value,
            category:updatePitchCategoryInput.value,
            price:updatePitchPriceInput.value,
            id:updatePitchIdInput.value
        }

        fetch(`https://jp-project-json-server.onrender.com/pitches/${updateproductdata.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateproductdata),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert("Data Updated...")
                fetchdata()
            })
            
            
            .catch(error =>{
                console.log( error)
                alert("Something Went wrong")
            })

            updatePitchTitleInput.value=""
            updatePitchImageInput.value=""
            updatePitchfounderInput.value=""
            updatePitchCategoryInput.value=""
            updatePitchPriceInput.value=""
            updatePitchIdInput.value=""
        
    })

// ================= EDIT DATA END =====================


// ============== ADD TO CART START ================== 

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("AddToCart")) {
      let id = event.target.dataset.id;
  
      fetch(`https://jp-project-json-server.onrender.com/pitches/${id}`)
        .then((res) => res.json())
        .then((data) => {
  
          fetch("https://jp-project-json-server.onrender.com/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((result) => alert("Data added into card..."))
            .catch((err) => alert("Someting went wrong..."));
        })
        .catch((err) => console.log(err));
     }
  });

// ============== ADD TO CART END ================== 
