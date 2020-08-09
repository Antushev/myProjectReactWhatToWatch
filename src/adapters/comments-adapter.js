const commentAdapter = (comment) => {
  return {
    id: comment.id,
    user: {
      id: comment.user.id,
      name: comment.user.name
    },
    rating: comment.rating,
    comment: comment.comment,
    date: comment.date
  };
};

const commentsAdapter = (comments) => {
  return comments.map((comment) => {
    return commentAdapter(comment);
  });
};

export {commentAdapter, commentsAdapter};


