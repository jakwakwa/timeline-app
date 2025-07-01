import React from 'react';
import styles from './CategoryFilter.module.css';
import Image from 'next/image';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isFullScreen?: boolean;
  onClose?: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isFullScreen = false,
  onClose,
}) => {
  const colors = ['#8C1A33', '#AE2696', '#B95D08', '#036450', '#5F8109', '#1F3363', '#8302E6'];

  const handleCategorySelect = (category: string | null) => {
    onSelectCategory(category);
    // Auto-close the full-screen view after selection
    if (isFullScreen && onClose) {
      onClose();
    }
  };

  return (
    <div className={`${styles.container} ${isFullScreen ? styles.fullScreen : ''}`}>
      {isFullScreen && (
        <div className={styles.fullScreenHeader}>
          <h2 className={styles.title}>Browse all categories</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#fff" fill="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
      {!isFullScreen && <h2 className={styles.title}>Browse all</h2>}
      <div className={`${styles.categoriesGrid} ${isFullScreen ? styles.fullScreenGrid : ''}`}>
        {categories.map((category, index) => (
          <button
            key={category}
            className={`${styles.categoryCard} ${selectedCategory === category ? styles.selected : ''} ${isFullScreen ? styles.fullScreenCard : ''}`}
            onClick={() => handleCategorySelect(category)}
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <span className={styles.categoryTitle}>{category}</span>
            {/* Placeholder for image - replace with actual image logic later */}
            <div className={styles.categoryImagePlaceholder}>
              <Image src="/christian_cross.svg" alt="Category Icon" width={48} height={48} />
            </div>
          </button>
        ))}
        {selectedCategory && (
          <button
            className={`${styles.categoryCard} ${styles.resetButton} ${isFullScreen ? styles.fullScreenCard : ''}`}
            onClick={() => handleCategorySelect(null)}
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter; 