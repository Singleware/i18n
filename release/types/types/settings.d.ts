/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Parameters } from './parameters';

/**
 * Translation settings.
 */
export type Settings<T extends Parameters = any> = {
  /**
   * Counter key.
   */
  counter?: number;
  /**
   * Context key.
   */
  context?: string;
  /**
   * Fallback message.
   */
  fallback?: string;
  /**
   * Translation parameters.
   */
  parameters?: T;
};
