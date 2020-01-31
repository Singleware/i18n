"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Translation repository class.
 */
let Repository = class Repository extends Class.Null {
    constructor() {
        super(...arguments);
        /**
         * All messages.
         */
        this.allMessages = {};
    }
    /**
     * Unwrap the specified messages into the repository extracting any resolutive property.
     * @param parent Parent path.
     * @param messages Messages object.
     * @returns Return a new resolutive message object.
     */
    unwrapMessages(parent, messages) {
        const resolution = {};
        for (const key in messages) {
            const value = messages[key];
            if (key.startsWith('@')) {
                resolution[key] = value;
            }
            else {
                const path = `${parent}.${key}`;
                if (value instanceof Object) {
                    const extracted = this.unwrapMessages(path, value);
                    if (Object.keys(extracted).length > 0) {
                        this.allMessages[path] = extracted;
                    }
                }
                else {
                    this.allMessages[path] = `${value}`;
                }
            }
        }
        return resolution;
    }
    /**
     * Get the raw resolutive message according to the given message object and settings.
     * @param message Message object.
     * @param settings Message settings.
     * @returns Returns the raw resolutive message or undefined when the resolutive message wasn't found.
     */
    getRawResolutiveMessage(message, settings) {
        if (settings.counter !== void 0) {
            const counter = Math.abs(settings.counter);
            if (counter === 0) {
                return message['@empty'] || message['@plural'];
            }
            else if (counter === 1) {
                return message['@singular'];
            }
            else if (counter > 1) {
                return message['@plural'];
            }
        }
        return void 0;
    }
    /**
     * Get the raw message that corresponds to the specified path according to the given settings.
     * @param path Message path.
     * @param settings Message settings.
     * @returns Returns the corresponding message or undefined when the message wasn't found.
     */
    getRawMessage(path, settings) {
        var _a;
        const message = this.allMessages[path];
        if (message instanceof Object) {
            if (settings.context) {
                const context = (_a = message[`@${settings.context}`], (_a !== null && _a !== void 0 ? _a : message['@fallback']));
                if (context instanceof Object) {
                    return this.getRawResolutiveMessage(context, settings);
                }
                return context;
            }
            return this.getRawResolutiveMessage(message, settings);
        }
        return message;
    }
    /**
     * Get a parameterized message based on the specified raw message and parameters.
     * @param message Raw message.
     * @param parameters Message parameters.
     * @returns Returns the parameterized message.
     */
    getParameterizedMessage(message, parameters) {
        return message.replace(/{(.*?)}/g, (...match) => {
            const key = match[1];
            const value = parameters[key];
            if (typeof window !== 'undefined' && value instanceof HTMLElement) {
                return `${value.outerHTML}`;
            }
            return `${value}`;
        });
    }
    /**
     * Add new messages into the repository.
     * @param section Section.
     * @param messages New messages.
     */
    add(section, messages) {
        for (const key in messages) {
            const path = `${section}.${key}`;
            const value = messages[key];
            if (value instanceof Object) {
                this.allMessages[path] = this.unwrapMessages(path, value);
            }
            else {
                this.allMessages[path] = `${value}`;
            }
        }
    }
    /**
     * Get the translated message that corresponds to the specified path and options.
     * @param path Message path.
     * @param options Message options.
     * @returns Returns the translated message or the given path when the message wasn't found.
     */
    get(path, options) {
        var _a;
        const settings = (options !== null && options !== void 0 ? options : {});
        const message = this.getRawMessage(path, settings);
        if (message !== void 0) {
            if (settings.parameters !== void 0) {
                return this.getParameterizedMessage(message, settings.parameters);
            }
            return message;
        }
        console.warn(`Translation '${path}' doesn't found.`);
        return _a = settings.fallback, (_a !== null && _a !== void 0 ? _a : path);
    }
};
__decorate([
    Class.Private()
], Repository.prototype, "allMessages", void 0);
__decorate([
    Class.Private()
], Repository.prototype, "unwrapMessages", null);
__decorate([
    Class.Private()
], Repository.prototype, "getRawResolutiveMessage", null);
__decorate([
    Class.Private()
], Repository.prototype, "getRawMessage", null);
__decorate([
    Class.Private()
], Repository.prototype, "getParameterizedMessage", null);
__decorate([
    Class.Public()
], Repository.prototype, "add", null);
__decorate([
    Class.Public()
], Repository.prototype, "get", null);
Repository = __decorate([
    Class.Describe()
], Repository);
exports.Repository = Repository;
