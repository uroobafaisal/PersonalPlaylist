const link = document.querySelector('#input-link');
const sName = document.querySelector('#playList');
const btn = document.querySelector('.add-btn');
const songList = document.querySelector('.collection');
const iframe = document.querySelector('#input-video');
const embed = "https://www.youtube.com/embed/";

const styleCollection = document.querySelector('.collection-item');


loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getSongs);
    btn.addEventListener('click', URL);
    btn.addEventListener('click', addSong);
    songList.addEventListener('click', removeSong, true);
    songList.addEventListener('click', clickSong, true);
}

function URL() {

    var url = link.value;

    if (sName.value === '') {
        alert('Add a song');
        return;
    }

    if (url === '') {
        alert('Add a URL');
    }

    var id = url.split("?")[1].split("&")[0].split("=")[1];
    var SplitUrl = embed + id;

    iframe.src = `${SplitUrl}`;
    return SplitUrl;

};



// Get Songs from LS
function getSongs() {
    if (localStorage.getItem('playLists') === null) {
        playLists = [];
    } else {
        playLists = JSON.parse(localStorage.getItem('playLists'));
    }
    playLists.forEach(function(playList) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(playList.name));
        // Create new link element
        const dLink = document.createElement('a');
        // Add class
        dLink.className = 'delete-item secondary-content';
        // Add icon html
        dLink.innerHTML = '<i class="fas fa-times"></i>';
        // Append the link to li
        li.appendChild(dLink);
        // Append li to ul
        // link.appendChild(li);
        if (playList.name !== '') {
            songList.appendChild(li);
        }
        //Clear Input
        playList = '';
    });

    document.getElementById('input-video').src = localStorage.getItem('last_clicked');
    console.log(playLists)
}


function addSong(e) {

    if (sName.value === '' || link.value === '') {
        console.log('RETURNING!');
        console.log(sName.value);
        console.log(sLink.value);
        return;
    }
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(sName.value));

    // Create new link element
    const dLink = document.createElement('a');
    // Add class
    dLink.className = 'delete-item secondary-content';
    // Add icon html
    dLink.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(dLink);
    if (sName.value !== '') {
        songList.appendChild(li);
    }
    //Store in LS
    const SplitUrl = URL()
    storeSongInLocalStorage(sName.value, SplitUrl);
    //Clear Input
    sName.value = '';
    e.preventDefault();
}

function storeSongInLocalStorage(playList, eUrl) {
    let playLists;
    if (localStorage.getItem('playLists') === null) {
        playLists = [];
    } else {

        playLists = JSON.parse(localStorage.getItem('playLists'));
    }
    playLists.push({ name: playList, url: eUrl });
    localStorage.setItem('playLists', JSON.stringify(playLists));
}
// When Click on songname video is played
function clickSong(e) {
    if (e.target.classList.contains('collection-item')) {
        console.log(e.target);
        var Song = e.target.textContent;
        const allSongs = JSON.parse(localStorage.getItem('playLists'));
        console.log(allSongs);
        const songIndex = allSongs.findIndex((songElement) => songElement.name === Song);
        console.log(Song, songIndex, allSongs[songIndex].url);
        document.getElementById('input-video').src = allSongs[songIndex].url;
        localStorage.setItem(
            'last_clicked', allSongs[songIndex].url
        );

    }
}
// Remove song when click on icon
function removeSong(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeSongFromLocalStorage(e.target.parentElement.parentElement);
            localStorage.setItem
        }
    }
}
// Remove from LS
const removeSongFromLocalStorage = async(playListItem) => {
    let updatedPlaylists = await localStorage.getItem("playLists");
    console.log("updatedPlaylist >>>> 157", { updatedPlaylists })
    updatedPlaylists = JSON.parse(updatedPlaylists).filter(({ name }) => name !== playListItem.outerText);
    console.log("updatedPlaylist >>>> 159", { updatedPlaylists, playListItem: playListItem.outerText })

    localStorage.setItem('playLists', JSON.stringify(updatedPlaylists))
        // todo

}