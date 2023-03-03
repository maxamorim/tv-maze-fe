import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router'
import router from "@/router"
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import TelevisionShowSearch from '@/components/TelevisionShowSearch.vue';
import { useShowsStore } from '@/stores/shows'

let testRouter;

beforeEach(async () => {
    testRouter = createRouter({
        history: createWebHistory(),
        routes: router.getRoutes(),
    });

    testRouter.push('/');
    await testRouter.isReady();
});

describe('TelevisionShowSearch', () => {
    const wrapper = mount(TelevisionShowSearch, {
        global: {
            plugins: [router, createTestingPinia({
                createSpy: vi.fn(),
            })],
        }
    });
    
    it('renders properly', () => {
        expect(wrapper).toBeTruthy();
    });

    it('it should call search television shows', () => {
        const store = useShowsStore();
        vi.spyOn(store, 'searchTelevisionShows');

        const searchInput = wrapper.find('#search-input');
        searchInput.setValue('dummy');
        searchInput.trigger('keyup.enter');


        expect(store.searchTelevisionShows).toBeCalledWith('dummy');
    });

    it('it should call filter by genre', () => {
        const store = useShowsStore();
        vi.spyOn(store, 'filterByGenre');

        const option = wrapper.findAll('option').at(1);
        option ? option.element.selected = true : '';
        wrapper.find('#genre').trigger('change');

        expect(store.filterByGenre).toBeCalledWith('science-fiction');
    });

    it('it should call search television shows', () => {
        const store = useShowsStore();
        vi.spyOn(store, 'sortByRating');

        const sortingButton = wrapper.find('#sorting-button');
        sortingButton.trigger('click');

        expect(store.sortByRating).toBeCalledWith(true);

        sortingButton.trigger('click');

        expect(store.sortByRating).toBeCalledWith(false);
    });
});
