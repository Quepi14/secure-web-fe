import React from 'react';
import { Button, Table } from 'react-bootstrap';

const CommentTable = ({ comments, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Isi Komentar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.id}</td>
            <td>{comment.username}</td>
            <td>{comment.content}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(comment)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(comment.id)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CommentTable;