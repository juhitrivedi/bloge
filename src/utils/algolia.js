// src/utils/algolia.js
const pageQuery = `{
  pages: allWordpressPage {
    edges {
      node {
        id
        title
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
}`

const postQuery = `{
  posts: allWordpressPost {
    edges {
      node {
        id
        slug
        modified
        title
        tags {
          name
          slug
        }
        categories {
          name
          slug
        }
      }
      next {
        id
        slug  
        title
      }
      previous {
        id
        slug    
        title
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { slug, ...rest } }) => ({
    slug,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries

// module.exports = function(chunksTotal, { node }) {
//   const {
//     fields: { slug },
//     frontmatter: { title },
//     internal: { content }
//   } = node;

//   const noEmojiContent = content.replace(/<img class="emoji-icon".+\/>/g, "");

//   const contentChunks = chunkString(noEmojiContent, 5000);
//   const record = { title, slug, content };
//   const recordChunks = contentChunks.reduce((recordChunksTotal, contentChunksItem, idx) => {
//     return [
//       ...recordChunksTotal,
//       { ...record, ...{ content: contentChunksItem }, objectID: `${slug}${idx}` }
//     ];
//   }, []);

//   return [...chunksTotal, ...recordChunks];
// };

// function chunkString(str, length) {
//   return str.match(new RegExp("(.|[\r\n]){1," + length + "}", "g"));
// }
