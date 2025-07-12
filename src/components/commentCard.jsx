import React from 'react';

const CommentCard = ({ comment, onEdit, onDelete, currentUser }) => {
  const isOwner = currentUser && currentUser.id === comment.user_id;

  return (
    <div className="card p-3 shadow-sm" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{comment.username || 'Unknown User'}</h5>
        <p className="card-text">{comment.comment}</p>

        {comment.image && (
          <img
            src={`http://localhost:3300/uploads/${comment.image}`}
            alt="gambar"
            className="img-fluid"
          />
        )}

        {(isOwner || currentUser?.role === 'admin') && (
          <div className="mt-2">
            <button className="btn btn-sm btn-primary me-2" onClick={onEdit}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={onDelete}>Hapus</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
