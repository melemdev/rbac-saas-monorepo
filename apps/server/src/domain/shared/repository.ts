export interface BaseRepository {
  create<T>(data: T): Promise<Record<string, T>>;

  
}
