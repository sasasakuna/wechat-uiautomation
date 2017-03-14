if (process.env.LOCAL) {
  exports.androidApp = "app/com.tencent.mm_v6.5.4-1000_Android-4.1.apk";
} else if (process.env.SYSTEM) {
  exports.appPackage = "com.tencent.mm";
  exports.appActivity = "com.tencent.mm.ui.LauncherUI";
} else {
  exports.androidApp = undefined
}
