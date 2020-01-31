/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from './types';

/**
 * Translation repository class.
 */
@Class.Describe()
export class Repository extends Class.Null {
  /**
   * All messages.
   */
  @Class.Private()
  private allMessages = <Types.Messages>{};

  /**
   * Unwrap the specified messages into the repository extracting any resolutive property.
   * @param parent Parent path.
   * @param messages Messages object.
   * @returns Return a new resolutive message object.
   */
  @Class.Private()
  private unwrapMessages(parent: string, messages: Types.Messages): Types.Messages {
    const resolution = <Types.Messages>{};
    for (const key in messages) {
      const value = messages[key];
      if (key.startsWith('@')) {
        resolution[key] = value;
      } else {
        const path = `${parent}.${key}`;
        if (value instanceof Object) {
          const extracted = this.unwrapMessages(path, value);
          if (Object.keys(extracted).length > 0) {
            this.allMessages[path] = extracted;
          }
        } else {
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
  @Class.Private()
  private getRawResolutiveMessage(message: Types.Messages, settings: Types.Settings): string | undefined {
    if (settings.counter !== void 0) {
      const counter = Math.abs(settings.counter);
      if (counter === 0) {
        return message['@empty'] || message['@plural'];
      } else if (counter === 1) {
        return message['@singular'];
      } else if (counter > 1) {
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
  @Class.Private()
  private getRawMessage<T extends Types.Parameters>(path: string, settings: Types.Settings<T>): string | undefined {
    const message = this.allMessages[path];
    if (message instanceof Object) {
      if (settings.context) {
        const context = message[`@${settings.context}`] ?? message['@fallback'];
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
  @Class.Private()
  private getParameterizedMessage<T extends Types.Parameters>(message: string, parameters: T): string {
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
  @Class.Public()
  public add(section: string, messages: Types.Messages): void {
    for (const key in messages) {
      const path = `${section}.${key}`;
      const value = messages[key];
      if (value instanceof Object) {
        this.allMessages[path] = this.unwrapMessages(path, value);
      } else {
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
  @Class.Public()
  public get<T extends Types.Parameters>(path: string, options?: Types.Settings<T>): string {
    const settings = options ?? {};
    const message = this.getRawMessage(path, settings);
    if (message !== void 0) {
      if (settings.parameters !== void 0) {
        return this.getParameterizedMessage(message, settings.parameters);
      }
      return message;
    }
    console.warn(`Translation '${path}' doesn't found.`);
    return settings.fallback ?? path;
  }
}
