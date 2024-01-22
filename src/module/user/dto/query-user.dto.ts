export class QueryUserDto {
  page: number;
  pageSize?: number;
  sort?: string;
  username?: string;
  role?: string;
  gender?: string;
}
