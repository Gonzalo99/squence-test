export abstract class HttpResponseDto<T extends { [P in keyof T]: T[P] }> {
  readonly data!: T;
}
