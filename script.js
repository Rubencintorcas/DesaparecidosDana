document.addEventListener("DOMContentLoaded", function() {
    // Datos de Airtable
    const baseId = '';  // Base ID de tu base de Airtable
    const tableName = ''; // Nombre de la tabla de personas desaparecidas
    const apiKey = ''; // Tu API Key

    // Selecciona el botón y añade el evento de clic para agregar una persona
    document.getElementById("add-person-btn").addEventListener("click", addPerson);

    // Función para añadir una persona desaparecida a Airtable
    function addPerson() {
        const photoFile = document.getElementById('photo').files[0];
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const location = document.getElementById('location').value;

        // Lee el archivo de imagen y lo convierte a base64
        const reader = new FileReader();
        reader.onload = function () {
            const photoBase64 = reader.result.split(',')[1];

            // Configuración para enviar la información a Airtable
            fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        Nombre: `${firstName} ${lastName}`,
                        Localidad: location,
                        Foto: [
                            {
                                url: `data:image/jpeg;base64,${photoBase64}`
                            }
                        ]
                    }
                })
            })
            .then(response => response.json())
            .then(() => {
                alert("Persona añadida exitosamente");
                loadMissingPeople(); // Recargar la lista después de añadir una persona
            })
            .catch(error => {
                console.error('Error al añadir persona:', error);
            });
        };

        if (photoFile) {
            reader.readAsDataURL(photoFile);
        } else {
            alert("Por favor, selecciona una foto.");
        }
    }

    // Función para cargar la lista de personas desaparecidas desde Airtable
    function loadMissingPeople() {
        fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const missingPeopleList = document.getElementById("missing-people-list");
            missingPeopleList.innerHTML = ""; // Limpia la lista antes de cargarla

            data.records.forEach(record => {
                const personDiv = document.createElement("div");
                personDiv.classList.add("person");

                const nameElement = document.createElement("h3");
                nameElement.textContent = record.fields.Nombre;
                personDiv.appendChild(nameElement);

                const locationElement = document.createElement("p");
                locationElement.textContent = "Localidad: " + record.fields.Localidad;
                personDiv.appendChild(locationElement);

                if (record.fields.Foto && record.fields.Foto.length > 0) {
                    const photoElement = document.createElement("img");
                    photoElement.src = record.fields.Foto[0].url;
                    photoElement.alt = record.fields.Nombre;
                    personDiv.appendChild(photoElement);
                }

                missingPeopleList.appendChild(personDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar personas:", error);
        });
    }

    // Llama a la función para cargar la lista de personas desaparecidas al cargar la página
    loadMissingPeople();
});
