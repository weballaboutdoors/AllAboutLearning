import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const EditableContentContext = createContext();

export const EditableContentProvider = ({ children }) => {
  const { user } = useAuth();
  const [editableContent, setEditableContent] = useState({});

  const updateContent = async (id, newContent) => {
    try {
      // Add your API call here to save to backend
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_PROD_API_URL 
        : process.env.REACT_APP_API_URL;

      await axios.put(
        `${apiUrl}/api/admin/content/${id}`,
        { content: newContent },
        { headers: { Authorization: token } }
      );

      setEditableContent(prev => ({
        ...prev,
        [id]: newContent
      }));
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      return false;
    }
  };

  return (
    <EditableContentContext.Provider value={{ editableContent, updateContent, isAdmin: user?.is_admin }}>
      {children}
    </EditableContentContext.Provider>
  );
};

export const useEditableContent = () => useContext(EditableContentContext);