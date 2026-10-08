interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  city: string;
  gender: string;
}

let users: User[] = [];
let editId: number | null = null;

function getUserData() {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  const city = (document.getElementById("city") as HTMLSelectElement).value;

  const gender =
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)
      ?.value || "";

  return { name, email, password, city, gender };
}

function addUser(event: Event) {
  event.preventDefault();

  const data = getUserData();

  if (editId === null) {
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (emailExists) {
      alert("Email already exists. Please use another email.");
      return;
    }

    users.push({
      id: users.length + 1,
      ...data,
    });
  } else {
    
    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.id !== editId
    );

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

    (document.querySelector("button") as HTMLButtonElement).innerText =
      "Add User";
  }

  clearForm();
  displayUsers();
}


function displayUsers() {
  const table = document.getElementById("userTable") as HTMLElement;

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

function editUser(id: number) {
  const user = users.find((user) => user.id === id);

  if (!user) return;

  (document.getElementById("name") as HTMLInputElement).value = user.name;

  const emailInput = document.getElementById("email") as HTMLInputElement;
  emailInput.value = user.email;
  emailInput.readOnly = true;

  (document.getElementById("password") as HTMLInputElement).value =
    user.password;
  (document.getElementById("city") as HTMLSelectElement).value = user.city;

  (
    document.querySelector(
      `input[name="gender"][value="${user.gender}"]`,
    ) as HTMLInputElement
  ).checked = true;

  editId = id;

  (document.querySelector("button") as HTMLButtonElement).innerText =
    "Update User";
}

function deleteUser(id: number) {
  const isConfirmed = confirm("Are you sure you want to delete this user?");

  if (!isConfirmed) {
    return;
  }

  users = users.filter((user) => user.id !== id);

  displayUsers();
}

function clearForm() {
  (document.getElementById("name") as HTMLInputElement).value = "";
  (document.getElementById("email") as HTMLInputElement).value = "";
  (document.getElementById("password") as HTMLInputElement).value = "";
  (document.getElementById("city") as HTMLSelectElement).value = "";

  document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });
}

(window as any).addUser = addUser;
(window as any).editUser = editUser;
(window as any).deleteUser = deleteUser;
