<?php
// Shared page head + site header/nav.
//
// Pages set these before including this file:
//   $title       (required) -- the <title>
//   $description (optional) -- <meta name="description">
//   $head_extra  (optional) -- raw HTML injected at the end of <head>
//   $show_logo   (optional, default true) -- render the wordmark logo?
$title       = $title       ?? throw new Exception('$title must be set');
$description = $description ?? '';
$head_extra  = $head_extra  ?? '';
$show_logo   = $show_logo   ?? true;
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= htmlspecialchars($title) ?></title>
<?php if ($description !== ''): ?>
    <meta name="description" content="<?= htmlspecialchars($description) ?>" />
<?php endif; ?>
    <link rel="stylesheet" href="css/site.css" />
<?php if ($head_extra !== ''): ?>
<?= $head_extra ?>
<?php endif; ?>
  </head>
  <body>
    <header class="site-header">
<?php if ($show_logo): ?>
      <a class="wordmark" href="index.html"><img src="logo.png" alt="Xorway" /></a>
<?php endif; ?>
      <nav class="site-nav">
        <a href="about.html">About</a>
        <a href="why-free-software-matters.html">Why&nbsp;Free&nbsp;Software&nbsp;Matters</a>
        <a href="perlang.html">Perlang</a>
      </nav>
    </header>
