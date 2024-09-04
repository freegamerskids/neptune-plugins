import { load, unload, setActivity } from "./rpc.native";
import { intercept } from "@neptune";

function coverIdToUrl(id) {
  return `https://resources.tidal.com/images/${id.replaceAll('-','/')}/1028x1028.jpg`;
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

function setIdle() {
  setActivity({
    type: 2,
    state: `Idling`,
    largeImageKey: "tidal",
  });
}

function timeUpdateCallback([payload]){
  let state = window.neptune.store.getState();

  let ts = Date.now();
  let startTs = ts;
  if (state.playbackControls.playbackState !== "NOT_PLAYING") {
    if (payload !== 0) {
      startTs = ts - (payload * 1000);
    };
  } else {
    setIdle();
    return false
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
}

;(async ()=>{
  await load();

  console.log("[DiscordRPC] Loaded!");

  let state = window.neptune.store.getState();

  if (state.playbackControls.playbackState === "NOT_PLAYING"){
    setIdle();
  } else {
    timeUpdateCallback([state.playbackControls.latestCurrentTime]);
  }

  intercept("playbackControls/TIME_UPDATE", timeUpdateCallback)
})();

export function onUnload() {
  unload();

  console.log("[DiscordRPC] Unloaded!");
}
