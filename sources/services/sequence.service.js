class SequenceService {
  constructor() {
    this.sequence = 0;
  }

  getCurrentSequence() {
    return this.sequence;
  }

  getNextSequence() {
    return ++this.sequence;
  }

  resetCurrentSequence(sequence) {
    this.sequence = sequence;
  }
}

module.exports = new SequenceService();