export class TokenReissueMutex {
  constructor() {
    this.locked = false;
    this.queue = [];
    this.tokenReissueSuccess = false;
  }

  success() {
    this.tokenReissueSuccess = true;
    sessionStorage.setItem("tokenReissueTime", Date.now());
  }

  acquire() {
    return new Promise((resolve) => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      resolve();
    } else {
      this.tokenReissueSuccess = false;
      this.locked = false;
    }
  }

  clear() {
    this.queue = [];
  }
}
