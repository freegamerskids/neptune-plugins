import { AutoClient, Presence } from "discord-auto-rpc";

let client:AutoClient = new AutoClient({ transport: "ipc" });

console.log("Is this working from the native part??????");

client.on("ready", () => {
    console.log("Ready!");
});

export function load() {
    console.log("Initializing...");

    client.endlessLogin({
        clientId: "1280598966471491594"
    }).then(()=>{
        console.log("Initialized!");
    });
}

export function setActivity(args: Presence) {
    client.setActivity(args);
} 

export function unload() {
    client.clearActivity();
    client.destroy();
}