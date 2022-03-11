let input = document.querySelector(`#text`);
let userImage = document.querySelector(`.user-img img`);
let userName = document.querySelector(`.find-section h1`);
let userLogin = document.querySelector(`.find-section p`);
let followersUl = document.querySelector(`.followers ul`);
let followingUl = document.querySelector(`.following ul`);
let catImg = document.querySelector(`.cat-img img`);
let catBtn = document.querySelector(`.btn`);

function fetch(url) {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror =  () => reject(`Something went wrong ...`);
    xhr.send();
    // console.log(`nmn`); 
  })
};

/* function fetch(url, handler) {
  let xhr = new XMLHttpRequest();
  xhr.open(`GET`, url);
  xhr.onload = () => {
    let userData = JSON.parse(xhr.response);
    handler(userData);
  };
  xhr.onerror = function () {
    console.log(`Something went wrong ...`);
  };
  xhr.send();
} */

function handleFollowersAndFollowing(url, rootElm) {
  rootElm.innerHTML = '';
  // fetch(url, function (data) {
  //   for (let i = 0; i < 5; i++) {
  //     let li = document.createElement(`li`);
  //     let img = document.createElement(`img`);
  //     img.src = data[i].avatar_url;
  //     img.alt = data[i].name;
  //     li.append(img);
  //     rootElm.append(li);
  //   }
  // });
  fetch(url).then((data) => {
    for (let i = 0; i < 5; i++) {
        let li = document.createElement(`li`);
        let img = document.createElement(`img`);
        img.src = data[i].avatar_url;
        img.alt = data[i].name;
        li.append(img);
        rootElm.append(li);
      }
  }).catch((error) => console.log(error));
}

input.addEventListener(`keyup`, (event) => {
  if (event.keyCode === 13 && event.target.value) {
  /*   fetch(
      `https://api.github.com/users/${event.target.value}`,
      function (data) {
        userImage.src = `${data.avatar_url}`;
        userImage.alt = data.name;
        userName.innerText = data.name;
        userLogin.innerText = '@' + data.login;
        handleFollowersAndFollowing(data.followers_url, followersUl);
        handleFollowersAndFollowing(
          `https://api.github.com/users/${data.login}/following`,
          followingUl
        );
      }
    ) */
    fetch(`https://api.github.com/users/${event.target.value}`).then((data) => {
      userImage.src = `${data.avatar_url}`;
      userImage.alt = data.name;
      userName.innerText = data.name;
      userLogin.innerText = '@' + data.login;
      handleFollowersAndFollowing(data.followers_url, followersUl);
      handleFollowersAndFollowing(
        `https://api.github.com/users/${data.login}/following`,
        followingUl
      );
    }).catch((error) => console.log(error));
    event.target.value = '';
  }
});

catBtn.addEventListener(`click`, () => {
  /* fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=small`,
    function (data) {
      catImg.src = data[0].url;
    }
  ) */
  fetch(`https://api.thecatapi.com/v1/images/search?limit=1&size=small`).then((data) => {
    catImg.src = data[0].url;
  }).catch((error) => console.log(error));
});
