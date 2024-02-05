import React from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import ErrorBoundary from './ErrorBoundary';

const DeleteCategory = ({ category, onCategoryDeleted }) => {
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setDeleting(true);
        // Call the deleteCategory method from authService with the category id
        const categoryId = category.id;
        await authService.deleteCategory(category.id);
        toast.success('Category deleted successfully');
        onCategoryDeleted(category.id);
        // Optionally, you can reload the category list or update the state accordingly
      }catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Error deleting category. Please try again.');
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <button onClick={handleClick} disabled={isDeleting} className='deleteButton'>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteCategory;
