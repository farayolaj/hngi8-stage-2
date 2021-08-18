"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = require("path");
var config = __importStar(require("./config"));
var mailer_1 = __importDefault(require("./services/mailer"));
var app = express_1.default();
// Apply middlewares
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.join(process.cwd(), 'public')));
// view engine setup
app.set('views', path_1.join(process.cwd(), 'views'));
app.set('view engine', 'pug');
mailer_1.default.getMailer();
app.post('/contact', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, subject = _a.subject, message = _a.message;
    console.log("Mail from " + name + ":");
    console.log(subject);
    console.log(message);
    var mailer = mailer_1.default.getMailer();
    // Send mail to confirm receipt
    mailer.notifyMe(name, email, subject, message);
    mailer.sendMail({
        message: "Hello " + name + ".\n\nI have received your message. I will reply within 48 hours.\nThank you\n\nJoshua",
        subject: "Re: " + subject,
        to: email,
    });
    res.render('contact-success', { name: name });
});
var server = http_1.default.createServer(app);
server.listen(config.port, function () {
    var addressInfo = server.address();
    console.log("Server running at " + addressInfo.address + ":" + addressInfo.port);
});
