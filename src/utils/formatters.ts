export const truncateTitle = (title: string, maxLength: number): string => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
};

export const formatDate = (epochTime: string): string => {
  const date = new Date(parseInt(epochTime) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (time: number): string => {
  if (isNaN(time) || time === Infinity) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const truncateDescription = (description: string, maxLength: number): string => {
  if (!description) return '';
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};
