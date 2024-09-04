import { load, unload, setActivity } from "./rpc.native";
import { intercept } from "@neptune";

console.log("Hello world!")

function coverIdToUrl(id) {
  return `https://resources.tidal.com/images/${id.replace('-','/')}/1028x1028.jpg`;
}

function getValuesForActivity() {
  let track = window.neptune.currentMediaItem;

  if (!track) return null
  if (track.type !== "track") return null

  track = track.item;

  let artists = "";
  for (const artist of track.artists){
    artists += artist.name + " ,"
  }
  artists = artists ? artists.slice(0, -2) : null;

  return {
    image: coverIdToUrl(track.album.cover),
    title: track.title,
    artists,
    duration: track.duration,
    url: track.url,
    albumName: track.album.title
  }
}

;(async ()=>{
  await load();

  let vals = getValuesForActivity();
  console.log(vals);

  let state = window.neptune.store.getState();

  setActivity({
    type: 2,
    state: `Idling`,
    largeImageKey: "tidal",
  });

  console.log(state.playQueue);
})();

intercept("playbackControls/TIME_UPDATE", ([payload]) => {
  let state = window.neptune.store.getState();

  let ts = Date.now();
  let startTs = ts;
  if (state.playbackControls.playbackState !== "NOT_PLAYING") {
    if (payload !== 0) return false;
  } else {
    startTs = ts - (payload * 1000);
  }

  let vals = getValuesForActivity();
  if (!vals) return false;

  setActivity({
    type: 2,
    details: `Playing ${vals.title}`,
    state: `by ${vals.artists}`,
    smallImageKey: "tidal",
    smallImageText: "Listening on TIDAL",
    largeImageKey: vals.image,
    largeImageText: vals.albumName,

    timestamps: {
      start: startTs,
      end: ts + (vals.duration * 1000) - (payload * 1000),
    }
  });
})

export function onUnload() {
  unload();

  console.log("Goodbye world!");
}
