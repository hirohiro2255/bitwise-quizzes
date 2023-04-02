<script lang="ts">
  import { onMount } from 'svelte';
  import type { Quiz } from '../utils/utils';
  import { genQuizzes } from '../utils/utils';
  let quizzes: Quiz[] = [];
  let solutionID = 0;
  let ownSolution = '';

  onMount(() => {
    quizzes = [...genQuizzes()];
    console.log(quizzes);
  });

  // function handleInput(event: Event) {
  //   const { target } = event;
  //   if (!(target instanceof HTMLInputElement)) {
  //     return;
  //   }
  //   ownSolution = target?.value;
  // }

  function handleNext(event: Event) {
    quizzes = quizzes.map((quiz, i) => {
      if (i === solutionID) {
        return { ...quiz, ownSolution };
      }
      return quiz;
    });
    solutionID = solutionID + 1;
    ownSolution = '';
    console.log(quizzes);
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
  <section class="quiz-container">
    <nav>
      <ul>
        <li>{solutionID + 1} / {quizzes.length}</li>
        <li><i class="fa-solid fa-calculator" /></li>
      </ul>
    </nav>
    <div class="quiz-interaction-group">
      {#if quizzes.length !== 0}
        {#each quizzes as quiz, i}
          {#if i === solutionID}
            <h1 class="quiz-title">{quiz.left} {quiz.op} {quiz.right} = ?</h1>
          {/if}
        {/each}
      {:else}
        <h1 class="quiz-title">Loading...</h1>
      {/if}
      <div class="input-group">
        <input type="text" bind:value={ownSolution} />
        <button class="button" on:click={handleNext}>Next</button>
      </div>
    </div>
  </section>
  <section class="result-container">
    <h2>Result:</h2>
  </section>
</main>

<style>
  .nav-list {
    display: flex;
  }

  .container {
    display: flex;
    height: 83%;
    margin-top: 1.2rem;
  }

  .quiz-container {
    flex: 5;
    border: 1px solid red;
    /* display: flex;
    flex-direction: column; */
    /* justify-content: space-between; */
  }

  .quiz-container nav {
    height: 10%;
  }

  .quiz-container nav ul {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .quiz-interaction-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8rem;
  }

  .quiz-title {
    font-size: 3.2rem;
    color: #434146;
  }

  .result-container {
    flex: 3;
    border: 1px solid blue;
  }
</style>
