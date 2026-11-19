// `npm run dev` — starts the API (port 5050) and the website (port 5601) together.
// Ctrl+C stops both.
import { spawn } from 'node:child_process';

const parts = [
  { name: 'api', color: '\x1b[32m', args: ['run', 'dev', '--prefix', 'server'] },
  { name: 'web', color: '\x1b[36m', args: ['run', 'dev', '--prefix', 'client'] },
];

const children = parts.map(({ name, color, args }) => {
  const child = spawn(`npm ${args.join(' ')}`, { shell: true, env: process.env });
  const prefix = `${color}[${name}]\x1b[0m `;
  const pipe = (stream, out) =>
    stream.on('data', (d) => d.toString().split(/\r?\n/).filter(Boolean).forEach((line) => out.write(prefix + line + '\n')));
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on('exit', (code) => {
    console.log(`${prefix}stopped (code ${code}). Stopping the other one too.`);
    shutdown(code ?? 0);
  });
  return child;
});

let stopping = false;
function shutdown(code) {
  if (stopping) return;
  stopping = true;
  children.forEach((c) => c.exitCode === null && c.kill());
  setTimeout(() => process.exit(code), 300);
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
