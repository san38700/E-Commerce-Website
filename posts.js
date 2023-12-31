document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');
  
    // Event listener for form submission
    postForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const img = document.getElementById('img').value;
      const description = document.getElementById('description').value;
  
      try {
        // Create a new post
        const response = await axios.post('http://localhost:3000/posts', { img, description });
  
        // Fetch and display posts
        fetchAndDisplayPosts();
      } catch (error) {
        console.error(error);
      }
    });
  
    // Fetch and display posts on page load
    fetchAndDisplayPosts();
  
    // Function to fetch and display posts
    async function fetchAndDisplayPosts() {
        try {
          const response = await axios.get('http://localhost:3000/posts');
          const posts = response.data.posts;
    
          // Clear existing content
          postsContainer.innerHTML = '';
    
          // Display posts
          posts.forEach((post) => {
            showPostOnScreen(post);
          });
        } catch (error) {
          console.error(error);
        }
      }
    
  
    // Function to display a post on the screen
    function showPostOnScreen(post) {
        const postElement = document.createElement('div');
        postElement.className = 'card mb-4';
        postElement.style.maxWidth = '300px'; // Adjust the max-width as needed
    
        const imgElement = document.createElement('img');
        imgElement.src = post.img;
        imgElement.alt = post.description;
        imgElement.className = 'card-img-top mx-auto d-block';
        imgElement.style.maxWidth = '100%';
    
        const cardBodyElement = document.createElement('div');
        cardBodyElement.className = 'card-body text-center';
    
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'card-text';
        descriptionElement.textContent = post.description;
    
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'form-control';
        inputElement.id = `commentInput_${post.id}`;
        inputElement.placeholder = 'Add a comment...';
    
        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-primary';
        buttonElement.textContent = 'Add Comment';
        buttonElement.onclick = () => addComment(post.id);
    
        const ulElement = document.createElement('ul');
        ulElement.className = 'list-group list-group-flush';
        ulElement.id = `commentList_${post.id}`;
    
        cardBodyElement.appendChild(descriptionElement);
        cardBodyElement.appendChild(inputElement);
        cardBodyElement.appendChild(buttonElement);
        cardBodyElement.appendChild(ulElement);
    
        postElement.appendChild(imgElement);
        postElement.appendChild(cardBodyElement);
    
        postsContainer.appendChild(postElement);
    
        // Fetch and display comments for the post
        fetchAndDisplayComments(post.id);
    }
    
    // Function to fetch and display comments for a post
    async function fetchAndDisplayComments(postId) {
        try {
            const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
            const comments = response.data.post.comments;
            const commentList = document.getElementById(`commentList_${postId}`);
            if (comments && comments.length > 0) {
                comments.forEach((comment) => {
                    const commentItem = document.createElement('li');
                    commentItem.className = 'list-group-item';
                    commentItem.textContent = `Anonymous: ${comment.comment}`;
                    commentList.appendChild(commentItem);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    

    // Function to add a comment to a post
    window.addComment = async function addComment(postId) {
      const commentInput = document.getElementById(`commentInput_${postId}`).value;
  
      try {
        // Add a new comment to the post
        await axios.post('http://localhost:3000/comments', { comment: commentInput, postId });
  
        // Fetch and display the updated posts
        fetchAndDisplayPosts();
      } catch (error) {
        console.error(error);
      }
    }
  });
  