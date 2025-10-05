export default class Television {
  state: boolean = false;

  on() {
    this.state = true;
  }

  off() {
    this.state = false;
  }
}
