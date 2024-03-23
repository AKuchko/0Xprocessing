export default class Request {
  data: object | null = null;

  constructor (data: object | null) {
    this.data = data;
  }

  build () {
    return {
      ...this.data
    };
  }
}