export const fetchArtistData = (id: number) => {
  return fetch(`https://api.artic.edu/api/v1/agents/${id}`, {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['artist'],
    },
  });
};
