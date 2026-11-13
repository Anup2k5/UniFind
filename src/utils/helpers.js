export const timeAgo = (dateString) => {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Smart matching algorithm between lost and found items
export const calculateMatchScore = (lostItem, foundItem) => {
  if (!lostItem || !foundItem) return 0;
  if (lostItem.id === foundItem.id) return 0;
  if (lostItem.type === foundItem.type) return 0; // only match lost with found

  let score = 0;

  // 1. Category match (35%)
  if (lostItem.category && foundItem.category && lostItem.category === foundItem.category) {
    score += 35;
  }

  // 2. Location match (25%)
  if (lostItem.location && foundItem.location && lostItem.location === foundItem.location) {
    score += 25;
  } else if (lostItem.location && foundItem.location) {
    // Partial location match (same quad/bldg)
    const loc1 = lostItem.location.toLowerCase();
    const loc2 = foundItem.location.toLowerCase();
    if (loc1.includes('library') && loc2.includes('library')) score += 20;
    else if (loc1.includes('union') && loc2.includes('union')) score += 20;
    else if (loc1.includes('gym') && loc2.includes('gym')) score += 20;
    else if (loc1.includes('engineering') && loc2.includes('engineering')) score += 20;
  }

  // 3. Title / Keyword match (30%)
  const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'with', 'and', 'or', 'for', 'of', 'found', 'lost']);
  const extractWords = (text) => {
    return (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w));
  };

  const wordsLost = new Set([...extractWords(lostItem.title), ...(lostItem.tags || [])]);
  const wordsFound = new Set([...extractWords(foundItem.title), ...(foundItem.tags || [])]);

  let commonWordsCount = 0;
  for (const word of wordsLost) {
    if (wordsFound.has(word)) commonWordsCount++;
  }

  if (commonWordsCount >= 3) score += 30;
  else if (commonWordsCount === 2) score += 20;
  else if (commonWordsCount === 1) score += 10;

  // 4. Date Proximity (10%)
  if (lostItem.date && foundItem.date) {
    const diffDays = Math.abs((new Date(lostItem.date) - new Date(foundItem.date)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) score += 10;
    else if (diffDays <= 3) score += 7;
    else if (diffDays <= 7) score += 4;
  }

  return Math.min(score, 98); // capped at 98%
};

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'lost':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
        dot: 'bg-rose-500',
        label: 'Lost'
      };
    case 'found':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/60',
        dot: 'bg-blue-500',
        label: 'Found'
      };
    case 'matched':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
        dot: 'bg-amber-500 animate-pulse',
        label: 'Possible Match'
      };
    case 'claimed':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/60',
        dot: 'bg-purple-500',
        label: 'Claim in Review'
      };
    case 'resolved':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
        dot: 'bg-emerald-500',
        label: 'Reunited / Resolved'
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400',
        label: status || 'Unknown'
      };
  }
};
