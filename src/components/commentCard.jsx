function CommentCard({ comment }) {
  return (
    <div className="card p-3" style={{ width: '250px' }}>
      <strong>{comment.username || 'Anonim'}:</strong>
      <p className="mb-2">{comment.comment}</p>
      {comment.image && (
        <img
          src={`http://localhost:3300/uploads/${comment.image}`}
          alt="komentar"
          className="img-fluid rounded"
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

export default CommentCard;
