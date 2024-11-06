// Datos de Airtable (Base ID, Table Name y API Key)
const baseId = 'appbgh1Pb5jldKMmg';  // Base ID de tu base de Airtable
const tableName = 'tblwyPiwmCpMH22I8'; // Table Name de la tabla de personas desaparecidas
const apiKey = 'patUYTSg36fIl1kqG.33eb48858b60e875dd4029391d9d8a4d007c127c6c77056dc2851892f77bb9d2'; // Tu API Key

// Función para cargar las personas desaparecidas desde Airtable
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
        missingPeopleList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos datos
        
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
        console.error('Error al obtener datos:', error); // Si hay un error, lo mostramos en consola
    });
}

// Llamar a la función cuando la página se haya cargado
window.onload = loadMissingPeople;
