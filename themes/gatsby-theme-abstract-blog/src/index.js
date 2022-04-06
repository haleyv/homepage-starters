import * as React from "react"
import { graphql } from "gatsby"
import BlogIndex from "@gatsby-theme-abstract-blog/index"

export default function BlogIndexQuery(props) {
  const posts = props.data.allBlogPost.nodes

  return <BlogIndex posts={posts} />
}

export const query = graphql`
  query {
    allBlogPost(sort: { fields: date, order: DESC }) {
      nodes {
        id
        slug
        title
        excerpt
        category
        image {
          id
          alt
          gatsbyImageData(aspectRatio: 2)
        }
        author {
          id
          name
        }
      }
    }
  }
`
