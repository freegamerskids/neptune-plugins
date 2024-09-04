import { AutoClient, Presence } from "discord-auto-rpc";

let client = new AutoClient({ transport: "ipc" });

export async function load() {
    await client.endlessLogin({
        clientId: "1280598966471491594"
    });
}

export function setActivity(args) {
    client.setActivity(args);
} 

export function unload() {
    client.clearActivity();
    client.destroy();
}