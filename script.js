
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let debounceTimeout;

// Function to fetch data dynamically
const fetchCharacters = async (query) => {
  const API_URL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=83208ce86db45aae1eb14c67d2ed8543&hash=e1f6729a29bb880204d0a7da231f0a6b`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data.results.map(result => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const img = card.querySelector("[data-img]");
      const favoriteButton = document.createElement("button");

      header.textContent = result.name;
      body.textContent = `ID: ${result.id}`;
      img.src = `${result.thumbnail.path}.${result.thumbnail.extension}`;

      // Add favorite button
      favoriteButton.textContent = "Add to Favorites";
      favoriteButton.classList.add("btn", "btn-primary", "mt-2");

      // Favorite button click event
      favoriteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const characterDetails = {
          name: result.name,
          description: result.description || "No description available.",
          image: `${result.thumbnail.path}.${result.thumbnail.extension}`,
        };

        if (favorites.some(fav => fav.name === characterDetails.name)) {
          alert(`${result.name} is already in your favorites!`);
        } else {
          favorites.push(characterDetails);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert(`${result.name} has been added to your favorites!`);
        }
      });

      card.appendChild(favoriteButton);

      // Card click event
      card.addEventListener("click", () => {
        const characterDetails = {
          name: result.name,
          description: result.description || "No description available.",
          image: `${result.thumbnail.path}.${result.thumbnail.extension}`,
          // comics: result.comics,
          // series: result.series,
          // stories: result.stories,

          comics: {
                    available: result.comics?.available || 0,
                    collectionURI: result.comics?.collectionURI || "N/A",
                    items: Array.isArray(result.comics?.items)
                      ? result.comics.items.map(item => ({
                          resourceURI: item.resourceURI,
                          name: item.name,
                        }))
                      : [],
                    returned: result.comics?.returned || 0,
                  },

                  
                  series: {
                    available: result.series?.available || 0,
                    collectionURI: result.series?.collectionURI || "N/A",
                    items: Array.isArray(result.series?.items)
                      ? result.series.items.map(item => ({
                          resourceURI: item.resourceURI,
                          name: item.name,
                        }))
                      : [],
                    returned: result.series?.returned || 0,
                  },

                  
                  stories: {
                    available: result.stories?.available || 0,
                    collectionURI: result.stories?.collectionURI || "N/A",
                    items: Array.isArray(result.stories?.items)
                      ? result.stories.items.map(item => ({
                          resourceURI: item.resourceURI,
                          name: item.name,
                        }))
                      : [],
                    returned: result.stories?.returned || 0,
                  },

        };
        sessionStorage.setItem("characterDetails", JSON.stringify(characterDetails));
        window.location.href = "character-details.html";
      });

      return { name: result.name, id: result.id, element: card };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    userCardContainer.innerHTML = "<p>Error loading characters. Please try again later.</p>";
    return [];
  }
};



// Input event listener with debouncing
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    if (query === "") {
      userCardContainer.innerHTML = ""; // Clear the container if the input is empty
      return;
    }

    userCardContainer.innerHTML = "<p>Loading...</p>"; // Show loading indicator

    const results = await fetchCharacters(query);
    userCardContainer.innerHTML = ""; // Clear the container

    if (results.length > 0) {
      results.forEach(result => userCardContainer.appendChild(result.element));
    } else {
      userCardContainer.innerHTML = "<p>No matching characters found.</p>";
    }
  }, 300); // Adjust debounce delay as needed
});


































































































const marvel ={
    render:()=>{
        // 1a536dca379964676f5a848763bd6a86af21b257c83208ce86db45aae1eb14c67d2ed8543


        const urlAPI ='https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=83208ce86db45aae1eb14c67d2ed8543&hash=e1f6729a29bb880204d0a7da231f0a6b';
        const container = document.querySelector('#marvel-row');
        let contentHTML ='';

        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {
               for(const hero of json.data.results){
                 let urlHero = hero.urls[0].url;
                 contentHTML+= `
                            <div class="col-md-4">
                               <a href="${hero}" target="_blank">
                                   <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                               </a>

                               <h3 class = "title"> ${hero.name}</h3>
                            </div>`;

               }
               container.innerHTML= contentHTML;
            })
    }
};
marvel.render();




















  
// // Import a library like crypto-js to create the MD5 hash (optional for Node.js)
// // For browsers, you can use a library like js-md5 or create the hash manually.

// async function fetchMarvelData() {
//     // Marvel API Keys
//     const publicKey = '83208ce86db45aae1eb14c67d2ed8543';  // Replace with your public key
//     const privateKey = 'a536dca379964676f5a848763bd6a86af21b257c'; // Replace with your private key
//     const baseUrl = 'https://gateway.marvel.com/v1/public/characters'; // Example endpoint
    
//     // Create timestamp and hash
//     const ts = new Date().getTime(); // Current timestamp
//     const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Using crypto-js for hash
    
//     // Construct the URL with authentication params
//     const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  
//     try {
//       // Make the API request
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       // Parse the JSON data
//       const data = await response.json();
//       console.log(data); // Inspect the data returned by the API
//     } catch (error) {
//       console.error('Error fetching Marvel API:', error);
//     }
//   }
  
//   // Example usage
//   fetchMarvelData();
  


















// search bar---------------------------------------------------------


// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-cards-container]")
// const searchInput = document.querySelector("[data-search]")

// let users = []


// searchInput.addEventListener("input", e => {
//      const value = e.target.value.toLowerCase()
//     //  console.log(users)
//      users.forEach(user => {
//         const isVisible = 
//                             user.name.toLowerCase().includes(value) || 
//                             user.email.toLowerCase().includes(value)
//         user.element.classList.toggle("hide", !isVisible)
        
//      })
// })


// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json())
//     .then(data => {
//         users = data.map(user => {
//             const card = userCardTemplate.content.cloneNode(true).children[0]
//             const header = card.querySelector("[data-header]")
//             const body = card.querySelector("[data-body]")

//             header.textContent = user.name
//             body.textContent = user.email
        
            
//             userCardContainer.append(card)
//             return {name:user.name, email: user.email, element: card}
//        })
//     })
