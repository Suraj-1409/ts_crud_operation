let users = [];
let editId = null;
function getUserData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password")
        .value;
    const city = document.getElementById("city").value;
    const gender = document.querySelector('input[name="gender"]:checked')
        ?.value || "";
    return { name, email, password, city, gender };
}
function addUser(event) {
    event.preventDefault();
    const data = getUserData();
    if (editId === null) {
        const emailExists = users.some((user) => user.email.toLowerCase() === data.email.toLowerCase());
        if (emailExists) {
            alert("Email already exists. Please use another email.");
            return;
        }
        users.push({
            id: users.length + 1,
            ...data,
        });
    }
    else {
        const emailExists = users.some((user) => user.email.toLowerCase() === data.email.toLowerCase() &&
            user.id !== editId);
        if (emailExists) {
            alert("Email already exists. Please use another email.");
            return;
        }
        const index = users.findIndex((user) => user.id === editId);
        users[index] = {
            id: editId,
            ...data,
        };
        editId = null;
        document.querySelector("button").innerText =
            "Add User";
    }
    clearForm();
    displayUsers();
}
function displayUsers() {
    const table = document.getElementById("userTable");
    table.innerHTML = "";
    users.forEach((user) => {
        table.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}</td>

            <td>${user.email}</td>
            <td>${"*".repeat(user.password.length)}</td>
            <td>${user.city}</td>
            <td>${user.gender}</td>

            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editUser(${user.id})">
                    Edit
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteUser(${user.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
function editUser(id) {
    const user = users.find((user) => user.id === id);
    if (!user)
        return;
    document.getElementById("name").value = user.name;
    const emailInput = document.getElementById("email");
    emailInput.value = user.email;
    emailInput.readOnly = true;
    document.getElementById("password").value =
        user.password;
    document.getElementById("city").value = user.city;
    document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;
    editId = id;
    document.querySelector("button").innerText =
        "Update User";
}
function deleteUser(id) {
    const isConfirmed = confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
        return;
    }
    users = users.filter((user) => user.id !== id);
    displayUsers();
}
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("city").value = "";
    document.querySelectorAll('input[name="gender"]').forEach((radio) => {
        radio.checked = false;
    });
}
window.addUser = addUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
export {};
//# sourceMappingURL=crudIndex.js.map