// this is for featching and searching phone
const searchPhone = () => {
  const searchFeild = document.getElementById("search-feild");
  const searchInput = searchFeild.value.toLowerCase();
  searchFeild.value = ""; //this is for clearing input feild
  if (searchInput == "") {
    notFound("Please type any phone name..!");
  } else {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchInput}`
    )
      .then((res) => res.json())
      .then((data) => displayPhones(data));
  }
};
// this is for catching searchResult div
const searchResultCatch = () => {
  const result = document.getElementById("search-result");
  result.textContent = "";
  return result;
};
// common function for empty feild and not found phone
const notFound = (message) => {
  searchResultCatch();
  const error = document.getElementById("result");
  const div = document.createElement("div");
  div.innerHTML = `
    <h4 class="text-center text-light p-5 bg-danger rounded">${message}</h4>
    `;
  error.appendChild(div);
};
// this is for display phone
const displayPhones = (allPhones) => {
  const searchResult = searchResultCatch();
  if (allPhones.status == false) {
    notFound("No result found for your search..!"); //this function for not found phone
  } else {
    const phones = allPhones.data.slice(0, 20);
    for (const phone of phones) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card text-center text-dark my-4" style="height:35rem; width:22rem">
                <img src="${phone.image}" class="card-img-top img-fluid  p-4" style="height:400px" alt="...">
                <div class="card-body bg-light">
                  <h5 class="card-title text-danger">${phone.phone_name}</h5>
                  <p class="card-title">Brand : ${phone.brand}</p>
                  <button onclick="showDetails('${phone.slug}')" class="btn btn-danger">More Info</button>
                </div>
        </div>
        `;
      searchResult.appendChild(div);
    }
  }
};
// after clicking more info button this is the show details api call code
const showDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data));
};
// this is for show details code
const displayPhoneDetails = (phoneDetails) => {
  const showDetails = document.getElementById("show-details");
  showDetails.textContent = ""; //this is for clearing previous search result
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="card text-dark my-4 mx-auto " style=" width: 50rem">
      <img src="${
        phoneDetails.data.image
      }" class="card-img-top img-fluid mx-auto  p-4" style="height:250px; width:250px" alt="...">
      <div class="card-body bg-light  custom-design">
                <h4 class="card-title text-danger  text-center">${
                  phoneDetails.data.name
                }</h4>
                <h6 class="card-text text-center">${
                  phoneDetails.data.releaseDate
                    ? phoneDetails.data.releaseDate
                    : "Release date unavaiable"
                }</h6>
                <h6 class="card-title text-primary text-center"> ${
                  phoneDetails.data.brand
                }</h6>
                <hr>
  
                <h5 class="text-center text-uppercase">main features</h5>
                <p class="card-text"><span class="fw-bold">Storage :</span> ${
                  phoneDetails.data.mainFeatures.storage
                }</p>
                <p class="card-text"><span class="fw-bold">Display Size :</span> ${
                  phoneDetails.data.mainFeatures.displaySize
                }</p>
                <p class="card-text"><span class="fw-bold">ChipSet :</span> ${
                  phoneDetails.data.mainFeatures.chipSet
                }</p>
                <p class="card-text"><span class="fw-bold">Memory :</span> ${
                  phoneDetails.data.mainFeatures.memory
                }</p>
                <p class="card-text"><span class="fw-bold">Sensors :</span> ${
                  phoneDetails.data.mainFeatures.sensors
                }</p>
  
                <h5 class="text-center text-uppercase">other features</h5>
                <p class="card-text"><span class="fw-bold">WLAN:</span> ${
                  phoneDetails.data.others.WLAN
                }</p>
                <p class="card-text"><span class="fw-bold">Bluetooth :</span> ${
                  phoneDetails.data.others.Bluetooth
                }</p>
                <p class="card-text"><span class="fw-bold">GPS :</span> ${
                  phoneDetails.data.others.GPS
                }</p>
                <p class="card-text"><span class="fw-bold">NFC :</span> ${
                  phoneDetails.data.others.NFC
                }</p>
                <p class="card-text"><span class="fw-bold">Radio :</span> ${
                  phoneDetails.data.others.Radio
                }</p>
                <p class="card-text"><span class="fw-bold">USB :</span> ${
                  phoneDetails.data.others.USB
                }</p>
                <hr>
              </div>
      </div>
      `;
  showDetails.appendChild(div);
};
