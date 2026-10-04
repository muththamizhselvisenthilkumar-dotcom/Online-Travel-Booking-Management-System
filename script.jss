```javascript
// ========================================
// ONLINE TRAVEL BOOKING SYSTEM
// ========================================


// DESTINATION DATA

const destinations = [

    {
        id: 1,
        name: "Goa",
        location: "India",
        type: "Beach",
        price: 8500,
        icon: "🏖️"
    },

    {
        id: 2,
        name: "Manali",
        location: "Himachal Pradesh",
        type: "Mountain",
        price: 10500,
        icon: "🏔️"
    },

    {
        id: 3,
        name: "Paris",
        location: "France",
        type: "City",
        price: 65000,
        icon: "🗼"
    },

    {
        id: 4,
        name: "Jaipur",
        location: "Rajasthan",
        type: "Heritage",
        price: 9000,
        icon: "🏰"
    },

    {
        id: 5,
        name: "Ooty",
        location: "Tamil Nadu",
        type: "Mountain",
        price: 6500,
        icon: "🌄"
    },

    {
        id: 6,
        name: "Dubai",
        location: "UAE",
        type: "City",
        price: 42000,
        icon: "🏙️"
    },

    {
        id: 7,
        name: "Kerala",
        location: "India",
        type: "Beach",
        price: 7500,
        icon: "🌴"
    },

    {
        id: 8,
        name: "Agra",
        location: "Uttar Pradesh",
        type: "Heritage",
        price: 7000,
        icon: "🕌"
    },

    {
        id: 9,
        name: "Ladakh",
        location: "India",
        type: "Mountain",
        price: 12500,
        icon: "🏔️"
    }

];


// BOOKINGS

let bookings =
    JSON.parse(
        localStorage.getItem(
            "travelBookings"
        )
    ) || [];


// CURRENT BOOKING ITEM

let selectedItem = null;


// ========================================
// LOGIN
// ========================================

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const user =
                document
                    .getElementById("userId")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            if (
                user === "TRAVEL001" &&
                password === "1234"
            ) {

                document
                    .getElementById("loginPage")
                    .classList.add("hidden");


                document
                    .getElementById("app")
                    .classList.remove("hidden");


                initialize();

            } else {

                alert(
                    "Invalid Login!\n\n" +
                    "User ID: TRAVEL001\n" +
                    "Password: 1234"
                );

            }

        }
    );


// ========================================
// INITIALIZE
// ========================================

function initialize() {

    updateDate();

    renderDestinations();

    renderPopularDestinations();

    renderBookings();

    updateStatistics();

}


// ========================================
// DATE
// ========================================

function updateDate() {

    const date = new Date();


    document
        .getElementById("currentDate")
        .innerText =
        date.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


// ========================================
// NAVIGATION
// ========================================

function showPage(
    pageId,
    button = null
) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .getElementById(pageId)
        .classList.add(
            "active-page"
        );


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const titles = {

        home: "Dashboard",

        destinations:
            "Destinations",

        flights:
            "Flight Booking",

        hotels:
            "Hotel Booking",

        bookings:
            "My Bookings",

        profile:
            "My Profile"

    };


    document
        .getElementById("pageTitle")
        .innerText =
        titles[pageId];


    if (pageId === "bookings") {

        renderBookings();

    }

}


// ========================================
// DESTINATIONS
// ========================================

function renderDestinations(
    list = destinations
) {

    const container =
        document
            .getElementById(
                "destinationList"
            );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#888;
            ">

                No destinations found.

            </div>

        `;

        return;

    }


    list.forEach(destination => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "destination-card";


        card.innerHTML = `

            <div class="destination-image">

                ${destination.icon}

            </div>


            <div class="destination-content">

                <h3>
                    ${destination.name}
                </h3>

                <p>
                    📍 ${destination.location}
                </p>


                <div class="destination-info">

                    <span>
                        ${destination.type}
                    </span>

                    <span class="destination-price">
                        ₹${destination.price.toLocaleString("en-IN")}
                    </span>

                </div>


                <button
                    onclick="openDestinationBooking(
                        ${destination.id}
                    )">

                    Book Trip

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// POPULAR DESTINATIONS
// ========================================

function renderPopularDestinations() {

    const container =
        document
            .getElementById(
                "popularDestinations"
            );


    container.innerHTML = "";


    destinations
        .slice(0, 3)
        .forEach(destination => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "destination-card";


            card.innerHTML = `

                <div class="destination-image">

                    ${destination.icon}

                </div>


                <div class="destination-content">

                    <h3>
                        ${destination.name}
                    </h3>

                    <p>
                        📍 ${destination.location}
                    </p>


                    <div class="destination-info">

                        <span>
                            ${destination.type}
                        </span>

                        <span class="destination-price">
                            ₹${destination.price.toLocaleString("en-IN")}
                        </span>

                    </div>


                    <button
                        onclick="openDestinationBooking(
                            ${destination.id}
                        )">

                        Book Trip

                    </button>

                </div>

            `;


            container.appendChild(card);

        });

}


// ========================================
// FILTER DESTINATIONS
// ========================================

function filterDestinations() {

    const search =
        document
            .getElementById(
                "destinationSearch"
            )
            .value
            .toLowerCase();


    const type =
        document
            .getElementById(
                "destinationType"
            )
            .value;


    const filtered =
        destinations.filter(
            destination => {

                const matchName =
                    destination.name
                        .toLowerCase()
                        .includes(search);


                const matchType =
                    type === "All" ||
                    destination.type === type;


                return (
                    matchName &&
                    matchType
                );

            }
        );


    renderDestinations(filtered);

}


// ========================================
// DESTINATION BOOKING
// ========================================

function openDestinationBooking(id) {

    selectedItem =
        destinations.find(
            destination =>
                destination.id === id
        );


    if (!selectedItem) {
        return;
    }


    document
        .getElementById(
            "bookingModal"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "modalIcon"
        )
        .innerText =
        selectedItem.icon;


    document
        .getElementById(
            "modalTitle"
        )
        .innerText =
        "Book " +
        selectedItem.name;


    document
        .getElementById(
            "modalDescription"
        )
        .innerText =
        selectedItem.location +
        " • " +
        selectedItem.type;


    document
        .getElementById(
            "bookingDate"
        )
        .value = "";


    document
        .getElementById(
            "travellerCount"
        )
        .value = 1;


    document
        .getElementById(
            "modalPrice"
        )
        .innerText =
        "₹" +
        selectedItem.price.toLocaleString(
            "en-IN"
        );


    setMinimumDate();

}


// ========================================
// HOTEL BOOKING
// ========================================

function bookHotel(
    hotelName,
    price
) {

    selectedItem = {

        name: hotelName,

        price: price,

        icon: "🏨",

        type: "Hotel"

    };


    document
        .getElementById(
            "bookingModal"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "modalIcon"
        )
        .innerText =
        "🏨";


    document
        .getElementById(
            "modalTitle"
        )
        .innerText =
        hotelName;


    document
        .getElementById(
            "modalDescription"
        )
        .innerText =
        "Hotel Reservation";


    document
        .getElementById(
            "bookingDate"
        )
        .value = "";


    document
        .getElementById(
            "travellerCount"
        )
        .value = 1;


    document
        .getElementById(
            "modalPrice"
        )
        .innerText =
        "₹" +
        price.toLocaleString(
            "en-IN"
        );


    setMinimumDate();

}


// ========================================
// SET MINIMUM DATE
// ========================================

function setMinimumDate() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    document
        .getElementById(
            "bookingDate"
        )
        .min = today;

}


// ========================================
// TRAVELLER PRICE
// ========================================

document
    .getElementById(
        "travellerCount"
    )
    .addEventListener(
        "input",
        function() {

            if (!selectedItem) {
                return;
            }


            const count =
                Number(this.value);


            const total =
                selectedItem.price *
                count;


            document
                .getElementById(
                    "modalPrice"
                )
                .innerText =
                "₹" +
                total.toLocaleString(
                    "en-IN"
                );

        }
    );


// ========================================
// CONFIRM BOOKING
// ========================================

document
    .getElementById(
        "bookingForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const date =
                document
                    .getElementById(
                        "bookingDate"
                    )
                    .value;


            const travellers =
                Number(
                    document
                        .getElementById(
                            "travellerCount"
                        )
                        .value
                );


            if (!date) {

                showToast(
                    "Please select a travel date."
                );

                return;

            }


            const total =
                selectedItem.price *
                travellers;


            const booking = {

                id: Date.now(),

                name:
                    selectedItem.name,

                icon:
                    selectedItem.icon,

                date:
                    date,

                travellers:
                    travellers,

                total:
                    total,

                status:
                    "Confirmed"

            };


            bookings.unshift(
                booking
            );


            localStorage.setItem(
                "travelBookings",
                JSON.stringify(
                    bookings
                )
            );


            closeModal();

            renderBookings();

            updateStatistics();


            showToast(
                "Booking confirmed successfully! ✈️"
            );

        }
    );


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    document
        .getElementById(
            "bookingModal"
        )
        .classList.add(
            "hidden"
        );

}


// ========================================
// FLIGHT SEARCH
// ========================================

function searchFlights() {

    const from =
        document
            .getElementById(
                "fromCity"
            )
            .value
            .trim();


    const to =
        document
            .getElementById(
                "toCity"
            )
            .value
            .trim();


    const date =
        document
            .getElementById(
                "flightDate"
            )
            .value;


    const passengers =
        Number(
            document
                .getElementById(
                    "passengers"
                )
                .value
        );


    if (!from || !to || !date) {

        showToast(
            "Please enter all flight details."
        );

        return;

    }


    const airlines = [

        {
            name: "Air India",
            time: "06:30 AM",
            price: 5200
        },

        {
            name: "IndiGo",
            time: "10:45 AM",
            price: 4800
        },

        {
            name: "Vistara",
            time: "03:20 PM",
            price: 6100
        }

    ];


    const container =
        document
            .getElementById(
                "flightResults"
            );


    container.innerHTML =
        `<h3 style="margin-bottom:15px">
            Available Flights
        </h3>`;


    airlines.forEach(flight => {

        const total =
            flight.price *
            passengers;


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "flight-card";


        card.innerHTML = `

            <div class="flight-info">

                <h3>
                    ✈️ ${flight.name}
                </h3>

                <p>
                    ${from} → ${to}
                </p>

                <p>
                    🕐 ${flight.time}
                </p>

                <p>
                    📅 ${formatDate(date)}
                </p>

            </div>


            <div class="flight-price">

                <small>
                    ${passengers} passenger(s)
                </small>

                <h2>
                    ₹${total.toLocaleString("en-IN")}
                </h2>

                <button
                    onclick="bookFlight(
                        '${flight.name}',
                        '${from}',
                        '${to}',
                        '${date}',
                        ${total}
                    )">

                    Book Flight

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// BOOK FLIGHT
// ========================================

function bookFlight(
    airline,
    from,
    to,
    date,
    total
) {

    const booking = {

        id: Date.now(),

        name:
            airline +
            " Flight",

        icon:
            "✈️",

        date:
            date,

        travellers:
            Number(
                document
                    .getElementById(
                        "passengers"
                    )
                    .value
            ),

        total:
            total,

        route:
            from +
            " → " +
            to,

        status:
            "Confirmed"

    };


    bookings.unshift(
        booking
    );


    localStorage.setItem(
        "travelBookings",
        JSON.stringify(
            bookings
        )
    );


    renderBookings();

    updateStatistics();


    showToast(
        "Flight booked successfully! ✈️"
    );

}


// ========================================
// RENDER BOOKINGS
// ========================================

function renderBookings() {

    const container =
        document
            .getElementById(
                "bookingList"
            );


    container.innerHTML = "";


    if (bookings.length === 0) {

        container.innerHTML = `

            <div style="
                background:white;
                padding:50px;
                text-align:center;
                border-radius:15px;
                color:#888;
            ">

                <div style="
                    font-size:50px;
                ">
                    ✈️
                </div>

                <h3>
                    No bookings yet
                </h3>

                <p>
                    Start planning your next trip!
                </p>

            </div>

        `;

        return;

    }


    bookings.forEach(booking => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "booking-card";


        card.innerHTML = `

            <div class="booking-left">

                <div class="booking-icon">

                    ${booking.icon}

                </div>


                <div class="booking-details">

                    <h3>
                        ${booking.name}
                    </h3>

                    ${
                        booking.route
                        ?
                        `<p>
                            🛫 ${booking.route}
                        </p>`
                        :
                        ""
                    }

                    <p>
                        📅
                        ${formatDate(
                            booking.date
                        )}
                    </p>

                    <p>
                        👥
                        ${booking.travellers}
                        Traveller(s)
                    </p>

                    <p>
                        🟢
                        ${booking.status}
                    </p>

                </div>

            </div>


            <div class="booking-price">

                <small>
                    Total Amount
                </small>

                <h2>
                    ₹${booking.total.toLocaleString("en-IN")}
                </h2>

                <button
                    class="cancel-btn"
                    onclick="cancelBooking(
                        ${booking.id}
                    )">

                    Cancel

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// CANCEL BOOKING
// ========================================

function cancelBooking(id) {

    const confirmation =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmation) {
        return;
    }


    bookings =
        bookings.filter(
            booking =>
                booking.id !== id
        );


    localStorage.setItem(
        "travelBookings",
        JSON.stringify(
            bookings
        )
    );


    renderBookings();

    updateStatistics();


    showToast(
        "Booking cancelled successfully."
    );

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics() {

    const count =
        bookings.length;


    document
        .getElementById(
            "dashboardBookings"
        )
        .innerText =
        count;


    document
        .getElementById(
            "bookingCount"
        )
        .innerText =
        count;


    document
        .getElementById(
            "profileBookings"
        )
        .innerText =
        count;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(
    dateString
) {

    return new Date(
        dateString
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// TOAST
// ========================================

function showToast(message) {

    const toast =
        document
            .getElementById(
                "toast"
            );


    toast.innerText =
        message;


    toast.style.display =
        "block";


    setTimeout(
        function() {

            toast.style.display =
                "none";

        },
        3000
    );

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    document
        .getElementById(
            "app"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "loginPage"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "loginForm"
        )
        .reset();

}
```
