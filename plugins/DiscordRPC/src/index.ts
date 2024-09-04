import { load, unload, setActivity } from "./rpc.native";
import { intercept } from "neptune-types/api/intercept";

console.log("Hello world!")

let loaded = false;
load().then(() => {
  loaded = true;
});

while (!loaded) {}

let state = window.neptune.store.getState();

setActivity({
  state: `Playing ${state.playQueue.sourceName}`,
  smallImageKey: "play",
  smallImageText: "neptune"
});

console.log(state.playQueue);

intercept("playbackControls/SET_PLAYBACK_STATE", ([payload]) => {
  console.log(payload);
})

// This is where you would typically put cleanup code.
export function onUnload() {
  unload();

  console.log("Goodbye world!");
}
