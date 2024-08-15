document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-container');
    const videoList = document.getElementById('videoList');

    // Initialize IndexedDB
    const dbRequest = indexedDB.open('videoDatabase', 1);

    dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('videos')) {
            db.createObjectStore('videos', { autoIncrement: true });
        }
    };

    dbRequest.onsuccess = (event) => {
        console.log('Database opened successfully');
    };

    dbRequest.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
    };

    function saveVideoMetadata(video) {
        const dbRequest = indexedDB.open('videoDatabase', 1);

        dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['videos'], 'readwrite');
            const objectStore = transaction.objectStore('videos');
            const request = objectStore.add(video);

            request.onsuccess = () => {
                console.log('Video metadata saved successfully');
            };

            request.onerror = (event) => {
                console.error('Error saving video metadata:', event.target.errorCode);
            };
        };
    }

    function getVideos(callback) {
        const dbRequest = indexedDB.open('videoDatabase', 1);

        dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['videos'], 'readonly');
            const objectStore = transaction.objectStore('videos');
            const request = objectStore.getAll();

            request.onsuccess = () => {
                callback(request.result);
            };

            request.onerror = (event) => {
                console.error('Error retrieving videos:', event.target.errorCode);
            };
        };
    }

    function deleteVideo(id, callback) {
        const dbRequest = indexedDB.open('videoDatabase', 1);

        dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['videos'], 'readwrite');
            const objectStore = transaction.objectStore('videos');
            const request = objectStore.delete(id);

            request.onsuccess = () => {
                console.log('Video deleted successfully');
                callback();
            };

            request.onerror = (event) => {
                console.error('Error deleting video:', event.target.errorCode);
            };
        };
    }

    function displayVideos() {
        getVideos(videos => {
            if (!videoContainer) return; // Check if videoContainer exists
            videoContainer.innerHTML = '';
            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');

                const videoElement = document.createElement('video');
                videoElement.src = video.url; // Data URL
                videoElement.controls = true;

                const titleElement = document.createElement('h3');
                titleElement.textContent = video.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = video.description;

                videoItem.appendChild(videoElement);
                videoItem.appendChild(titleElement);
                videoItem.appendChild(descriptionElement);

                videoContainer.appendChild(videoItem);
            });
        });
    }

    function displayManagePage() {
        if (!videoList) return; // Check if videoList exists
        getVideos(videos => {
            videoList.innerHTML = '';
            videos.forEach((video, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = video.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() {
                    deleteVideo(index, () => {
                        displayManagePage(); // Update manage page
                        displayVideos(); // Update home page
                    });
                };

                listItem.appendChild(deleteButton);
                videoList.appendChild(listItem);
            });
        });
    }

    window.uploadVideo = function() {
        const videoUpload = document.getElementById('videoUpload');
        const videoTitle = document.getElementById('videoTitle').value;
        const videoDescription = document.getElementById('videoDescription').value;

        if (videoUpload.files.length === 0) {
            alert('Please select a video to upload.');
            return;
        }

        const file = videoUpload.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const videoURL = e.target.result;

            const video = {
                url: videoURL,
                title: videoTitle,
                description: videoDescription
            };

            saveVideoMetadata(video);

            alert('Video uploaded successfully.');

            // Clear inputs
            videoUpload.value = '';
            document.getElementById('videoTitle').value = '';
            document.getElementById('videoDescription').value = '';

            // Redirect to home page
            window.location.href = 'doctor_dashboard.html';
        };
        
        reader.readAsDataURL(file);
    };

    function searchVideos() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const videoItems = document.querySelectorAll('.video-item');

        videoItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchInput) || description.includes(searchInput)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Initialize pages
    if (window.location.pathname.endsWith('patient_medtube.html')) {
        displayVideos();
    }

    if (window.location.pathname.endsWith('manage.html')) {
        displayManagePage();
    }

    // Expose search function to global scope
    window.searchVideos = searchVideos;
});
