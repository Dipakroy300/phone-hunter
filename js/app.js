const loadPhones=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones=(phones,dataLimit)=>{
   const phoneContainer=document.getElementById('phone-container');
   phoneContainer.textContent='';

  //  display only 20 items of phone 

  const showAll=document.getElementById('show-all');

  if(dataLimit && phones.length > 10){
    phones=phones.slice(0,10);
    showAll.classList.remove('d-none');

  }
  else{
    showAll.classList.add('d-none');
  }

   
    // no found msg display 

    const noPhone=document.getElementById('no-found-message');
    if(phones.length === 0){
      noPhone.classList.remove('d-none');
    }
    else{
      noPhone.classList.add('d-none');
    }

    // display all phones
    phones.forEach( phone =>{
    const phoneDiv=document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`
                    <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">${phone.slug}</p>
                    </div>`;
     phoneContainer.appendChild(phoneDiv);

    //  stop spinner or loader 
    toggleSpinner(false);
                
   })
}

const processSearch=(dataLimit)=>{
   
  toggleSpinner(true);

  const searchField=document.getElementById('search-field');
  const searchText=searchField.value;

   loadPhones(searchText,dataLimit);
}
 
// search button clicked 
document.getElementById('btn-search').addEventListener('click',function(){
  // start loader 
    processSearch(10);
})

const toggleSpinner =isLoading=>{
  const loadersection=document.getElementById('loader');
  if(isLoading){
    loadersection.classList.remove('d-none');
  }
  else {
    loadersection.classList.add('d-none');
  }
}

// for show all loading after clicked shhow all button 

document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

loadPhones();