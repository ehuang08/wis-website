
/*
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})
*/


//test calender: googleCalendarId: 'ed1a0dc749cd8f5be31fe2e72606fe5a46321f3e0c8671f0361c504d19fd2f38@group.calendar.google.com'
//real calendar: googleCalendarId: 'dfac00fa816c1db1e9e3363bb1ee8af7159ba8ee4c6eb711ae21d3f7eef8dde0@group.calendar.google.com' 

//adding the actual calendar 
const API_KEY = "AIzaSyBWXY7wclp0Gfw4cQY1CCRaY530LrcRUqg"; 

//making the filters actually filter through the events
const activeFilters = {
  type: "all",
  committee: "all"
};

//button listeners, so each button is linked to an action
document.querySelectorAll(".filter-option").forEach (btn => {
  btn.addEventListener("click", () => {
    //which filter
    const group = btn.dataset.filterGroup;
    //which choice in the filter
    const value = btn.dataset.filterVal;

    activeFilters[group] = value;

    if (window.clubCalendar) {
      window.clubCalendar.refetchEvents();
    }
  });
});

// calendar loading
document.addEventListener('DOMContentLoaded', function () { 
  const calendarEl = document.getElementById('club-calendar'); 

const calendar = new FullCalendar.Calendar(calendarEl, { 
  initialView: 'dayGridMonth', 
  googleCalendarApiKey: API_KEY,

  events: { 
    googleCalendarId: 'ed1a0dc749cd8f5be31fe2e72606fe5a46321f3e0c8671f0361c504d19fd2f38@group.calendar.google.com'
  },

  headerToolbar: { 
    left: 'prev,next today', 
    center: 'title', 
    right: 'dayGridMonth,timeGridWeek,timeGridDay' 
  },

  //needed to use AI here, was very lost on why it wasn't parsing correctly
  // apparently lots of hidden characters and wierd spaccing issues
eventDidMount(info) {
  const extended = info.event._def.extendedProps || {};
  info.event._def.extendedProps = extended;

  console.log("Og:", extended.description);

  if (extended.description) {
    let clean = extended.description
      .replace(/<\/?pre>/gi, "")
      .replace(/<br[^>]*>/gi, "\n")
      .replace(/\r/g, "")
      .trim();

    const lines = clean.split("\n");
    console.log("LINES:", lines);

    lines.forEach(line => {
      let trimmed = line.trim();

      let normalized = trimmed
        .replace(/\u200B/g, "")
        .replace(/\uFEFF/g, "")
        .replace(/\u00A0/g, " ");

      console.log("CHECK:", JSON.stringify(normalized));

      if (normalized.startsWith("Type:")) {
        info.el.dataset.type = normalized.replace("Type:", "").trim();
      }

      if (normalized.startsWith("Committee:")) {
        info.el.dataset.committee = normalized.replace("Committee:", "").trim();
      }
    });
  }

  console.log("PARSED:", info.el.dataset.type, info.el.dataset.committee);

  const eventType = info.el.dataset.type || "none";
  const eventCommittee = info.el.dataset.committee || "none";

  const typeMatch =
    activeFilters.type === "all" || activeFilters.type === eventType;

  const committeeMatch =
    activeFilters.committee === "all" || activeFilters.committee === eventCommittee;

  if (!typeMatch || !committeeMatch) {
    info.el.style.display = "none";
  }
}

});

    calendar.render(); 

    //save globablly for filters to reorganize and resrot events
    window.clubCalendar = calendar;
  }); 
  
function updateUpcomingCards(events) {
  
}

async function loadCalendarEvents() { 
  const response = await gapi.client.calendar.events.list({ 
    calendarId: "primary", 
    maxResults: 10, 
    singleEvents: true, 
    orderBy: "startTime" 
  }); 
  const events = response.result.items; 
  const container = document.getElementById("calendar"); 
  container.innerHTML = "<h2>Your Upcoming Events</h2>"; 
  events.forEach(event => { 
    const start = event.start.dateTime || event.start.date; 
    container.innerHTML += `<p>${start} — ${event.summary}</p>`; 
  }); 
}

// //added to dynamically fill in upcoming events section
// fetch('https://api.sheetbest.com/sheets/96fd77ef-7967-42e7-994f-dfbae7a94e47')
// .then(response => response.json())
// .then(data => {
//     const upcomingList = document.querySelector(".right-thing");
//     upcomingList.innerHTML = " ";
    
//     //pulling first 3 events
//     const topEvents = data.slice(0, 3);

//     topEvents.forEach(event => {
//       const li = document.createElement("li");
//       li.setAttribute("role", "listitem");

//       li.innerHTML = `
//         <div class="event-sub" tabindex="0" role="button">
//             <span class="event-title">${event.name}</span>
//             <span class="event-data">Date: ${event.date}</span>
//             <span class="event-location">Location: ${event.location}</span>
//         </div>
//       `;

//       // ARIA additions
//       const eventSub = li.querySelector(".event-sub");
//       eventSub.setAttribute("aria-haspopup", "dialog");
//       eventSub.setAttribute("aria-controls", "modal-overlay");
//       eventSub.setAttribute(
//         "aria-label",
//         `${event.name}, happening on ${event.date} at ${event.location}`
//       );

//       upcomingList.appendChild(li);
// });
// attachModalListener();

// })


function attachModalListener() {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.querySelector("#event-modal .event-title");
  const modalDate = document.querySelector("#event-modal .event-data");
  const modalLocation = document.querySelector("#event-modal .event-location");
  const closeBtn = document.getElementById("close-btn");
  closeBtn.setAttribute("aria-label", "Close event details");


  document.querySelectorAll(".event-sub").forEach(eventItem => {
    eventItem.addEventListener("click", () => {
      modalTitle.textContent = eventItem.querySelector(".event-title").textContent;
      modalDate.textContent = eventItem.querySelector(".event-data").textContent;
      modalLocation.textContent = eventItem.querySelector(".event-location").textContent;

      modalOverlay.style.display = "flex";
      modalOverlay.setAttribute("aria-hidden", "false");
      closeBtn.focus();
    });

    eventItem.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        eventItem.click();
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    modalOverlay.setAttribute("aria-hidden", "true");
  });
  
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modalOverlay.style.display = "none";
      modalOverlay.setAttribute("aria-hidden", "true");
    }
  });

  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
      modalOverlay.setAttribute("aria-hidden", "true");
    }
  });
}

const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

/*adding new objects*/
const navItems = menuLinks.querySelectorAll('a, button');
//const closeBtn = document.getElementById('close-btn');
//closeBtn.setAttribute("aria-label", "Close event details");

// const events = document.querySelectorAll('.event-sub');
// const modalOverlay = document.getElementById('modal-overlay');
// const modal = document.getElementById('event-modal');

/*MENU SECTION*/
function openMenu() {
    mobileMenu.classList.add('open');
    menuLinks.classList.add('active');
    menuLinks.setAttribute('aria-expanded', true);

    menuLinks.setAttribute('aria-hidden', false);
    navItems.forEach(item => item.setAttribute('tabindex', '0'));
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    menuLinks.classList.remove('active');
    menuLinks.setAttribute('aria-expanded', false);

    menuLinks.setAttribute('aria-hidden', true);
    navItems.forEach(item => item.setAttribute('tabindex', '-1'));
}

mobileMenu.addEventListener('click', () => {
    if(menuLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

mobileMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (menuLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuLinks.classList.contains('active')) {
    closeMenu();
    mobileMenu.focus(); // return focus to toggle button
  }
});


// /*MODAL SECTION*/

// /*keep? YES*/
// //opens modal
// function openModal() {
//     modalOverlay.style.display = 'flex';
//     modalOverlay.setAttribute('aria-hidden', 'false');
//     closeBtn.focus();
//     trapFocus(modal);
// }

// /* adding aria label for screen readers*/
// function closeModal() {
//     modalOverlay.style.display = 'none';
//     modalOverlay.setAttribute('aria-hidden', 'true');
// }

// events.forEach(eventItem => {
//     eventItem.setAttribute('tabindex', '0');
//     eventItem.setAttribute('role', 'button');
//     eventItem.addEventListener('click', openModal);

//     eventItem.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             openModal();
//         }
//     });
// });

// closeBtn.addEventListener('click', closeModal);


// /*Escape button implementation*/ 
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//         closeModal();
//     }
// });

//got help from AI --> traps selecting ability into modal when open instead of having to navigate through all options
function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// document.querySelectorAll('.event-sub').forEach(eventItem => {
//     eventItem.addEventListener('click', () => {
//         document.getElementById('modal-overlay').style.display = 'flex';
//     });
// });

// document.getElementById('close-btn').addEventListener('click', () => {
//     document.getElementById('modal-overlay').style.display = 'none';
// });


// eventSubs.forEach(eventItem => {
//     eventItem.addEventListener('click', openModal);
//     eventItem.setAttribute('tabindex', '0');
//     eventItem.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             openModal();
//         }
//     });
// });


/*

*/

