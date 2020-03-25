"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const sequelize_typescript_1 = require("sequelize-typescript");
const url = require("url");
const diagnose_1 = require("./server/diagnose");
const patient_1 = require("./server/patient");
const patient_diagnose_1 = require("./server/patient-diagnose");
let win = null;
const args = process.argv.slice(1);
const serve = args.some((val) => val === "--serve");
function createWindow() {
    const electronScreen = electron_1.screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: serve,
        },
    });
    if (serve) {
        require("electron-reload")(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });
        win.loadURL("http://localhost:4200");
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, "dist/index.html"),
            protocol: "file:",
            slashes: true,
        }));
    }
    if (serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    return win;
}
const PROD_DATABASE_PATH_PREFIX = `${electron_1.app.getPath("userData")}/databases/`;
const DEV_DATABASE_PATH_PREFIX = "./";
const DATABASE_FILE_NAME = "pat.db";
let sequelize;
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const databasePath = serve
                ? DEV_DATABASE_PATH_PREFIX + DATABASE_FILE_NAME
                : PROD_DATABASE_PATH_PREFIX + DATABASE_FILE_NAME;
            console.log("USING DB: ", databasePath);
            sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "sqlite",
                storage: databasePath,
                models: [
                    patient_1.Patient,
                    diagnose_1.Diagnose,
                    patient_diagnose_1.PatientDiagnose,
                ],
            });
            yield sequelize.sync();
        }
        catch (e) {
            console.error(e);
        }
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on("ready", createWindow);
    electron_1.app.on("ready", initDatabase);
    // Quit when all windows are closed.
    electron_1.app.on("window-all-closed", () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    electron_1.app.on("quit", () => {
        sequelize.close();
    });
    electron_1.app.on("activate", () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    console.error(e);
    // throw e;
}
//# sourceMappingURL=main.js.map