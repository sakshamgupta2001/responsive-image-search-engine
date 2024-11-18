const accesskey = "72jbhNt1ZTWt4jx2ebks1JQJnqUuTGkHkqHbi93yVpU";

const searchFrom = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searckImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
    
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.style.position = "relative";

        // Create download button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.style.position = "absolute";
        downloadButton.style.bottom = "10px";
        downloadButton.style.left = "10px";
        downloadButton.style.backgroundColor = "#FF6500";
        downloadButton.style.color = "white";
        downloadButton.style.border = "none";
        downloadButton.style.padding = "8px 12px";
        downloadButton.style.borderRadius = "5px";
        downloadButton.style.cursor = "pointer";
        downloadButton.style.display = "none";

        // Show button on hover
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.display = "inline-block";
        container.style.width = "100%";
        container.style.height = "230px"; 
        container.style.overflow = "hidden";

        container.addEventListener("mouseover", () => {
            downloadButton.style.display = "block";
        });
        container.addEventListener("mouseout", () => {
            downloadButton.style.display = "none";
        });

        // Add click event to download the image
        downloadButton.addEventListener("click", async () => {
            const imageResponse = await fetch(result.urls.full);
            const imageBlob = await imageResponse.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            const link = document.createElement("a");
            link.href = imageURL;
            link.download = `${keyword}`; // Set the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(imageURL);
        });

        // Append the image & btn to the container
        container.appendChild(image);
        container.appendChild(downloadButton);

        // Append the container to the search results
        searchResult.appendChild(container);
    });

    showMore.style.display = "block";
}

searchFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searckImages();
});

showMore.addEventListener("click", () => {
    page++;
    searckImages();
});