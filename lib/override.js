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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esy_1 = require("./esy");
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const fs_1 = require("fs");
function version(version, sandbox) {
    return __awaiter(this, void 0, void 0, function* () {
        if (version) {
            let sandbox_path = '';
            if (!sandbox) {
                let current_status = yield esy_1.status();
                sandbox_path = current_status.rootPackageConfigPath;
            }
            else {
                sandbox_path = path_1.default.join(process_1.cwd(), sandbox + '.json');
            }
            console.log('Path to json project file : ', sandbox_path);
            let raw_data = yield fs_1.promises.readFile(sandbox_path, 'utf8');
            let project = JSON.parse(raw_data);
            project.devDependencies.ocaml = version;
            yield fs_1.promises.writeFile(sandbox_path, JSON.stringify(project));
            console.log('OCaml version has been overriden to ', version);
        }
    });
}
exports.version = version;
