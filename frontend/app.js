const API_URL = "http://localhost:8000";
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form");
const fnameInput = document.querySelector(".fname");
const lnameInput = document.querySelector(".lname");
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const urlInput = document.querySelector(".url");
const ageInput = document.querySelector(".age");

async function fetchData(api) {
    let response = await fetch(`${api}/users`);
    response
        .json()
        .then((res) => userData(res))
        .catch((err) => console.log(err));
}

fetchData(API_URL);

function userData(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }
    data.payload?.forEach((user) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = user.id;
        card.innerHTML = `
             <div class="card__info">
                <h3>${user.fname}</h3>
                <h3>${user.lname}</h3>
            </div>
            <p><b>age</b>:${user.age}</p>
            <p><b>username</b>:${user.username}</p>
            <p><b>password</b>:${user.password}</p>
            <div class="btns">
               
                <button class="delete__btn">delete</button>
            </div>
    `;
        wrapper.appendChild(card);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newUser = {
        fname: fnameInput.value,
        lname: lnameInput.value,
        age: +ageInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    };

    fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    })
        .then((res) => res.json())
        .then((res) => fetchData(API_URL))
        .catch((err) => console.log(err));
});

wrapper.addEventListener("click", (e) => {
    if (e.target.className === "delete__btn") {
        let id = e.target.closest(".card").dataset.id;
        console.log(id);
        fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => fetchData(API_URL));
    }
});
