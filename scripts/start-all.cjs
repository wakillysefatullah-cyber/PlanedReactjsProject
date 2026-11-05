const { spawn } = require("node:child_process");
const net = require("node:net");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const backend = path.join(root, "backend");

const HOST = "127.0.0.1";
const PORT = 8080;

function isPortOpen() {
    return new Promise((resolve) => {
        const socket = net.createConnection({
            host: HOST,
            port: PORT,
        });

        socket.setTimeout(1000);

        socket.once("connect", () => {
            socket.destroy();
            resolve(true);
        });

        socket.once("error", () => resolve(false));

        socket.once("timeout", () => {
            socket.destroy();
            resolve(false);
        });
    });
}

function startProcess(command, cwd) {
    return spawn("cmd.exe", ["/d", "/s", "/c", command], {
        cwd,
        stdio: "inherit",
    });
}

async function main() {
    let backendProcess = null;

    if (await isPortOpen()) {
        console.log("Backend port 8080 is already active.");
        console.log("Reusing the existing backend.");
    } else {
        console.log("Starting EasyCount backend...");

        backendProcess = startProcess(
            "mvnw.cmd spring-boot:run",
            backend
        );

        let ready = false;

        for (let i = 0; i < 120; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (backendProcess.exitCode !== null) {
                throw new Error("Backend stopped unexpectedly.");
            }

            if (await isPortOpen()) {
                ready = true;
                break;
            }
        }

        if (!ready) {
            throw new Error("Backend did not start within 120 seconds.");
        }

        console.log("Backend started successfully.");
    }

    console.log("Starting EasyCount frontend...");

    const frontendProcess = startProcess("npm run dev", root);

    frontendProcess.on("exit", (code) => {
        console.log(`Frontend exited with code ${code}`);
    });
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});