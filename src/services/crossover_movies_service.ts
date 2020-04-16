export default class CrossoverMoviesService {
  // TODO - interface for Movie
  private moviesIdMap: { [id: number]: { actorCredits: any[]; id: number; title: string; releaseDate: string; posterPath: string } } = {};
  private actorIdRegex = /https:\/\/api\.themoviedb\.org\/3\/person\/(\d+)\/movie_credits/;

  private movieCreditResponses: any[];
  private actors: any[];

  constructor(movieCreditResponses: any[], actors: any[]) {
    this.movieCreditResponses = movieCreditResponses;
    this.actors = actors;
  }

  getMovies() {
    this.populateMoviesIdMap();

    const crossoverMovies = Object.keys(this.moviesIdMap)
      .filter((stringKey: string) => this.moviesIdMap[Number(stringKey)].actorCredits.length > 1)
      .map((stringKey: string) => this.moviesIdMap[Number(stringKey)]);

    return crossoverMovies;
  }

  private populateMoviesIdMap() {
    this.movieCreditResponses.forEach((response: any) => {
      // TODO - find a better way to pair up the Actor ID to the response, should not depend on URL structure
      const actorId = Number(response.config.url.match(this.actorIdRegex)[1]);
      const actor = this.actors.find(actor => actor.id === actorId);
      const castCredits = response.data.cast;

      this.processCreditsForActor(castCredits, actor);
    });
  }

  private processCreditsForActor(castCredits: any[], actor: any) {
    castCredits.forEach((castCredit: any) => {
      // somewhat confusingly, the "id" field in API response is actually the ID of the Movie object, not the Credit object
      const movieId: number = castCredit.id;
      const actorCredit = { id: castCredit.credit_id, actorName: actor.name, characterName: castCredit.character };

      if (this.moviesIdMap[movieId]) {
        this.moviesIdMap[movieId].actorCredits.push(actorCredit);
      } else { // initialize movie
        this.initializeMovie(movieId, castCredit, actorCredit);
      }
    });
  }

  private initializeMovie(movieId: number, castCredit: any, actorCredit: any) {
    const { title, release_date, poster_path } = castCredit;

    this.moviesIdMap[movieId] = {
      id: movieId,
      title: title,
      releaseDate: release_date,
      posterPath: poster_path,
      actorCredits: [actorCredit],
    };
  }
}
