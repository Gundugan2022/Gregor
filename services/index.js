
import {request, gql} from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
    `;

  
      const result = await request(graphqlAPI, query);

      return result.postsConnection.edges;

  
};

export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: {slug: $slug}){
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          category {
            name
            slug
          }
          content {
            raw
          }
    }
  }
  `;


    const result = await request(graphqlAPI, query, {slug});

    return result.post;


};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

export const getSimilarPosts = async (category, slug) => {
  const query = gql`
    query GetpostDetails($slug: String!, $category: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {category_some: {slug_in: $category}}},
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, {category, slug})
  return result.posts;
}

export const getCategory = async () => {
  const query = gql`
    query GetCategory {
      categories {
        name
        slug
        photo {
          url
        }
      }
    }
  `
  const result = await request(graphqlAPI, query);

  return result.categories;
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, {slug});

  return result.comments;
}

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {category_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
              photo {
                url
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};