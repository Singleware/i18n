/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Testing from '@singleware/testing';

import * as i18n from '../source';

/**
 * Repository test case.
 */
@Class.Describe()
export class Repository extends Testing.Case {
  /**
   * Global repository.
   */
  @Class.Private()
  private repository = new i18n.Repository();

  /**
   * Global messages.
   */
  @Class.Private()
  private messages = {
    value: 'Value',
    variable: 'Variable({x})',
    nested: {
      value: 'Nested:Value',
      variable: 'Nested:Variable({x})'
    },
    plural: {
      '@empty': 'Empty',
      '@singular': 'Singular',
      '@plural': 'Plural'
    },
    context: {
      '@a': 'Context:A',
      '@z': 'Context:Z',
      '@fallback': 'Context:Fallback',
      plural: {
        '@a': {
          '@empty': 'Context:A:Empty',
          '@singular': 'Context:A:Singular',
          '@plural': 'Context:A:Plural'
        },
        '@z': {
          '@empty': 'Context:Z:Empty',
          '@singular': 'Context:Z:Singular',
          '@plural': 'Context:Z:Plural'
        },
        '@fallback': {
          '@empty': 'Context:Fallback:Empty',
          '@singular': 'Context:Fallback:Singular',
          '@plural': 'Context:Fallback:Plural'
        }
      }
    }
  };

  /**
   * Default constructor.
   */
  constructor() {
    super();
    this.repository.add('test', this.messages);
  }

  /**
   * Test of basic translations.
   */
  @Testing.Method()
  @Class.Public()
  public testBasicTranslations(): void {
    this.areEquals(this.repository.get('test.value'), 'Value');
    this.areEquals(this.repository.get('test.variable', { parameters: { x: 'ok' } }), 'Variable(ok)');
    this.areEquals(this.repository.get('test.nested.value'), 'Nested:Value');
    this.areEquals(this.repository.get('test.nested.variable', { parameters: { x: 'ok' } }), 'Nested:Variable(ok)');
  }

  /**
   * Test of plural translations.
   */
  @Testing.Method()
  @Class.Public()
  public testPluralTranslations(): void {
    this.areEquals(this.repository.get('test.plural', { counter: 0 }), 'Empty');
    this.areEquals(this.repository.get('test.plural', { counter: 1 }), 'Singular');
    this.areEquals(this.repository.get('test.plural', { counter: 2 }), 'Plural');
  }

  /**
   * Test of context translations.
   */
  @Testing.Method()
  @Class.Public()
  public testContextTranslations(): void {
    this.areEquals(this.repository.get('test.context', { context: 'a' }), 'Context:A');
    this.areEquals(this.repository.get('test.context', { context: 'z' }), 'Context:Z');
    this.areEquals(this.repository.get('test.context', { context: 'b' }), 'Context:Fallback');
  }

  /**
   * Test of plural context translations.
   */
  @Testing.Method()
  @Class.Public()
  public testPluralContextTranslations(): void {
    this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 0 }), 'Context:A:Empty');
    this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 1 }), 'Context:A:Singular');
    this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 2 }), 'Context:A:Plural');
    this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 0 }), 'Context:Z:Empty');
    this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 1 }), 'Context:Z:Singular');
    this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 2 }), 'Context:Z:Plural');
    this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 0 }), 'Context:Fallback:Empty');
    this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 1 }), 'Context:Fallback:Singular');
    this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 2 }), 'Context:Fallback:Plural');
  }

  /**
   * Test of translation not found.
   */
  @Testing.Method()
  @Class.Public()
  public testTranslationNotFound(): void {
    this.areEquals(this.repository.get('test.not.found'), 'test.not.found');
    this.areEquals(this.repository.get('test.not.found', { fallback: 'Fallback' }), 'Fallback');
  }
}
