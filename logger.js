import chalk from 'chalk';
import boxen from 'boxen';

export const logSuccess = (message) => {
  console.log(chalk.green(message));
};

export const logWarning = (message) => {
  console.log(chalk.yellow(message));
};

export const logError = (message) => {
  console.log(chalk.red(message));
};

export const logResultsBox = (links) => {
  const output = [];
  output.push('Links encontrados:');
  links.forEach((link) => {
    const { href, text, file } = link;
    output.push(`- ${href} (${text}) - Archivo: ${file}`);
  });

  const line = '═'.repeat(output[0].length);
  const box = [
    `╔${line}╗`,
    `║${output[0]}║`,
    `║${line}║`,
    ...output.slice(1).map((line) => `║${line}║`),
    `║${line}║`,
    `╚${line}╝`,
  ];

  console.log(box.join('\n'));
};