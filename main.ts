import {app, BrowserWindow, screen} from "electron";
import * as path from "path";
import {Sequelize} from "sequelize-typescript";
import * as url from "url";
import {Diagnose} from "./server/diagnose";
import {Patient} from "./server/patient";
import {PatientDiagnose} from "./server/patient-diagnose";

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.some((val: string) => val === "--serve");

function createWindow(): BrowserWindow {

	const electronScreen = screen;
	const size = electronScreen.getPrimaryDisplay().workAreaSize;

	// Create the browser window.
	win = new BrowserWindow({
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
	} else {
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

const PROD_DATABASE_PATH_PREFIX = `${app.getPath("userData")}/databases/`;
const DEV_DATABASE_PATH_PREFIX = "./";
const DATABASE_FILE_NAME = "pat.db";
let sequelize: Sequelize;

async function initDatabase() {
	try {
		const databasePath = serve
			? DEV_DATABASE_PATH_PREFIX + DATABASE_FILE_NAME
			: PROD_DATABASE_PATH_PREFIX + DATABASE_FILE_NAME;
		if (serve) {
			console.log("USING DB: ", databasePath);
		}
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: databasePath,
			models: [
				Patient,
				Diagnose,
				PatientDiagnose,
			],
		});
		await sequelize.sync();
	} catch (e) {
		console.error(e);
	}
}

try {

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on("ready", createWindow);
	app.on("ready", initDatabase);

	// Quit when all windows are closed.
	app.on("window-all-closed", () => {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== "darwin") {
			app.quit();
		}
	});

	app.on("quit", () => {
		sequelize.close();
	});

	app.on("activate", () => {
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (win === null) {
			createWindow();
		}
	});

} catch (e) {
	console.error(e);
	// throw e;
}
