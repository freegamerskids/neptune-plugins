import { load, unload, setActivity } from "./rpc.native";

console.log("Hello world!")

load();

setTimeout(() => {
  setActivity({
    state: "testing",
    smallImageKey: "play",
    smallImageText: "neptune"
  });
}, 2_000)

// This is where you would typically put cleanup code.
export function onUnload() {
  unload();

  console.log("Goodbye world!");
}
