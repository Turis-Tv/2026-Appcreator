// well

const player = videojs('videojs');

let t = document.querySelector(".left-images"), n = document.querySelector(".right-images"), r = document.querySelector(".container");
window.addEventListener("scroll", () => { let e, a = window.scrollY - (r.getBoundingClientRect().top + window.scrollY);  a < 0 && (a = 0), t.style.top = `${a}px`, n.style.top = `${a}px`});


async function initSite() {

  const channelsUL = document.querySelector('.channels-ul');
  const matchUL = document.querySelector('.match-ul');

  const channelsResponse = await fetch("https://apwcdn.b-cdn.net/initialvip.json");
  const channelsData = await channelsResponse.json();
  let url = "https://217.30.11.74/";

  let channelTemplate = ``;
  channelsData.channels.forEach(([id, title, background], index) => {

  let temp = `
    <li class="channels-li">
      <a href="" class="channels-href ${globalState.id == id ? 'selected' : ''}" 
         style="${index === channelsData.channels.length - 1 ? 'margin-right: 0.5rem;' : ''} background-color: ${background};" 
         data-ch-id="${id}">
        ${title}
      </a>
    </li>
  `;

  channelTemplate += temp;
});


channelsUL.innerHTML = channelTemplate;


const eventResponse = await  fetch('https://cdn.ytimg.site/events.json');
const eventsData = await eventResponse.json();

let eventTemplate = ``;

eventsData.forEach(({id, event_home, event_start_time, event_away, event_live, event_sport, event_league,ERTL }) => {

  let eventTemplateTemp = `

  <li class="match-li" data-event-id="${id}">

            <a href="#" class="match-href" data-event-id="${id}">
              <span class="event-icon-img" data-event-id="${id}">
              <img src="https://apwcdn.b-cdn.net/cdn/ev_${event_sport}.png" width="16" height="auto" data-event-id="${id}"> 
              </span>

              
              ${event_live === 'true'  ? `<span class="event-time" data-event-id="${id}" style="color: red">${ERTL === 'YES' ? 'ERTL' : 'CANLI'}</span>` : `<span class="event-time" data-event-id="${id}">${event_start_time}</span>`}
              

              <span class="event-teams" data-event-id="${id}">
              ${event_home} - ${event_away}
              </span>

               <span class="event-league" data-event-id="${id}">
              ${event_league}
              </span>

            </a>

          </li>

  `;

  eventTemplate += eventTemplateTemp;

})

matchUL.innerHTML = eventTemplate;


document.body.addEventListener('click', (event) => {
  event.stopPropagation();
  
  if (event.target.hasAttribute('data-ch-id')) {
    event.preventDefault();
    const chId = event.target.getAttribute('data-ch-id');
    
    const selected =  document.querySelector('.channels-href.selected');
    if (selected) selected.classList.remove('selected');
      
    
    event.target.classList.add('selected');
    const m = document.querySelector('.channels-href.selected');
    
    globalState.type = 'channel';
    globalState.id = chId
    
    player.src({
      src: `${url}e/${chId}.m3u8`,
      type: 'application/x-mpegURL',       
    });
    player.play();

  }

  if (event.target.hasAttribute('data-event-id')) {
    event.preventDefault();
    const eventId = event.target.getAttribute('data-event-id');
    player.src({
      src: `${url}e/${eventId}.m3u8`,
      type: 'application/x-mpegURL',       
    });
    
    player.play();

  }

  console.log(event.target)




})

}

let errorContent = '';

player.on('error', () => {
  if (globalState.id == 150) {
    errorContent = 'Bein 1 kanalı maç sırasında aktif olacaktır.';
  } else {
    errorContent = 'Bu maça henüz yayın gelmedi. Sorun devam ederse lütfen sayfayı yenileyiniz.'
  }

  document.querySelector('.vjs-modal-dialog-content').textContent = errorContent;
})

player.on('play', () => {
  
});

initSite();
setInterval(initSite, 60000);