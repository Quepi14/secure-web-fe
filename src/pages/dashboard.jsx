import React, {useEffect, useState} from "react";
import { getAllComments, updateComment, deleteComment } from "../services/commentService";
import CommentTable from "../components/commentTable";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';


const Dashboard = () => {
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        fetchComments();
    }, []);

    const  fetchComments = async () => {
        const response = await getAllComments();
        setComments(response.data?.data || [])
    }

    const handleEdit = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try{
            await deleteComment(id);
            toast.success("Komentar berhasil dihapus");
            fetchComments();
        } catch (error) {
            toast.error("Gagal menghapus komentar");
      }
    }
    const handleUpdate = async () => {
        try {
            await updateComment(selectedComment.id, {
              username: selectedComment.username,
              message: selectedComment.content,
            });
            toast.success('Komentar berhasil diperbarui');
            setShowModal(false);
            fetchComments();
        } catch (err) {
            toast.error('Gagal memperbarui komentar');
        }
    };

    return(
         <Container className="mt-5">
      <h2>Manajemen Komentar</h2>
      <CommentTable comments={comments} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Komentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComment && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={selectedComment.username}
                  onChange={(e) =>
                    setSelectedComment({ ...selectedComment, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Komentar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedComment.content}
                  onChange={(e) =>
                    setSelectedComment({ ...selectedComment, content: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );

}

export default Dashboard;