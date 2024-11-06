// Datos de Airtable
const baseId = 'appbgh1Pb5jldKMmg';
const tableName = 'tblwyPiwmCpMH22I8';
const apiKey = 'patUYTSg36fIl1kqG.33eb48858b60e875dd4029391d9d8a4d007c127c6c77056dc2851892f77bb9d2';

// Función para cargar personas desaparecidas desde Airtable
function loadMissingPeople() {
    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const missingPeopleList = document.getElementById('missing-people-list');
        missingPeopleList.innerHTML = ''; 
        
        data.records.forEach(record => {
            const person = record.fields;
            const personDiv = document.createElement('div');
            personDiv.classList.add('person');

            personDiv.innerHTML = `
                <img src="${person.Foto[0].url}" alt="${person.Nombre}" width="150">
                <h3>${person.Nombre}</h3>
                <p><strong>Localidad de desaparición:</strong> ${person.Localidad}</p>
            `;

            missingPeopleList.appendChild(personDiv);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

// Función para añadir una nueva persona
function addPerson() {
    const photoFile = document.getElementById('photo').files[0];
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const location = document.getElementById('location').value;
    
    // Convertir la imagen a base64 para enviarla a Airtable
    const reader = new FileReader();
    reader.onload = function () {
        const photoBase64 = reader.result.split(',')[1];
        
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
            loadMissingPeople(); // Recargar la lista después de añadir
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

// Llamar a la función cuando la página se haya cargado
window.onload = loadMissingPeople;

            personDiv.innerHTML = `
                <img src="${person.Foto[0].url}" alt="${person.Nombre}" width="150">
                <h3>${person.Nombre}</h3>
                <p><strong>Localidad de desaparición:</strong> ${person.Localidad}</p>
            `;

            missingPeopleList.appendChild(personDiv);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error); // Si hay un error, lo mostramos en consola
    });
}

// Llamar a la función cuando la página se haya cargado
window.onload = loadMissingPeople;
