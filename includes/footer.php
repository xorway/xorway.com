    <footer class="site-footer">
      <p class="footer-links">
        &copy; Xorway Solutions 2024-2026
        <span class="sep">&middot;</span>
        <a class="contact contact-email" href="#"></a>
        <span class="sep">&middot;</span>
        <a href="https://github.com/xorway/xorway.com">GitHub repo</a>
      </p>
    </footer>
    <script>
      (function () {
        var elements = document.getElementsByClassName("contact-email");
        var addr =
          "tcatnoc".split("").reverse().join("") +
          "@" +
          "moc.yawrox".split("").reverse().join("");

        for (i = 0; i < elements.length; i++) {
            var a = elements[i];
            a.href = "mailto:" + addr;

            if (a.textContent.length == 0) {
                a.textContent = addr;
            }
        }
      })();
    </script>
  </body>
</html>
