
// Configurar la contraseña
const adminPassword = "Expertosenaccion"; // Cambia "TuContraseñaSegura" por la contraseña que prefieras

function addMissingPerson() {
    const photoInput = document.getElementById("photo");
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const location = document.getElementById("location").value.trim();

    // Validación de campos vacíos
    if (!photoInput.files[0] || !name || !surname || !location) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Cargar la imagen
    const reader = new FileReader();
    reader.onload = function (e) {
        const missingList = document.getElementById("missing-list");

        // Crear el contenedor de cada persona desaparecida
        const missingPerson = document.createElement("div");
        missingPerson.classList.add("missing-person");

        // Añadir la imagen, el nombre, apellidos, localidad y el botón de eliminar
        missingPerson.innerHTML = `
            <img src="${e.target.result}" alt="Foto de ${name} ${surname}">
            <h3>${name} ${surname}</h3>
            <p>Localidad: ${location}</p>
        `;

        // Crear el botón de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = function () {
            // Pedir la contraseña
            const enteredPassword = prompt("Introduce la contraseña para eliminar esta entrada:");

            // Verificar la contraseña
            if (enteredPassword === adminPassword) {
                missingList.removeChild(missingPerson); // Elimina la entrada si la contraseña es correcta
                alert("Entrada eliminada.");
            } else {
                alert("Contraseña incorrecta. No tienes permiso para eliminar esta entrada.");
            }
        };

        // Añadir el botón de eliminar al contenedor de la persona desaparecida
        missingPerson.appendChild(deleteButton);

        // Añadir la persona a la lista
        missingList.appendChild(missingPerson);
    };

    reader.readAsDataURL(photoInput.files[0]);

    // Limpiar los campos después de añadir
    document.getElementById("photo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("location").value = "";
}
