import { defineStore } from 'pinia'
import TelevisionService from "@/services/television.service";

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [] as any,
    selectedShow: {
      show: null as any,
      cast: null as any
    }
  }),
  getters: {
    loadMoreShows: (state) => {
      return (currentLength: number) => state.shows.slice(currentLength, currentLength + 15);
    },
    
  },
  actions: {
    async getTelevisionShows() {
      this.shows = await TelevisionService.getShows();
    },
    async searchTelevisionShows(query: string) {
      const response = await TelevisionService.searchShows(query);
      this.shows = response.map((value: any) => value.show);
    },
    async getTelevisionShowDetails(showId: string) {
      this.selectedShow.show = await TelevisionService.getShowDetails(showId);
      this.selectedShow.cast = await TelevisionService.getShowCast(showId);
    },
    async filterByGenre(genre: string) {
      this.shows = (await TelevisionService.getShows() as any)
        .filter((show: any) => 
          show.genres?.find(
            (genreValue: string) => genreValue.toLocaleLowerCase() === genre
          )
        );
    },
    sortByRating(descending: boolean) {
      this.shows = this.shows.sort(
        (a: { rating: { average: number }; }, b: { rating: { average: number }; }) => {
          if (descending) {
            return (a.rating?.average < b.rating?.average) ? 1 : -1;
          }
          
          return (a.rating?.average > b.rating?.average) ? 1 : -1;
        }
      );
    }
  }
})
