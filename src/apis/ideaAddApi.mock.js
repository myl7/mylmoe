export const getStatus = idea => {
  if (idea.title && idea.body && idea.pubTime) {
    return 201
  } else {
    return 400
  }
}
