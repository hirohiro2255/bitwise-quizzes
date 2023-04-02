export interface Quiz {
  id: string;
  left: number;
  right: number;
  op: string;
  solution: number;
  ownSolution: number;
}

const ops = ['&', '|', '^', '<<', '>>'];

function genID(): string {
  let random;
  let id = '';
  for (let i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += '-';
    }
    id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return id;
}

export function genQuizzes(): Quiz[] {
  const quizzes: Quiz[] = [];
  while (quizzes.length < 10) {
    const op = ops[Math.floor(Math.random() * ops.length)];
    const left = Math.floor(Math.random() * 5);
    const right = Math.floor(Math.random() * 5);
    let solution = 0;
    switch (op) {
      case '&':
        solution = left & right;
        break;
      case '|':
        solution = left | right;
        break;
      case '^':
        solution = left ^ right;
        break;
      case '<<':
        solution = left << right;
        break;
      case '>>':
        solution = left >> right;
        break;
    }
    if (solution === 0) {
      continue;
    }
    const quiz = { id: genID(), left, right, op, solution, ownSolution: 0 };
    quizzes.push(quiz);
  }

  return quizzes;
}
