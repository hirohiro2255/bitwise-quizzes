export interface Quiz {
  id: number;
  left: number;
  right: number;
  op: string;
  solution: string;
  ownSolution: string;
}

const ops = ['&', '|', '^', '<<', '>>'];

export function genQuizzes(): Quiz[] {
  const quizzes: Quiz[] = [];
  while (quizzes.length < 10) {
    const op = ops[Math.floor(Math.random() * ops.length)];
    const left = Math.floor(Math.random() * 5);
    const right = Math.floor(Math.random() * 5);
    let solution = '';
    switch (op) {
      case '&':
        solution = (left & right).toString();
        break;
      case '|':
        solution = (left | right).toString();
        break;
      case '^':
        solution = (left ^ right).toString();
        break;
      case '<<':
        solution = (left << right).toString();
        break;
      case '>>':
        solution = (left >> right).toString();
        break;
    }
    if (solution === '0') {
      continue;
    }
    const quiz = {
      id: quizzes.length,
      left,
      right,
      op,
      solution,
      ownSolution: '',
    };
    quizzes.push(quiz);
  }

  return quizzes;
}
