import { AutoClient, Presence } from "discord-auto-rpc";

let client = new AutoClient({ transport: "ipc" });

client.on("ready", () => {
    console.log("Ready!");
});

export function load() {
    client.endlessLogin({
        clientId: "1280598966471491594"
    });
}

export function setActivity(args: Presence) {
    client.setActivity(args);
} 

export function unload() {
    client.clearActivity();
    client.destroy();
}