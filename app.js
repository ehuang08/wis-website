
/*
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})
*/
//adding the actual calendar 
const API_KEY = "AIzaSyBWXY7wclp0Gfw4cQY1CCRaY530LrcRUqg"; 
document.addEventListener('DOMContentLoaded', function () { 
  const calendarEl = document.getElementById('club-calendar'); 
  const calendar = new FullCalendar.Calendar(calendarEl, { 
    initialView: 'dayGridMonth', 
    googleCalendarApiKey: 'AIzaSyBWXY7wclp0Gfw4cQY1CCRaY530LrcRUqg', 
    events: { googleCalendarId: 'ed1a0dc749cd8f5be31fe2e72606fe5a46321f3e0c8671f0361c504d19fd2f38@group.calendar.google.com' }, 
    headerToolbar: { 
      left: 'prev,next today', 
      center: 'title', 
      right: 'dayGridMonth,timeGridWeek,timeGridDay' 
    },
    eventClick: function(info) {
      info.jsEvent.preventDefault();
      const modalOverlay = document.getElementById("modal-overlay");
      const modalTitle = document.querySelector("#event-modal .event-title");
      const modalDate = document.querySelector("#event-modal .event-data");
      const modalLocation = document.querySelector("#event-modal .event-location");
      modalTitle.textContent = info.event.title;
      modalDate.textContent = "Date: " + info.event.start.toLocaleString();
      modalLocation.textContent = "Location: " + (info.event.extendedProps.location || "TBD");
      modalOverlay.style.display = "flex";
      modalOverlay.setAttribute("aria-hidden", "false");
    }

    }); calendar.render(); }); 
    // 
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

//added to dynamically fill in upcoming events section
fetch('https://api.sheetbest.com/sheets/96fd77ef-7967-42e7-994f-dfbae7a94e47')
.then(response => response.json())
.then(data => {
    const upcomingList = document.querySelector(".right-thing");
    upcomingList.innerHTML = " ";
    
    //pulling first 3 events
    const topEvents = data.slice(0, 3);

    topEvents.forEach(event => {
      const li = document.createElement("li");
      li.setAttribute("role", "listitem");

      li.innerHTML = `
        <div class="event-sub" tabindex="0" role="button">
            <span class="event-title">${event.name}</span>
            <span class="event-data">Date: ${event.date}</span>
            <span class="event-location">Location: ${event.location}</span>
        </div>
      `;

      // ARIA additions
      const eventSub = li.querySelector(".event-sub");
      eventSub.setAttribute("aria-haspopup", "dialog");
      eventSub.setAttribute("aria-controls", "modal-overlay");
      eventSub.setAttribute(
        "aria-label",
        `${event.name}, happening on ${event.date} at ${event.location}`
      );

      upcomingList.appendChild(li);
});
attachModalListener();

})


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

