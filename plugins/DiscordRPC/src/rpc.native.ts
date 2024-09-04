import { AutoClient, Presence } from "discord-auto-rpc";

let client:AutoClient = new AutoClient({ transport: "ipc" });

export async function load() {
    await client.endlessLogin({
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