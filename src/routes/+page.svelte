<script lang="ts">
  import { onMount } from 'svelte';
  import type { Quiz } from '../utils/utils';
  import { genQuizzes } from '../utils/utils';
  let quizzes: Quiz[] = [];
  let solutionID = 0;
  let ownSolution = '';

  onMount(() => {
    quizzes = [...genQuizzes()];
  });

  function handleInput(event: Event) {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    ownSolution = target?.value;
  }

  function handleNext(event: Event) {
    quizzes = quizzes.map((quiz, i) => {
      if (i === solutionID) {
        return { ...quiz, ownSolution };
      }
      return quiz;
    });
    solutionID = solutionID + 1;
    ownSolution = '';
  }
</script>

<header class="header">
  <nav>
    <ul class="nav-list">
      <li class="nav-list__item"><a href="/">Home</a></li>
      <li class="nav-list__item"><a href="/">Home</a></li>
      <li class="nav-list__item"><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main class="container">
  <nav class="nav">
    <ul class="quiz-list">
      <li class="quiz-list-item">{solutionID + 1} / {quizzes.length}</li>
      <!-- <li><i class="fa-solid fa-calculator" /></li> -->
    </ul>
  </nav>
  <section class="quiz-interaction-group">
    {#if quizzes.length !== 0}
      {#each quizzes as quiz, i}
        {#if i === solutionID}
          <h1 class="quiz-title">{quiz.left} {quiz.op} {quiz.right} = ?</h1>
        {/if}
      {/each}
    {:else}
      <h1 class="quiz-title loading">Loading...</h1>
    {/if}
    <div class="input-group">
      <div class="helper-group">
        <button disabled class="hint">Hint</button>
      </div>
      <input class="solution-input" type="text" bind:value={ownSolution} />
      <div class="button-group">
        <button class="skip">Skip</button>
        <button class="submit" on:click={handleNext}>Submit</button>
      </div>
    </div>
  </section>
</main>

<style>
  .header {
    visibility: hidden;
  }
  .nav-list {
    display: flex;
  }

  .nav {
    /* padding-top: 2.5em; */
    padding-bottom: 3.5em;
  }

  .quiz-list {
    display: flex;
    justify-content: center;
  }

  .quiz-list-item {
    font-size: 1.5rem;
  }

  .container {
    box-shadow: 0px 20px 30px -5px hsla(230, 29%, 61%, 0.15);
    background-color: white;
    border-radius: 10px;
    width: min(87%, 650px);
    margin-right: auto;
    margin-left: auto;
    padding-top: 2em;
    padding-bottom: 4em;
  }

  .quiz-interaction-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.8rem;
  }

  .quiz-title {
    font-size: 3rem;
    color: #434146;
  }

  .helper-group {
    text-align: right;
    margin-bottom: 0.8rem;
  }

  .hint {
    background-color: #ffbb5c;
    border: 1px solid #ffbb5c;
    border-radius: 4px;
    color: white;
  }

  .hint:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: ease-in 0.2s;
  }

  .input-group {
    width: min(220px, 60%);
  }

  .solution-input {
    width: 100%;
    font-size: 1.2rem;
    border-radius: 4px;
    text-align: center;
  }

  .solution-input:focus {
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .skip {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    border-radius: 0.6rem;
    color: #fff;
    background-color: #ef6262;
    border: 1px solid #ef6262;
    color: white;
  }

  .skip:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: ease-in 0.2s;
  }

  .submit {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    border-radius: 0.6rem;
    color: #fff;
    background-color: #4caf50;
    border: 1px solid #4caf50;
  }

  .submit:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: ease-in 0.2s;
  }
</style>
