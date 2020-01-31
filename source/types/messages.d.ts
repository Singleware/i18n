/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Map of messages.
 */
export type Messages = {
  /**
   * Empty form.
   */
  '@empty'?: string;
  /**
   * Singular form.
   */
  '@singular'?: string;
  /**
   * Plural form.
   */
  '@plural'?: string;
  /**
   * Fallback message.
   */
  '@fallback'?: string | Messages;
  /**
   * Other messages.
   */
  [key: string]: string | Messages | undefined;
};
