export interface Movie {
  id: string,
  title: string,
  poster: string,
  year: number,
  rating: string,
  genres: string[],
  countries: string[],
  directors: Director[]
}

interface Director {
  name: string,
  id: string
}