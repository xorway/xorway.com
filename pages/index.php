<?php

$title = 'Xorway Solutions';
$show_logo = false;

$head_extra = <<<'HTML'
    <link rel="stylesheet" href="css/xterm.css" />
    <style type="text/css">
      .terminal {
        margin: 2rem;
        padding: 1rem;
      }
    </style>
HTML;
require 'partials/header.php';

?>
<div id="terminal"></div>
    <script src="js/xterm.js"></script>
    <script src="js/xterm-addon-web-links.js"></script>
    <script type="text/javascript" src="demo.js"></script>
<?php require 'partials/footer.php'; ?>
