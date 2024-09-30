import {API_URL} from './urls';

export const getPosts = async (page = 1) => {
    const limit = 5;
    const skip = (page - 1) * limit;
  
    try {
      const response = await fetch(`${API_URL}posts?_limit=${limit}&_start=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  

  export const updateHugCount = async (title, newHugCount) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const fetchUrl = `${API_URL}posts?title=${encodedTitle}`;
  
  
      const fetchResponse = await fetch(fetchUrl);
      const posts = await fetchResponse.json();
  
      if (!fetchResponse.ok || posts.length === 0) {
        throw new Error('Post not found');
      }
  
   
      const postId = posts[0].id;
      const updateUrl = `${API_URL}posts/${postId}`;
  
  
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num_hugs: newHugCount,
        }),
      });
  
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update hug count: ${errorText}`);
      }
  
      const data = await updateResponse.json();
      // console.log('Update successful:', data.num_hugs);
      return data;
    } catch (error) {
      console.error('Error updating hug count:', error.message);
      return null;
    }
  };


  export const addComment = async (postTitle, commentText, parentId = null) => {
    try {
      const encodedTitle = encodeURIComponent(postTitle);
      const fetchUrl = `${API_URL}posts?title=${encodedTitle}`;
  
      const fetchResponse = await fetch(fetchUrl);
      const posts = await fetchResponse.json();
  
      if (!fetchResponse.ok || posts.length === 0) {
        throw new Error('Post not found');
      }
  
      const post = posts[0];
      const postId = post.id;
      const comments = post.comments || {};
      const newCommentId = Object.keys(comments).length + 1;
  
      const newComment = {
        id: newCommentId,
        parent_id: parentId,
        display_name: "New User",
        num_hugs: 0,
        text: commentText,
        created_at: new Date().toISOString(),
      };
  
      comments[newCommentId] = newComment;
  
      const updateUrl = `${API_URL}posts/${postId}`;
  
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comments,
        }),
      });
  
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to add comment: ${errorText}`);
      }
  
      const data = await updateResponse.json();
      return data;
    } catch (error) {
      console.error('Error adding comment:', error.message);
      return null;
    }
  };
  
  