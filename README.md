# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

# Solution

For this mergesort we cut up the array in half until we reach the threshold, so call on size n, n/2, n/4, ..., Threshold ($T$). This gives us the following sequence:

$$\frac{n}{2^k}=T\rightarrow k = \log_2(\frac{n}{T}) \rightarrow k = \log(n)$$

This means our recursion depth is O(log(n)). We then have to merge each half. However, we have to wait for the halves to finish their recursion before we merge. This means the merging takes O(n). This means our total span is:

$$\Theta(n)$$

because the linear term dominates. This is also better than O(n log(n)), the normal mergesort complexity. Therefore, the parallezation was beneficial.

# Disclaimer

I used [this](https://www.codemancers.com/blog/2020-02-17-concurrency_in_javascript_browser) as a guide for the paralleization.

I used [this](https://nodejs.org/api/worker_threads.html) for the worker documentation.

I used [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to understand the Promise object.

I used [this](https://jestjs.io/docs/asynchronous) to fix a bug with the testing code due to the await keyword.

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
