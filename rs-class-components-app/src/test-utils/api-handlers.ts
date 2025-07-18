import { http, HttpResponse } from 'msw';

const artistsMockData = [
  {
    id: '2',
    title: 'First Artist',
    birth_date: 1959,
    death_date: 2000,
  },
  {
    id: '3',
    title: 'Second Artist',
    birth_date: 1859,
    death_date: 1940,
  },
  {
    id: '4',
    title: 'Third Artist',
    birth_date: 1773,
    death_date: 1830,
  },
];

export const handlers = [
  http.get('https://api.artic.edu/api/v1/artists/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    if (query && query === 'error') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      data: [
        {
          api_link: 'https://api.artic.edu/api/v1/agents/2',
        },
        {
          api_link: 'https://api.artic.edu/api/v1/agents/3',
        },
        {
          api_link: 'https://api.artic.edu/api/v1/agents/4',
        },
      ],
    });
  }),
  http.get<{ id: string }>(
    'https://api.artic.edu/api/v1/agents/:id',
    ({ params }) => {
      const artist = artistsMockData.find((artist) => artist.id === params.id);
      if (!artist) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(artist);
    }
  ),
];
