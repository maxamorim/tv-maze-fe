import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useShowsStore } from '@/stores/shows';
import { showsMock, showDetailsMock, showCastMock } from './shows.mock';
import TelevisionService from "@/services/television.service";

describe('Shows Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should loads more television shows', () => {
    const showsStore = useShowsStore();
    showsStore.shows = showsMock;
    const { loadMoreShows } = storeToRefs(showsStore);

    const shows = showsMock.slice(0, 15);
    shows.push(...loadMoreShows.value(shows.length))

    expect(shows.length).toBe(29);
  });

  it('should get television shows', async () => {
    const showsStore = useShowsStore();
    const spy = vi.spyOn(TelevisionService, 'getShows');
    spy.mockImplementation(() => Promise.resolve(showsMock));

    await showsStore.getTelevisionShows();
    expect(showsStore.shows).toStrictEqual(showsMock);
  });

  it('should search for television shows', async () => {
    const showsStore = useShowsStore();
    const spy = vi.spyOn(TelevisionService, 'searchShows');
    spy.mockImplementation(() => Promise.resolve([{show: showsMock[0]}]));

    await showsStore.searchTelevisionShows('dummy');
    expect(TelevisionService.searchShows).toBeCalledWith('dummy');
    expect(showsStore.shows).toStrictEqual(showsMock.slice(0, 1));
  });

  it('should search for television shows', async () => {
    const showsStore = useShowsStore();
    const spyGetShowDetails = vi.spyOn(TelevisionService, 'getShowDetails');
    const spyGetShowCast = vi.spyOn(TelevisionService, 'getShowCast');
    spyGetShowDetails.mockImplementation(() => Promise.resolve(showDetailsMock));
    spyGetShowCast.mockImplementation(() => Promise.resolve(showCastMock));

    await showsStore.getTelevisionShowDetails('dummy');
    expect(TelevisionService.getShowDetails).toBeCalledWith('dummy');
    expect(TelevisionService.getShowCast).toBeCalledWith('dummy');
    expect(showsStore.selectedShow.show).toStrictEqual(showDetailsMock);
    expect(showsStore.selectedShow.cast).toStrictEqual(showCastMock);
  });

  it('should filter by genre', async () => {
    const showsStore = useShowsStore();
    const spy = vi.spyOn(TelevisionService, 'getShows');
    spy.mockImplementation(() => Promise.resolve(showsMock));

    await showsStore.filterByGenre('comedy');
    expect(showsStore.shows).toStrictEqual([showsMock.find(show => show.id === 28)]);
  });

  it('should sort by rating', async () => {
    const showsStore = useShowsStore();
    showsStore.shows = showsMock;

    showsStore.sortByRating(true);
    expect(showsStore.shows[0].rating.average).toBe(8.8);
    expect(showsStore.shows[showsStore.shows.length-1].rating.average).toBe(6.5);

    showsStore.sortByRating(false);
    expect(showsStore.shows[0].rating.average).toBe(6.5);
    expect(showsStore.shows[showsStore.shows.length-1].rating.average).toBe(8.8);
  });
})