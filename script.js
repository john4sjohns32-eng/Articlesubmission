document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Create Blog Post HTML
    const feed = document.getElementById('blog-feed');
    const postHTML = `
        <article class="post-card">
            <div class="post-meta">Published on ${date} • By ${author}</div>
            <h3>${title}</h3>
            <p>${content.substring(0, 200)}...</p>
            <button class="read-more" style="background:none; border:none; color:#2563eb; cursor:pointer; padding:0; font-weight:600;">Read Full Story</button>
        </article>
    `;

    // Add to the top of feed
    feed.insertAdjacentHTML('afterbegin', postHTML);

    // Reset form and scroll to feed
    document.getElementById('postForm').reset();
    alert("Congratulations! Your article is live.");
    window.scrollTo({ top: document.getElementById('blog-feed').offsetTop - 100, behavior: 'smooth' });
});

function scrollToForm() {
    window.scrollTo({ top: document.getElementById('submission-area').offsetTop - 100, behavior: 'smooth' });
}
