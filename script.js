let leftBox = document.querySelector(".leftBox");
let basketList = document.querySelector(".basketList");
let favouriteList = document.querySelector(".favouriteList");
let allproduct = document.querySelector(".allproducts");
let mansection = document.querySelector(".Men");
let womansection = document.querySelector(".Women");
let accessoriesSection = document.querySelector(".Accessories");
let electronicSection = document.querySelector(".Electronics");
let totalpriceBasket = document.querySelector(".totalbasket");
let totalpriceFavourite = document.querySelector(".totalfavourite");
let filterSelect = document.querySelector("#filterSelect");
let defaultfilter = document.querySelector(".defaultfilter");
let lowestprice = document.querySelector(".lowestPrice");
let highestprice = document.querySelector(".highestPrice");
let lowestrating = document.querySelector(".lowestRating");
let highestrating = document.querySelector(".highestRating");

let url = "https://fakestoreapi.com/products/";
let sum = 0;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element, i) => {
      i++;

      let starsCount = Math.floor(element.rating.rate);
      let halfStar = element.rating.rate - starsCount >= 0.5;
      let stars = "";
      for (let i = 0; i < starsCount; i++) {
        stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
      }
      if (halfStar) {
        stars += '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
      }

      leftBox.innerHTML += `<div class="wrapper">
          <div class="img-wrapper">
            <img
              src=${element.image}
              alt=""
            />
          </div>
          <div class="info">
            <p>${element.title}</p>
            <p>$${element.price}</p>
            <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
          </div>
          <div class="buttons">
            <button name=${i} type="button" class=" basketbtn">
               Add to Basket
            </button>
            <button name=${i} type="button" class="favouritebtn">
            <i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </button>
               <button name=${i} class="details">Details</button>
          </div>
        </div>`;

      let basketbtn = document.querySelectorAll(".basketbtn");
      for (let btns of basketbtn) {
        btns.addEventListener("click", function () {
          fetch(url + btns.name)
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                icon: "success",
                title: `${data.title} added your cart successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              basketList.innerHTML += ` 
              <div class="basketItem">
                <div class = "items">
                  <div class="img">
                    <img
                      src="${data.image}"
                      alt=""
                    />
                  </div>
                  <div class="texts">
                    <p>${data.title}</p>
                    <p>Price: $${data.price}</p>
                    <p>Rating:${stars}</p>
                    <p>Stock count:${element.rating.count}</p>
                  </div>
                </div>
                <div class="deletebtn">
                  <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                </div>
              </div>
            `;
              sum += data.price;
              sum = Math.round(sum * 100) / 100;
              totalpriceBasket.innerHTML = `$${sum}`;

              let deletebtn = document.querySelectorAll(".deletebtn");
              for (let btns of deletebtn) {
                btns.addEventListener("click", function () {
                  Swal.fire({
                    title: "Are you sure to remove this item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceBasket.innerHTML = `$${sum}`;
                      Swal.fire({
                        title: `${data.title} is removed from your basket successfully`,
                        icon: "success",
                      });
                      this.parentElement.remove();
                    }
                  });
                });
              }
            });
        });
      }

      let favouritebtn = document.querySelectorAll(".favouritebtn");
      for (let btns of favouritebtn) {
        btns.addEventListener("click", function () {
          fetch(url + btns.name)
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                icon: "success",
                title: `${data.title} added your favourites successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              favouriteList.innerHTML += `<div class="basketItem">
              <div class = "items">
                <div class="img">
                  <img
                    src="${data.image}"
                    alt=""
                  />
                </div>
                <div class="texts">
                  <p>${data.title}</p>
                  <p>Price: $${data.price}</p>
                  <p>Rating:${stars}</p>
                  <p>Stock count:${element.rating.count}</p>
                </div>
              </div>
              <div class="deletebtn">
                <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
              </div>
            </div>`;
              sum += data.price;
              sum = Math.round(sum * 100) / 100;
              totalpriceFavourite.innerHTML = `$${sum}`;

              let deletebtn = document.querySelectorAll(".deletebtn");
              for (let btns of deletebtn) {
                btns.addEventListener("click", function () {
                  Swal.fire({
                    title: "Are you sure to remove this item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceFavourite.innerHTML = `$${sum}`;

                      Swal.fire({
                        title: `${data.title} is removed from your basket successfully`,
                        icon: "success",
                      });
                      this.parentElement.remove();
                    }
                  });
                });
              }
            });
        });
      }

      let detailbuttons = document.querySelectorAll(".details");
      for (let btns of detailbuttons) {
        btns.addEventListener("click", function () {
          fetch(url + btns.name)
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                imageUrl: `${data.image}`,
                imageWidth: 300,
                imageHeight: 400,
                imageAlt: "Custom image",
              });
            });
        });
      }

      filterSelect.addEventListener("click", function () {
        let selectedValue = filterSelect.value;
        if (selectedValue === "lowestPrice") {
          data.sort((a, b) => a.price - b.price);
        } else if (selectedValue === "highestPrice") {
          data.sort((a, b) => b.price - a.price);
        } else if (selectedValue === "lowestRating") {
          data.sort((a, b) => a.rating?.rate - b.rating?.rate);
        } else if (selectedValue === "highestRating") {
          data.sort((a, b) => b.rating?.rate - a.rating?.rate);
        } else {
          data.sort((a, b) => a.id - b.id);
        }
        leftBox.innerHTML = "";
        data.forEach((element, i) => {
          i++;

          let starsCount = Math.floor(element.rating.rate);
          let halfStar = element.rating.rate - starsCount >= 0.5;
          let stars = "";
          for (let i = 0; i < starsCount; i++) {
            stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
          }
          if (halfStar) {
            stars +=
              '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
          }

          leftBox.innerHTML += `<div class="wrapper">
                <div class="img-wrapper">
                  <img
                    src=${element.image}
                    alt=""
                  />
                </div>
                <div class="info">  
                  <p>${element.title}</p>
                  <p>$${element.price}</p>
                  <p>Rating:${stars}</p>
                  <p>Stock count:${element.rating.count}</p>
                </div>
                <div class="buttons">
                  <button name=${element.id} type="button" class=" basketbtn">
                     Add to Basket
                  </button>
                  <button name=${element.id} type="button" class="favouritebtn">
                  <i class="fa-solid fa-heart" style="color: #ff0000"></i>
                  </button>
                     <button name=${element.id} class="details">Details</button>
                </div>
              </div>`;

          let basketbtn = document.querySelectorAll(".basketbtn");
          for (let btns of basketbtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your cart successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  basketList.innerHTML += ` 
                    <div class="basketItem">
                      <div class = "items">
                        <div class="img">
                          <img
                            src="${data.image}"
                            alt=""
                          />
                        </div>
                        <div class="texts">
                          <p>${data.title}</p>
                          <p>Price: $${data.price}</p>
                          <p>Rating:${stars}</p>
                          <p>Stock count:${element.rating.count}</p>
                        </div>
                      </div>
                      <div class="deletebtn">
                        <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                      </div>
                    </div>
                  `;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceBasket.innerHTML = `$${sum}`;

                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum -= data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceBasket.innerHTML = `$${sum}`;
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let favouritebtn = document.querySelectorAll(".favouritebtn");
          for (let btns of favouritebtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your favourites successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  favouriteList.innerHTML += `<div class="basketItem">
                    <div class = "items">
                      <div class="img">
                        <img
                          src="${data.image}"
                          alt=""
                        />
                      </div>
                      <div class="texts">
                        <p>${data.title}</p>
                        <p>Price: $${data.price}</p>
                        <p>Rating:${stars}</p>
                        <p>Stock count:${element.rating.count}</p>
                      </div>
                    </div>
                    <div class="deletebtn">
                      <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                    </div>
                  </div>`;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceFavourite.innerHTML = `$${sum}`;

                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum -= data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceFavourite.innerHTML = `$${sum}`;

                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let detailbuttons = document.querySelectorAll(".details");
          for (let btns of detailbuttons) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                    html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                    imageUrl: `${data.image}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: "Custom image",
                  });
                });
            });
          }
        });
      });
    });
  });

mansection.addEventListener("click", function () {
  leftBox.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (element.category == "men's clothing") {
          i++;
          let starsCount = Math.floor(element.rating.rate);
          let halfStar = element.rating.rate - starsCount >= 0.5;
          let stars = "";
          for (let i = 0; i < starsCount; i++) {
            stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
          }
          if (halfStar) {
            stars +=
              '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
          }

          leftBox.innerHTML += `<div class="wrapper">
          <div class="img-wrapper">
            <img
              src=${element.image}
              alt=""
            />
          </div>
          <div class="info">
            <p>${element.title}</p>
            <p>$${element.price}</p>
            <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
          </div>
          <div class="buttons">
            <button name=${i} type="button" class=" basketbtn">
               Add to Basket
            </button>
            <button name=${i} type="button" class="favouritebtn">
            <i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </button>
               <button name=${i} class="details">Details</button>
          </div>
        </div>`;
          let basketbtn = document.querySelectorAll(".basketbtn");
          for (let btns of basketbtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your cart successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  basketList.innerHTML += ` 
              <div class="basketItem">
                <div class = "items">
                  <div class="img">
                    <img
                      src="${data.image}"
                      alt=""
                    />
                  </div>
                  <div class="texts">
                    <p>${data.title}</p>
                    <p>Price: $${data.price}</p>
                    <p>Rating:${stars}</p>
                  <p>Stock count:${element.rating.count}</p>
                  </div>
                </div>
                <div class="deletebtn">
                  <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                </div>
              </div>
            `;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceBasket.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum -= data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceBasket.innerHTML = `$${sum}`;
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let favouritebtn = document.querySelectorAll(".favouritebtn");
          for (let btns of favouritebtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your favourites successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  favouriteList.innerHTML += `<div class="basketItem">
              <div class = "items">
                <div class="img">
                  <img
                    src="${data.image}"
                    alt=""
                  />
                </div>
                <div class="texts">
                  <p>${data.title}</p>
                  <p>Price: $${data.price}</p>
                  <p>Rating:${stars}</p>
                  <p>Stock count:${element.rating.count}</p>
                </div>
              </div>
              <div class="deletebtn">
                <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
              </div>
            </div>`;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceFavourite.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceFavourite.innerHTML = `$${sum}`;
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let detailbuttons = document.querySelectorAll(".details");
          for (let btns of detailbuttons) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                    html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                    imageUrl: `${data.image}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: "Custom image",
                  });
                });
            });
          }
        }
      });
    });
});

womansection.addEventListener("click", function () {
  leftBox.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (element.category == "women's clothing") {
          i++;

          let starsCount = Math.floor(element.rating.rate);
          let halfStar = element.rating.rate - starsCount >= 0.5;
          let stars = "";
          for (let i = 0; i < starsCount; i++) {
            stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
          }
          if (halfStar) {
            stars +=
              '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
          }

          leftBox.innerHTML += `<div class="wrapper">
          <div class="img-wrapper">
            <img
              src=${element.image}
              alt=""
            />
          </div>
          <div class="info">
            <p>${element.title}</p>
            <p>$${element.price}</p>
            <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
          </div>
          <div class="buttons">
            <button name=${i} type="button" class=" basketbtn">
               Add to Basket
            </button>
            <button name=${i} type="button" class="favouritebtn">
            <i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </button>
               <button name=${i} class="details">Details</button>
          </div>
        </div>`;
          let basketbtn = document.querySelectorAll(".basketbtn");
          for (let btns of basketbtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your cart successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  basketList.innerHTML += ` 
              <div class="basketItem">
                <div class = "items">
                  <div class="img">
                    <img
                      src="${data.image}"
                      alt=""
                    />
                  </div>
                  <div class="texts">
                    <p>${data.title}</p>
                    <p>Price: $${data.price}</p>
                    <p>Rating:${stars}</p>
                    <p>Stock count:${element.rating.count}</p>
                  </div>
                </div>
                <div class="deletebtn">
                  <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                </div>
              </div>
            `;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceBasket.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceBasket.innerHTML = `$${sum}`;
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let favouritebtn = document.querySelectorAll(".favouritebtn");
          for (let btns of favouritebtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your favourites successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  favouriteList.innerHTML += `<div class="basketItem">
              <div class = "items">
                <div class="img">
                  <img
                    src="${data.image}"
                    alt=""
                  />
                </div>
                <div class="texts">
                  <p>${data.title}</p>
                  <p>Price: $${data.price}</p>
                  <p>Rating:${stars}</p>
                  <p>Stock count:${element.rating.count}</p>
                </div>
              </div>
              <div class="deletebtn">
                <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
              </div>
            </div>`;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceFavourite.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceFavourite.innerHTML = `$${sum}`;
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let detailbuttons = document.querySelectorAll(".details");
          for (let btns of detailbuttons) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                    html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                    imageUrl: `${data.image}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: "Custom image",
                  });
                });
            });
          }
        }
      });
    });
});

accessoriesSection.addEventListener("click", function () {
  leftBox.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (element.category == "jewelery") {
          i++;

          let starsCount = Math.floor(element.rating.rate);
          let halfStar = element.rating.rate - starsCount >= 0.5;
          let stars = "";
          for (let i = 0; i < starsCount; i++) {
            stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
          }
          if (halfStar) {
            stars +=
              '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
          }

          leftBox.innerHTML += `<div class="wrapper">
          <div class="img-wrapper">
            <img
              src=${element.image}
              alt=""
            />
          </div>
          <div class="info">
            <p>${element.title}</p>
            <p>$${element.price}</p>
            <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
          </div>
          <div class="buttons">
            <button name=${i} type="button" class=" basketbtn">
               Add to Basket
            </button>
            <button name=${i} type="button" class="favouritebtn">
            <i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </button>
               <button name=${i} class="details">Details</button>
          </div>
        </div>`;
          let basketbtn = document.querySelectorAll(".basketbtn");
          for (let btns of basketbtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your cart successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  basketList.innerHTML += ` 
              <div class="basketItem">
                <div class = "items">
                  <div class="img">
                    <img
                      src="${data.image}"
                      alt=""
                    />
                  </div>
                  <div class="texts">
                    <p>${data.title}</p>
                    <p>Price: $${data.price}</p>
                    <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
                  </div>
                </div>
                <div class="deletebtn">
                  <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                </div>
              </div>
            `;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceBasket.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum += data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceBasket.innerHTML = `$${sum}`;
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let favouritebtn = document.querySelectorAll(".favouritebtn");
          for (let btns of favouritebtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your favourites successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  favouriteList.innerHTML += `<div class="basketItem">
              <div class = "items">
                <div class="img">
                  <img
                    src="${data.image}"
                    alt=""
                  />
                </div>
                <div class="texts">
                  <p>${data.title}</p>
                  <p>Price: $${data.price}</p>
                  <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
                </div>
              </div>
              <div class="deletebtn">
                <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
              </div>
            </div>`;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceFavourite.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      sum -= data.price;
                      sum = Math.round(sum * 100) / 100;
                      totalpriceFavourite.innerHTML = `$${sum}`;
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let detailbuttons = document.querySelectorAll(".details");
          for (let btns of detailbuttons) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                    html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                    imageUrl: `${data.image}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: "Custom image",
                  });
                });
            });
          }
        }
      });
    });
});

electronicSection.addEventListener("click", function () {
  leftBox.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (element.category == "electronics") {
          i++;

          let starsCount = Math.floor(element.rating.rate);
          let halfStar = element.rating.rate - starsCount >= 0.5;
          let stars = "";
          for (let i = 0; i < starsCount; i++) {
            stars += '<i class="fa-solid fa-star" style="color:yellow;"></i>';
          }
          if (halfStar) {
            stars +=
              '<i class="fa-solid fa-star-half" style="color:yellow;"></i>';
          }

          leftBox.innerHTML += `<div class="wrapper">
          <div class="img-wrapper">
            <img
              src=${element.image}
              alt=""
            />
          </div>
          <div class="info">
            <p>${element.title}</p>
            <p>$${element.price}</p>
            <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
          </div>
          <div class="buttons">
            <button name=${i} type="button" class=" basketbtn">
               Add to Basket
            </button>
            <button name=${i} type="button" class="favouritebtn">
            <i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </button>
               <button name=${i} class="details">Details</button>
          </div>
        </div>`;
          let basketbtn = document.querySelectorAll(".basketbtn");
          for (let btns of basketbtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your cart successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  basketList.innerHTML += ` 
              <div class="basketItem">
                <div class = "items">
                  <div class="img">
                    <img
                      src="${data.image}"
                      alt=""
                    />
                  </div>
                  <div class="texts">
                    <p>${data.title}</p>
                    <p>Price: $${data.price}</p>
                    <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
                  </div>
                </div>
                <div class="deletebtn">
                  <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
                </div>
              </div>
            `;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceBasket.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum -= data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceBasket.innerHTML = `$${sum}`;
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let favouritebtn = document.querySelectorAll(".favouritebtn");
          for (let btns of favouritebtn) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    icon: "success",
                    title: `${data.title} added your favourites successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  favouriteList.innerHTML += `<div class="basketItem">
              <div class = "items">
                <div class="img">
                  <img
                    src="${data.image}"
                    alt=""
                  />
                </div>
                <div class="texts">
                  <p>${data.title}</p>
                  <p>Price: $${data.price}</p>
                  <p>Rating:${stars}</p>
            <p>Stock count:${element.rating.count}</p>
                </div>
              </div>
              <div class="deletebtn">
                <i class="fa-regular fa-trash-can trash" style="color: #fff"></i>
              </div>
            </div>`;
                  sum += data.price;
                  sum = Math.round(sum * 100) / 100;
                  totalpriceFavourite.innerHTML = `$${sum}`;
                  let deletebtn = document.querySelectorAll(".deletebtn");
                  for (let btns of deletebtn) {
                    btns.addEventListener("click", function () {
                      Swal.fire({
                        title: "Are you sure to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sum -= data.price;
                          sum = Math.round(sum * 100) / 100;
                          totalpriceFavourite.innerHTML = `$${sum}`;
                          Swal.fire({
                            title: `${data.title} is removed from your basket successfully`,
                            icon: "success",
                          });
                          this.parentElement.remove();
                        }
                      });
                    });
                  }
                });
            });
          }

          let detailbuttons = document.querySelectorAll(".details");
          for (let btns of detailbuttons) {
            btns.addEventListener("click", function () {
              fetch(url + btns.name)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `${data.title} \n ${data.category} \n Rating:${data.rating?.rate} \n Price:$${data.price}`,
                    html: `Description: ${data.description}<br>Stock count: ${data.rating?.count}`,
                    imageUrl: `${data.image}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: "Custom image",
                  });
                });
            });
          }
        }
      });
    });
});
