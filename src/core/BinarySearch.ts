type Position = -1 | 0 | 1;

interface IValue {
  currentPosition: number;
  position: Position;
  final: boolean;
}

export class BinarySearch {
  private currentPosition: number;

  constructor(
    private left: number,
    private right: number,
    private isNextValueGreater: (currentNumber: number) => Promise<Position>,
  ) {
    this.currentPosition = this.getMiddle(left, right);
  }

  async nextValue(): Promise<IValue> {
    const compareResult = await this.isNextValueGreater(this.currentPosition);
    if (compareResult === 0) {
      return {
        currentPosition: this.currentPosition,
        position: 0,
        final: true,
      };
    }

    if (this.right - this.left === 0) {
      return {
        currentPosition: this.currentPosition,
        position: compareResult,
        final: true,
      };
    }

    if (compareResult === -1) {
      this.right = this.currentPosition - 1;
      this.currentPosition = this.getMiddle(this.left, this.right);
    }

    if (compareResult === 1) {
      this.left = this.currentPosition + 1;
      this.currentPosition = this.getMiddle(this.left, this.right);
    }

    return {
      currentPosition: this.currentPosition,
      position: compareResult,
      final: false,
    };
  }

  async find(): Promise<Omit<IValue, 'final'>> {
    while (true) {
      const nextValue = await this.nextValue();
      if (nextValue.final) {
        return {
          currentPosition: nextValue.currentPosition,
          position: nextValue.position,
        };
      }
    }
  }

  getMiddle(left: number, right: number) {
    return Math.floor(left + (right - left) / 2);
  }
}
