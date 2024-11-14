import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentManagement = () => {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('Article');
  const [thumbnail, setThumbnail] = useState('');
  const [file, setFile] = useState(null);
  const [editingContentId, setEditingContentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://motivata.onrender.com/api/content', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setContent(response.data);
    } catch (err) {
      setError('Error fetching content, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('contentType', contentType);
    formData.append('thumbnail', thumbnail);
    formData.append('file', file);

    try {
      setLoading(true);
      if (editingContentId) {
        await axios.put(`https://motivata.onrender.com/api/content/${editingContentId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('https://motivata.onrender.com/api/content', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      resetForm();
      fetchContent();
    } catch (err) {
      setError(err.response.data || 'Error submitting content, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContentType('Article');
    setThumbnail('');
    setFile(null);
    setEditingContentId(null);
  };

  const handleEditContent = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setContentType(item.contentType);
    setThumbnail(item.thumbnail);
    setEditingContentId(item._id);
  };

  const handleDeleteContent = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await axios.delete(`https://motivata.onrender.com/api/content/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchContent();
      } catch (err) {
        setError('Error deleting content, please try again later.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Content Management</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleContentSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          style={styles.select}
        >
          <option value="Article">Article</option>
          <option value="Video">Video</option>
          <option value="Podcast">Podcast</option>
        </select>
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="file"
          accept=".mp4,.mkv,.webm,.avi,.mp3,.wav,.pdf,.docx,.xlsx,.pptx" // Set allowed file types based on content type
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Processing...' : editingContentId ? 'Update Content' : 'Add Content'}
        </button>
      </form>
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <ul style={styles.list}>
          {content.map((item) => (
            <li key={item._id} style={styles.listItem}>
              <strong>{item.title} ({item.contentType})</strong> - {item.description}
              <button onClick={() => handleEditContent(item)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDeleteContent(item._id)} style={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Simple styles object
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  fileInput: {
    margin: '10px 0',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  editButton: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  deleteButton: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#007bff',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default ContentManagement;