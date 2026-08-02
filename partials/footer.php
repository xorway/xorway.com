    <footer class="site-footer">
      <p class="footer-links">
        &copy; Xorway Solutions 2024-2026
        <span class="sep">&middot;</span>
        <a class="contact" id="site-contact" href="#">contact</a>
        <span class="sep">&middot;</span>
        <a href="https://github.com/xorway/xorway.com">GitHub repo</a>
      </p>
    </footer>
    <script>
      // Assemble the contact address at runtime, reversed, to make life a
      // little harder for email-harvesting bots -- same spirit as INFO.TXT.
      (function () {
        var a = document.getElementById("site-contact");
        if (!a) return;
        var addr =
          "tcatnoc".split("").reverse().join("") +
          "@" +
          "moc.yawrox".split("").reverse().join("");
        a.href = "mailto:" + addr;
        a.textContent = addr;
      })();
    </script>
  </body>
</html>
