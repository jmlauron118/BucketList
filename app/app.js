const application = require("tns-core-modules/application");
const appSettings = require("./appSettings.json");
const Sqlite = require("nativescript-sqlite"); 

if (!Sqlite.exists(appSettings.database)) {
    console.log("copying..");
    Sqlite.copyDatabase(appSettings.database);
}

application.run({ moduleName: "app-root/app-root" });
