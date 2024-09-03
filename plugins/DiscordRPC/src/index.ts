import { load, unload, setActivity } from "./rpc.native";

console.log("Hello world!")

load();

setActivity({
  state: "testing",
  smallImageKey: "play",
  smallImageText: "neptune"
});

// This is where you would typically put cleanup code.
export function onUnload() {
  unload();

  console.log("Goodbye world!");
}
