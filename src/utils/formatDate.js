export const formatDate = (
  date,
  locales,
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
) => (date ? new Date(date).toLocaleDateString(locales, options) : '');
