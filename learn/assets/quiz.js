// Reusable quiz: <div class="quiz" data-answer="1"> with <button>s and a <p class="why">.
// data-answer is the zero-based index of the correct button.
document.querySelectorAll('.quiz').forEach((quiz) => {
  const buttons = [...quiz.querySelectorAll('button')];
  const answer = Number(quiz.dataset.answer);
  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('right', 'wrong'));
      button.classList.add(i === answer ? 'right' : 'wrong');
      if (i !== answer) buttons[answer].classList.add('right');
      quiz.classList.add('answered');
    });
  });
});
