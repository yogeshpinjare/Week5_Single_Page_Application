
// ======================================
// TRAVEL EXPLORER - SINGLE PAGE APP
// ======================================

const app = document.getElementById("app");
const navLinks = document.getElementById("nav-links");
const menuButton = document.getElementById("menu-btn");

// DESTINATION DATA

const destinations = [
    {
        name: "Italian Coast",
        description: "Explore beautiful coastal villages and amazing sea views.",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&q=75"
    },
    {
        name: "Kyoto, Japan",
        description: "Discover Japanese culture, temples and peaceful gardens.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=75"
    },
    {
        name: "Tropical Islands",
        description: "Enjoy relaxing beaches and clear blue water.",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=75"
    }
];


// ======================================
// HOME PAGE
// ======================================

function homePage() {

    return `
        <div class="page-content">

            <section class="hero">

                <div>
                    <p class="tagline">
                        YOUR NEXT ADVENTURE STARTS HERE
                    </p>

                    <h1>
                        Explore the World,
                        <span>Your Way.</span>
                    </h1>

                    <p>
                        Discover beautiful destinations,
                        explore new cultures and create memories.
                    </p>

                    <a href="#/destinations" class="btn">
                        Explore Destinations
                    </a>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=75"
                    alt="Beautiful mountain landscape"
                >

            </section>

            <section class="section">

                <h2>Welcome to Travel Explorer</h2>

                <p class="section-intro">
                    Your journey to amazing places begins here.
                </p>

                <a href="#/about" class="btn">
                    Learn More
                </a>

            </section>

        </div>
    `;
}


// ======================================
// DESTINATIONS PAGE
// ======================================

function destinationsPage() {

    const cards = destinations.map((place, index) => {

        return `
            <article class="card">

                <img
                    src="${place.image}"
                    alt="${place.name}"
                    loading="lazy"
                >

                <div class="card-content">

                    <h3>${place.name}</h3>

                    <p>${place.description}</p>

                    <button
                        class="btn"
                        data-place="${index}">
                        Explore
                    </button>

                </div>

            </article>
        `;

    }).join("");

    return `
        <div class="page-content">

            <section class="section">

                <h2>Popular Destinations</h2>

                <p class="section-intro">
                    Choose your favourite travel destination.
                </p>

                <div class="destination-grid">
                    ${cards}
                </div>

                <p id="destination-message"
                   aria-live="polite"></p>

            </section>

        </div>
    `;
}


// ======================================
// ABOUT PAGE
// ======================================

function aboutPage() {

    return `
        <div class="page-content">

            <section class="section">

                <h2>About Travel Explorer</h2>

                <div class="about-box">

                    <p>
                        Travel Explorer is a travel discovery
                        website designed to help people explore
                        beautiful destinations around the world.
                    </p>

                    <p>
                        Our goal is to make travel discovery
                        simple, enjoyable and accessible.
                    </p>

                </div>

                <div class="features">

                    <div class="feature">
                        <h3>Explore</h3>
                        <p>Discover amazing destinations.</p>
                    </div>

                    <div class="feature">
                        <h3>Discover</h3>
                        <p>Learn about new cultures.</p>
                    </div>

                    <div class="feature">
                        <h3>Enjoy</h3>
                        <p>Create unforgettable memories.</p>
                    </div>

                </div>

            </section>

        </div>
    `;
}


// ======================================
// CONTACT PAGE
// ======================================

function contactPage() {

    return `
        <div class="page-content">

            <section class="section">

                <h2>Contact Us</h2>

                <p class="section-intro">
                    Have a question? Send us a message.
                </p>

                <form class="contact-form" id="contact-form">

                    <label for="name">Your Name</label>

                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="Enter your name"
                    >

                    <label for="email">Your Email</label>

                    <input
                        type="email"
                        id="email"
                        required
                        placeholder="Enter your email"
                    >

                    <label for="message">Your Message</label>

                    <textarea
                        id="message"
                        required
                        placeholder="Write your message">
                    </textarea>

                    <button type="submit" class="btn">
                        Send Message
                    </button>

                    <p id="form-message"
                       role="status"
                       aria-live="polite"></p>

                </form>

            </section>

        </div>
    `;
}


// ======================================
// 404 PAGE
// ======================================

function notFoundPage() {

    return `
        <section class="not-found">

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>The page you are looking for does not exist.</p>

            <br>

            <a href="#/" class="btn">Go to Home</a>

        </section>
    `;
}


// ======================================
// SPA ROUTER
// ======================================

function renderPage() {

    const route = location.hash.slice(1) || "/";

    const routes = {
        "/": homePage,
        "/destinations": destinationsPage,
        "/about": aboutPage,
        "/contact": contactPage
    };

    const page = routes[route];

    app.innerHTML = page ? page() : notFoundPage();

    // Update active navigation link

    navLinks.querySelectorAll("a").forEach(link => {

        const linkRoute = link.getAttribute("href").slice(1);

        if (linkRoute === route) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });

    // Close mobile navigation

    navLinks.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";

    // Scroll to top after navigation

    window.scrollTo(0, 0);

}


// ======================================
// BROWSER HISTORY / ROUTE CHANGES
// ======================================

// Render page when URL hash changes

window.addEventListener("hashchange", renderPage);

// Handle mobile menu

menuButton.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";

});


// ======================================
// DYNAMIC BUTTON INTERACTION
// ======================================

app.addEventListener("click", function(event) {

    const button = event.target.closest("[data-place]");

    if (!button) return;

    const index = Number(button.dataset.place);

    const selectedPlace = destinations[index];

    const output = document.getElementById("destination-message");

    if (selectedPlace && output) {

        output.textContent =
            "You selected " + selectedPlace.name + "! Happy travelling.";

    }

});


// ======================================
// CONTACT FORM VALIDATION
// ======================================

app.addEventListener("submit", function(event) {

    if (event.target.id !== "contact-form") return;

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    const output = document.getElementById("form-message");

    if (!name || !email || !message) {

        output.textContent = "Please fill in all fields.";

        return;

    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        output.textContent = "Please enter a valid email.";

        return;

    }

    output.textContent =
        "Thank you, " + name + "! Your message has been validated.";

    event.target.reset();

});


// ======================================
// INITIAL PAGE LOAD
// ======================================

renderPage();
