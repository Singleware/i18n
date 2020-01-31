/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Types from './types';
/**
 * Translation repository class.
 */
export declare class Repository extends Class.Null {
    /**
     * All messages.
     */
    private allMessages;
    /**
     * Unwrap the specified messages into the repository extracting any resolutive property.
     * @param parent Parent path.
     * @param messages Messages object.
     * @returns Return a new resolutive message object.
     */
    private unwrapMessages;
    /**
     * Get the raw resolutive message according to the given message object and settings.
     * @param message Message object.
     * @param settings Message settings.
     * @returns Returns the raw resolutive message or undefined when the resolutive message wasn't found.
     */
    private getRawResolutiveMessage;
    /**
     * Get the raw message that corresponds to the specified path according to the given settings.
     * @param path Message path.
     * @param settings Message settings.
     * @returns Returns the corresponding message or undefined when the message wasn't found.
     */
    private getRawMessage;
    /**
     * Get a parameterized message based on the specified raw message and parameters.
     * @param message Raw message.
     * @param parameters Message parameters.
     * @returns Returns the parameterized message.
     */
    private getParameterizedMessage;
    /**
     * Add new messages into the repository.
     * @param section Section.
     * @param messages New messages.
     */
    add(section: string, messages: Types.Messages): void;
    /**
     * Get the translated message that corresponds to the specified path and options.
     * @param path Message path.
     * @param options Message options.
     * @returns Returns the translated message or the given path when the message wasn't found.
     */
    get<T extends Types.Parameters>(path: string, options?: Types.Settings<T>): string;
}
