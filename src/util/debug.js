import debug from 'debug';

export default function debugFactory(tag) {
  return debug(`arnold:${tag}`);
}
