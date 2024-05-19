document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });
  
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');
  

  
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});



async function loadNews() {
  try {
    const newsFolderPath = '../news/';

    // Ottieni la lista dei file JSON nella cartella news
    const response = await fetch(newsFolderPath);  //VOGLIO LA LISTA QUI CHATGPT
    const fileList = await response.text();

    // Estrai i nomi dei file JSON dalla lista
    let fileNames = fileList.match(/news\d+\.json/g);


    // Contatore per limitare il numero di notizie aggiunte
    let newsCount = 0;

    // Set per tenere traccia dei titoli delle notizie già aggiunte
    const addedTitles = new Set();

    // Per ogni nome di file nella lista
    for (const fileName of fileNames) {
      if (newsCount >= 10) break; // Limita il numero di notizie a 10

      // Ottieni il percorso completo del file JSON
      const filePath = `${newsFolderPath}${fileName}`;

      // Carica il contenuto del file JSON
      const fileResponse = await fetch(filePath);
      const jsonData = await fileResponse.json();

      // Verifica se il titolo della notizia è già stato aggiunto
      if (!addedTitles.has(jsonData.title)) {
        // Aggiungi le notizie all'HTML
        addNewsToHTML(jsonData);
        addedTitles.add(jsonData.title); // Aggiungi il titolo alla lista delle notizie aggiunte
        newsCount++; // Incrementa il contatore delle notizie aggiunte
      }
    }
  } catch (error) {
    console.error('Si è verificato un errore nel caricamento delle notizie:', error);
  }
}

function addNewsToHTML(newsData) {
  // Creare gli elementi HTML e popolarli con i dati delle notizie
  const newsContainer = document.getElementById('newsContainer');
  const newsBox = document.createElement('div');
  newsBox.classList.add('message-box');

  const newsImage = document.createElement('img');
  newsImage.src = newsData.imageUrl;
  newsImage.alt = newsData.title;

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');

  const messageHeader = document.createElement('div');
  messageHeader.classList.add('message-header');
  const newsTitle = document.createElement('div');
  newsTitle.classList.add('name');
  newsTitle.textContent = newsData.title;

  const newsPreview = document.createElement('p');
  newsPreview.textContent = newsData.previewText;

  const newsDate = document.createElement('p');
  newsDate.classList.add('message-line');
  newsDate.classList.add('time');
  newsDate.textContent = getTimeSince(newsData.date || new Date(newsData.modifiedDate));

  // Aggiungi gli eventi di click per aprire il link
  newsBox.addEventListener('click', () => {
    const link = generateLink(newsData.title);
    window.location.href = link;
  });

  // Aggiungi gli elementi al contenitore
  messageHeader.appendChild(newsTitle);
  messageContent.appendChild(messageHeader);
  messageContent.appendChild(newsPreview);
  messageContent.appendChild(newsDate);
  newsBox.appendChild(newsImage);
  newsBox.appendChild(messageContent);
  newsContainer.appendChild(newsBox); // Aggiungi il box al contenitore
}

function generateLink(title) {
  // Rimuovi caratteri non alfanumerici e sostituisci gli spazi con trattini
  return (title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + ".html");
}

// Funzione per calcolare il tempo trascorso
function getTimeSince(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference >= 7) {
    // Se sono passati più di 7 giorni, mostra la data completa
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options);
  } else if (daysDifference > 0) {
    // Altrimenti, mostra il tempo trascorso in giorni
    return `${daysDifference} giorn${daysDifference !== 1 ? 'i' : 'o'} fa`;
  } else if (hoursDifference > 0) {
    // Se sono passate meno di 24 ore, mostra il tempo trascorso in ore
    return `${hoursDifference} or${hoursDifference !== 1 ? 'e' : 'a'} fa`;
  } else if (minutesDifference > 0) {
    // Se sono passati meno di 60 minuti, mostra il tempo trascorso in minuti
    return `${minutesDifference} minut${minutesDifference !== 1 ? 'i' : 'o'} fa`;
  } else {
    // Se sono passati meno di 60 secondi, mostra il tempo trascorso in secondi
    return `${secondsDifference} second${secondsDifference !== 1 ? 'i' : 'o'} fa`;
  }
}

loadNews();

document.addEventListener('DOMContentLoaded', function () {
  const appIcon = document.getElementById('app-icon-overlay');
  const dropdownMenu = document.getElementById('dropdown-menu');

  appIcon.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', function (event) {
    if (!appIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }
  });
});











const jsonData = [
  { "title": "Samir Buzatu: Un Ingegnere dell'Intelligenza Artificiale e della Sostenibilità Ambientale", "previewText": "Samir Buzatu, giovane ingegnere del software, rivoluziona l'AI e la sostenibilità. Dal progetto Vivienne di SpaceX al dispositivo EcoBall per il monitoraggio dell'acqua, le sue innovazioni mostrano una combinazione di tecnica e creatività eccezionali.", "imageUrl": "https://media.licdn.com/dms/image/D4E03AQGjNLYejDItZA/profile-displayphoto-shrink_800_800/0/1678447206866?e=2147483647&v=beta&t=jtY18uccxAE7KlB3d7K1LymJ5cD2_43yX4Bl36ak5Fk", "modifiedDate": "2024-05-18T18:00:00" },
  { "title": "La Crescita della Criminalità Informatica: Un Fenomeno in Aumento", "previewText": "La crescente complessità e diffusione delle tecnologie digitali ha alimentato un preoccupante aumento della criminalità informatica. Nel primo semestre di quest'anno, l'Ufficio Federale della Cibersicurezza (UFCS) ha registrato un notevole incremento delle segnalazioni di ciberincidenti, totalizzando 30'331 notifiche, rispetto alle 16'951 dello stesso periodo nel 2022.", "imageUrl": null, "modifiedDate": "2024-05-06T11:00:00" },
  { "title": "Tumori, Scoperte 107 Proteine che Predicono il Rischio con 7 Anni di Anticipo", "previewText": "Un gruppo di ricercatori britannici ha identificato 618 proteine nel sangue che possono prevedere il rischio di sviluppare il cancro, con 107 di queste proteine in grado di segnalare un allarme fino a sette anni prima della diagnosi.", "imageUrl": "https://example.com/path-to-image.jpg", "modifiedDate": "2024-05-17T10:15:00" }
];

const searchInput = document.querySelector('.search-input');
const resultsContainer = document.querySelector('.results');

searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase();
  resultsContainer.innerHTML = '';

  const filteredData = jsonData.filter(item => item.title.toLowerCase().includes(query));

  if (filteredData.length === 0) {
    resultsContainer.style.display = 'none';
  } else {
    resultsContainer.style.display = 'block';
    filteredData.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = item.title;
      link.href = generateLink(item.title);
      li.appendChild(link);
      resultsContainer.appendChild(li);
    });
  }
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.search-wrapper')) {
    resultsContainer.style.display = 'none';
  }
});

searchInput.addEventListener('focus', function() {
  if (searchInput.value) {
    resultsContainer.style.display = 'block';
  }
});

function generateLink(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + ".html";
}









const mesi = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const oggi = new Date();
const mese = mesi[oggi.getMonth()]; // Ottieni il nome del mese
const giorno = oggi.getDate(); // Ottieni il giorno
const dataString = `${mese} ${giorno}`;
document.querySelector('.time').textContent = dataString;
