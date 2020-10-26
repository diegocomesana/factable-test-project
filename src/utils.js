// FACTABLE

export const contentLoader = ({ loading, content }) => {
  return `${loading ? "loading..." : content}`;
};

// NOT WORKING:
// export const contentLoader = ({ loading, content }) =>
//   `${loading ? "loading..." : content}`;
