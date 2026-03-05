document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const imgUrl = document.getElementById('imageLink').value || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500';
    const content = document.getElementById('content').value;

    const grid = document.getElementById('blog-grid');
    
    // Professional Card HTML
    const cardHTML = `
        <article class="post-card">
            <img src="${imgUrl}" alt="Post Image" class="post-img">
            <div class="post-content">
                <h3>${title}</h3>
                <p>${content.substring(0, 100)}...</p>
                <div style="margin-top: 15px; font-size: 12px; color: #94a3b8;">
                    <strong>${author}</strong> • Just now
                </div>
            </div>
        </article>
    `;

    grid.insertAdjacentHTML('afterbegin', cardHTML);
    document.getElementById('postForm').reset();
    
    // Scroll to feed to show the user their post
    document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
});
