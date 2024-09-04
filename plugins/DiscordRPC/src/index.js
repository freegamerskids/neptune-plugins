import { load, unload, setActivity } from "./rpc.native";
import { intercept } from "@neptune";

console.log("Hello world!")

;(async ()=>{
  await load();

  let state = window.neptune.store.getState();

  setActivity({
    state: `Playing ${state.playQueue.sourceName}`,
    smallImageKey: "play",
    smallImageText: "neptune"
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
