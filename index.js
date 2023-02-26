const os = require("os");
const fs = require("fs");
const term = require("terminal-kit").terminal;
const si = require("systeminformation");
const { exec } = require("child_process");

let cfg = fs
  .readFileSync("/home/zaikawo/.config/zfetch/zfetch.conf", "utf8")
  .split(";\n");
const CONFIG = {};
for (let i of cfg) {
  i = i.split(" = ");
  CONFIG[i[0]] = i[1];
}

let clr = fs.readFileSync(__dirname + "/cfg/colors.txt", "utf8").split(";\n");
const COLORS = {};
for (let i of clr) {
  i = i.split(" = ");
  COLORS[i[0]] = (i[1] + "").split(" ");
}

CONFIG.GET_INFO = CONFIG.GET_INFO.replace(/\./g, __dirname);

if (CONFIG.GET_INFO == "auto") {
  CONFIG.GET_INFO = "/etc/os-release";
}

const USERNAME = os.userInfo().username;
const HOSTNAME = os.hostname();
let opt = fs.readFileSync(CONFIG.GET_INFO, "utf8");
let opj = {};

const WMs = {
  KDE: "KWin",
};

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

opt?.split("\n")?.forEach((line, index) => {
  let words = line?.split("=");
  let key = words[0]?.toLowerCase();
  if (key === "") return;
  let value = words[1]?.replace(/"/g, "");
  opj[key] = value;
});

let DEFAULT_TERMINAL;

exec("echo $TERM", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  DEFAULT_TERMINAL = stdout.trim();
});

let DESKTOP_ENVIRONMENT;

exec("echo $XDG_CURRENT_DESKTOP", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  DESKTOP_ENVIRONMENT = stdout.trim();
});

let SYSTEM_DATA;

si.system((data) => {
  SYSTEM_DATA = data;
});

let SYSTEM_CPUS;

si.cpu((data) => {
  SYSTEM_CPUS = data;
});

let SYSTEM_OS;

si.osInfo((data) => {
  SYSTEM_OS = data;
});

let SYSTEM_MEMORY;

si.mem((data) => {
  SYSTEM_MEMORY = data;
}); //   󰌢

// make the terminal think we're on debian

setTimeout(() => {
  if (CONFIG.DISPLAYED_LOGO == "auto") {
    CONFIG.DISPLAYED_LOGO = opj.id + "_logo";
  }

  if (CONFIG.LOGO_COLOR == "auto") {
    CONFIG.LOGO_COLOR = opj.id;
  }

  const ASCII_LOGO = fs
    .readFileSync(
      __dirname + "/logos/" + CONFIG.DISPLAYED_LOGO + ".txt",
      "utf8"
    )
    .split("\n");

  let LINES = [
    "",
    "╭────────────────┤^m^+^_" +
      USERNAME +
      " ^K> ^M^+" +
      HOSTNAME +
      "^:^w├────",
    "│",
    "│ ^R^!  ^:^R^w " + opj.name,
    "│ ^R^!  ^:^R^w " + SYSTEM_OS.kernel,
    "│ ^R^! 󰌢 ^:^R^w +" + SYSTEM_DATA.model,
    "│",
    "│ ^B^!  ^:^B^w " + (os.uptime() + "").toHHMMSS(),
    "│",
    "│ ^G^!  ^:^G^w " + os.userInfo().shell,
    "│ ^g^! 󰧨 ^:^g^w+ " + DESKTOP_ENVIRONMENT,
    "│ ^G^!  ^:^G^w " + WMs[DESKTOP_ENVIRONMENT],
    "│ ^g^!  ^:^g^w " + DEFAULT_TERMINAL,
    "│",
    "│ ^Y^! 󰻠 ^:^Y^w +" + SYSTEM_CPUS.manufacturer + " " + SYSTEM_CPUS.brand,
    "│ ^Y^! 󰍛 ^:^Y^w +" + SYSTEM_MEMORY.total + " BYTES TOTAL",
    "│",
    "╰",
    "          ^k████ ^r████ ^g████ ^b████ ^c████ ^y████ ^m████ ^w████",
    "          ^K████ ^R████ ^G████ ^B████ ^C████ ^Y████ ^M████ ^W████",
  ];

  while (LINES.length > ASCII_LOGO.length) {
    ASCII_LOGO.push("");
  }

  let biggest = 0;

  for (let i of LINES) {
    if (biggest < i.length) {
      biggest = i.length;
    }
  }
  biggest -= 6;

  let idx2 = -1;

  for (let i of LINES) {
    i = i + "";
    let spacer = "";
    idx2 += 1;
    let cleanI = i.replace(/\^./g, "");
    let len = cleanI.length;
    if (cleanI.includes("+")) {
      len -= 2;
      i = i.replace(/\+/g, "");
    }
    for (let j = 0; j < biggest - len; j++) {
      spacer += " ";
    }
    if (idx2 > 1 && i != "╰" && i != "├" && idx2 < LINES.length - 2) {
      LINES[idx2] = i + spacer + "│";
    } else if (idx2 == 1) {
      LINES[idx2] = i + spacer.replace(/ /g, "─") + "╮ ";
    } else if (i == "╰") {
      LINES[idx2] = i + spacer.replace(/ /g, "─") + "╯";
    } else if (i == "├") {
      LINES[idx2] = i + spacer.replace(/ /g, "─") + "┤";
    }
  }

  let idx = -1;
  for (let i of ASCII_LOGO) {
    idx += 1;
    let space = "";
    let spaceLen = 0;
    let iLen = i.length;
    if (i.includes("^")) {
      iLen -= 2;
    }
    spaceLen = 40 - iLen;
    for (let j = 0; j < spaceLen; j++) {
      space += " ";
    }
    let line = "";
    if (LINES[idx]) {
      line = LINES[idx];
    }
    let c1 = COLORS[CONFIG.LOGO_COLOR][0];
    let c2 = COLORS[CONFIG.LOGO_COLOR][1];
    let c3 = COLORS[CONFIG.LOGO_COLOR][2];
    term.colorRgb(
      parseInt(c1),
      parseInt(c2),
      parseInt(c3)
    )(i + space + "^:^w" + line);
    term("\n");
  }
}, 300);
