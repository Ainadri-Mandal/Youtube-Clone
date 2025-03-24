
const api_key = "AIzaSyA9tjlgj15UHu0BwDBg2MjhCfVwcZRnPTk";
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
let snippet = []; // Array to store video data

// Function to fetch and store videos
const fetchVideos = async () => {
    try {
        const response = await fetch(video_http + new URLSearchParams({
            key: api_key,
            part: "snippet",
            chart: "mostPopular",
            maxResults: 20, // Adjust the number of videos to fetch
            regionCode: "IN"
        }));

        // Check if response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("YouTube API Data:", data);

        // Store the snippet data globally
        snippet = data.items.map(item => item.snippet);
        console.log("Stored Snippet Data:", snippet);

        // Call function to display videos
        displayVideos(snippet);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to display videos on the webpage
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("ytvideo");

    videoContainer.innerHTML = ""; // Clear existing content

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video");

        videoElement.innerHTML = `
            <img src="${video.thumbnails.medium.url}" class="thumbnail" alt="${video.title}">
            <div class="content">
                <img src="img/profile-pic.jpg" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${video.title}</h4>
                    <p class="channel-name">${video.channelTitle}</p>
                </div>
            </div>
        `;

        videoContainer.appendChild(videoElement);
    });
};

// Call the function to fetch and display videos
fetchVideos();
