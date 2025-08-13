
const apiUrl = "http://stn-examen-ctd5q6-bfec83-77-237-241-121.traefik.me/api/endpoint"; // Remplacez /api/endpoint par un endpoint valide de l'API

document.getElementById('load-btn').addEventListener('click', () => {
  document.getElementById('error').textContent = '';
  document.getElementById('data-list').innerHTML = '<li>Chargement en cours...</li>';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
       return response.json();
    })
    .then(data => {
      const liste = document.getElementById('data-list');
      liste.innerHTML = ''; // Vide la liste avant affichage
          
      if (!Array.isArray(data) || data.length === 0) {
        liste.innerHTML = '<li>Aucune donnée disponible.</li>';
        return;
      }

      data.forEach(item => {
        // Exemple d'affichage : adapter en fonction des propriétés reçues
        const li = document.createElement('li');
        li.textContent = `ID: ${item.id} - Nom: ${item.name || item.title || 'N/A'}`;
        liste.appendChild(li);
      });
    })
    .catch(err => {
      document.getElementById('error').textContent = "Impossible de charger les données : " + err.message;
      document.getElementById('data-list').innerHTML = '';
    });
});
