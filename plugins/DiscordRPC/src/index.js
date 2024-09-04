import { load, unload, setActivity } from "./rpc.native";
import { intercept } from "@neptune";

console.log("Hello world!")

function getValuesForActivity() {
  let domImg = document.querySelector('figure[class^="currentMediaImagery--"] div div div img[class^="cellImage--"][class*="image--"]')
  let image = domImg ? domImg.src : null;

  let domTitle = document.querySelector('div[class^="trackTitleContainer--"] a span[class="wave-text-description-demi"]')
  let title = domTitle ? domTitle.innerText : null;

  let artists = "";
  document.querySelectorAll('div[class^="currentMediaItemDetails--"] div span span span[class*="artist-link"] a[class^="item--"][aria-label]').forEach(el => {
    artists += el.innerText + " ,"
  })
  artists = artists ? artists.slice(0, -2) : null;

  return {
    image,
    title,
    artists
  }
}

;(async ()=>{
  await load();

  let vals = getValuesForActivity();
  console.log(vals);

  let state = window.neptune.store.getState();

  setActivity({
    state: `Playing ${vals.title} by ${vals.artists}`,
    smallImageKey: "play",
    smallImageText: "Playing",
    largeImageKey: vals.image,
  });

  console.log(state.playQueue);
})();

intercept("playbackControls/SET_PLAYBACK_STATE", ([payload]) => {
  console.log(payload);
})

// This is where you would typically put cleanup code.
export function onUnload() {
  unload();

  console.log("Goodbye world!");
}
