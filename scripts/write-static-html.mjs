// Vite's library build mode (used for the classic-script production build,
// see vite.config.ts) doesn't process index.html as an entry, so dist/
// ends up with just the JS/CSS assets and no HTML. This writes the actual
// deliverable: a dist/index.html that references them with plain
// <script>/<link> tags (no type="module") so it opens directly via
// file://.
import { writeFileSync } from 'node:fs';

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Резюме</title>
  <meta name="description" content="Игорь Честнов | Резюме">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./resume-app.css">
</head>
<body>
  <div id="root"></div>
  <script src="./resume-app.js"></script>
</body>
</html>
`;

writeFileSync(new URL('../dist/index.html', import.meta.url), html);
console.log('Wrote dist/index.html (classic script, file:// compatible)');
