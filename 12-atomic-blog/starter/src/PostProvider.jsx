import React, { useMemo } from "react";
import { createContext } from "react";
import { useState } from "react";
import { faker } from "@faker-js/faker";

import { useContext } from "react";

const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        onAddPost: handleAddPost,
      }
  }, [searchedPosts, searchQuery])
  return (
    <PostContext.Provider
      value={value}
    >
      {children}
    </PostContext.Provider>
  );
};

function usePosts() {
 const context = useContext(PostContext)
 if (context === undefined)
   throw new Error("PostContext was used outside of the PostProvider");
 return context
}

export { PostProvider, usePosts };

// import { useState } from "react";
// import { faker } from "@faker-js/faker";
// import { createContext } from "react";
// import { useContext } from "react";

// // 1) create a context
// const PostContext = createContext();

// function createRandomPost() {
//   return {
//     title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//     body: faker.hacker.phrase(),
//   };
// }

// const PostProvider = ({children}) => {
//   const [posts, setPosts] = useState(() =>
//     Array.from({ length: 30 }, () => createRandomPost())
//   );
//   const [searchQuery, setSearchQuery] = useState("");

//   // Derived state. These are the posts that will actually be displayed
//   const searchedPosts =
//     searchQuery.length > 0
//       ? posts.filter((post) =>
//           `${post.title} ${post.body}`
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//         )
//       : posts;

//   function handleAddPost(post) {
//     setPosts((posts) => [post, ...posts]);
//   }

//   function handleClearPosts() {
//     setPosts([]);
//   }

//   return (
//     <PostContext.Provider
//       value={{
//         posts: searchedPosts,
//         onAddPost: handleAddPost,
//         onClearPosts: handleClearPosts,
//         searchQuery,
//         setSearchQuery,
//       }}
//     >{children}</PostContext.Provider>
//   );
// };

// function usePosts() {
//     const context = useContext(PostContext)
//     if(context === undefined) throw new Error("PostContext was used outside of the PostProvider")
//     return context
// }

// export { PostProvider, usePosts };
