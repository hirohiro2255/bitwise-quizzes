<script lang="ts">
  import { onMount } from 'svelte';
  import type { Quiz } from '../utils/utils';
  import { genQuizzes } from '../utils/utils';
  let quizzes: Quiz[] = [];
  let solutionID = 0;

  onMount(() => {
    quizzes = [...genQuizzes()];
    console.log(quizzes);
  });
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
  <section>
    <div>
      <p />
    </div>
    <div>
      <ul>
        {#each quizzes as quiz, i}
          {#if i === solutionID}
            <li>{quiz.left} {quiz.op} {quiz.right} = ?</li>
          {/if}
        {/each}
      </ul>
    </div>
  </section>
</main>

<style>
  .nav-list {
    display: flex;
  }
</style>
