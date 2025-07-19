import { describe, expect, it } from 'vitest';
import { loadArtistData, searchArtists } from './api.service.ts';

describe('API service tests', () => {
  it('Should return data in case of success response', async () => {
    expect(await searchArtists()).toBeDefined();
  });

  it('Should throw an error in case response status 4xx/5xx', async () => {
    await expect(() => searchArtists('error')).rejects.toThrowError(
      'Not Found'
    );
  });

  it('Should return artist data in case of such artist exists', async () => {
    expect(
      await loadArtistData('https://api.artic.edu/api/v1/agents/2')
    ).toBeDefined();
  });

  it('Should throw an error in case artist was now found', async () => {
    await expect(() =>
      loadArtistData('https://api.artic.edu/api/v1/agents/0')
    ).rejects.toThrowError('Not Found');
  });
});
