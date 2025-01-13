const YOUTUBE_API_KEY = 'AIzaSyCuvTNSA1VOP5qqV8lsGQgL6UZ0J3n519Y';
const STEAM_API_KEY = '03255683DC1E97F3F922A799825DD70A';
const YOUTUBE_CHANNEL_ID = 'UCwHhG7pJz4X-2L7ZlF_7_nQ';
const STEAM_PROFILE_ID = '76561198984155490';

// Fetch latest YouTube videos
async function fetchYouTubeVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`);
    const data = await response.json();
    const videos = data.items;

    const youtubeContainer = document.getElementById('youtube-videos');
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
        `;
        youtubeContainer.appendChild(videoElement);
    });
}

// Fetch Steam stats
async function fetchSteamStats() {
    const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_PROFILE_ID}&format=json`);
    const data = await response.json();
    const games = data.response.games;

    const steamContainer = document.getElementById('steam-stats');
    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.innerHTML = `
            <p>App ID: ${game.appid} - Игровое время: ${game.playtime_forever} минут</p>
        `;
        steamContainer.appendChild(gameElement);
    });
}

// Initialize
fetchYouTubeVideos();
fetchSteamStats();
