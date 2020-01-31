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
const util_1 = require("util");
const child_process_1 = require("child_process");
const core_1 = require("@actions/core");
let exec = util_1.promisify(child_process_1.exec);
function esy(sandbox, command) {
    return __awaiter(this, void 0, void 0, function* () {
        let cmd = `esy${sandbox ? ' @' + sandbox : ''}${command ? ' ' + command : ''}`;
        yield exec(cmd);
    });
}
function status() {
    return __awaiter(this, void 0, void 0, function* () {
        let { stdout, stderr } = yield exec('esy status');
        if (stderr) {
            core_1.error(stderr);
        }
        return JSON.parse(stdout);
    });
}
exports.status = status;
