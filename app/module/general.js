const FeedBack = require("nativescript-feedback");
const feedBack = new FeedBack.Feedback();
const Color = require("tns-core-modules/color").Color;

export const GetRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const HexToRGBA = (hex, opacity) => {
    var c;

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            ", " +
            (opacity > 1 ? 1 : opacity) +
            ")"
        );
    }
};

export const ShowMessage = (mess, status) => {
    var statuses = {
        success: "#099c4b",
        primary: "#1761a7",
        warning: "#caa21e",
        error: "#a32323",
        default: "#36767e",
    };

    feedBack.show({
        message: mess,
        backgroundColor: new Color(
            status == undefined || status == ""
                ? statuses["default"]
                : statuses[status]
        ),
        duration: 2500,
        icon: status,
        android: {
            iconColor: new Color("white"), // optional, leave out if you don't need it
        },
        onTap: ()=>{
            feedBack.hide();
        }
    });
};
