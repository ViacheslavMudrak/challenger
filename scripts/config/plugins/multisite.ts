import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

/**
 * Site information is now managed through lib/site-resolver, not the bootstrap config.
 */
class MultisitePlugin implements ConfigPlugin {
  order = 11;

  async exec(config: JssConfig) {
    return config;
  }
}

export const multisitePlugin = new MultisitePlugin();
