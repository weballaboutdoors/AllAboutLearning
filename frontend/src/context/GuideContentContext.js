import React, { createContext, useContext, useState } from 'react';

const GuideContentContext = createContext();

export const GuideContentProvider = ({ children }) => {
  const [allContent, setAllContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load content for a specific guide
  const loadGuideContent = async (guideId) => {
    const cacheKey = `guide-content-${guideId}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      const parsedCache = JSON.parse(cached);
      setAllContent(prev => ({ ...prev, ...parsedCache }));
      return;
    }

    setIsLoading(true);
    try {
      // Single request to get all content for this guide
      const response = await fetch(`/api/guide-content/guide/${guideId}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      
      const data = await response.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setAllContent(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Failed to load guide content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (id, section, newContent) => {
    try {
      const response = await fetch(`/api/guide-content/${id}/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newContent })
      });

      if (!response.ok) throw new Error('Failed to update content');

      // Update both local state and cache
      const newAllContent = { ...allContent };
      newAllContent[`${id}-${section}`] = newContent;
      setAllContent(newAllContent);

      // Update the specific guide's cache
      const guideId = id.split('-')[0]; // Assuming your IDs are formatted as "guideId-sectionId"
      const cacheKey = `guide-content-${guideId}`;
      const cachedGuideContent = JSON.parse(sessionStorage.getItem(cacheKey) || '{}');
      cachedGuideContent[`${id}-${section}`] = newContent;
      sessionStorage.setItem(cacheKey, JSON.stringify(cachedGuideContent));
    } catch (error) {
      console.error('Failed to update content:', error);
      throw error;
    }
  };

  const getContent = (id, section) => {
    const key = `${id}-${section}`;
    return allContent[key];
  };

  return (
    <GuideContentContext.Provider value={{ 
      allContent, 
      isLoading, 
      updateContent,
      getContent,
      loadGuideContent // Add this new function
    }}>
      {children}
    </GuideContentContext.Provider>
  );
};

export const useGuideContent = () => {
  const context = useContext(GuideContentContext);
  if (!context) {
    throw new Error('useGuideContent must be used within a GuideContentProvider');
  }
  return context;
};

export default GuideContentProvider;