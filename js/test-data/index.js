import { getPosts  } from './post.js';

const MAX_POSTS = 25;
const posts = getPosts(MAX_POSTS);

export { posts };
