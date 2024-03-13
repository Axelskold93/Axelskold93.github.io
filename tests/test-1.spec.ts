import { test, expect } from '@playwright/test';

test('rebelsUnitedBackgroundInfo', async ({ page }) => {
  await page.goto('http://192.168.1.191:5500/index.html');
  let icons = await page.$$('.team-icon');
  if (icons.length >= 2) {
    await icons[1].click();
  }
  let teamInfo = await page.textContent('.history-box');
  await expect(teamInfo).toContain('Rebels United, formed in defiance of oppressive regimes, represents the resilience and determination of those who fight for freedom. Despite facing overwhelming odds, the Rebels United football club has forged a legacy of courage and solidarity. Led by iconic figures like Yoda, Leia Organa, and Luke Skywalker, Rebels United embodies the spirit of resistance and hope, inspiring fans across the galaxy.'); 
});

test('chooseTwoPlayersAndConfirmNamesAreDisplayed', async ({ page }) => {
  await page.goto('http://192.168.1.191:5500/index.html');
  let teamButtons = await page.$$('.team-list button');
  let firstTeam = teamButtons[0];
  await firstTeam.click();
  await page.waitForSelector('.player-list button');

  let playerButtons = await page.$$('.player-list button');
  let seventhButton = playerButtons[6];
  
  await seventhButton.click();
  await page.waitForSelector('#player-one');
  let playerOne = await page.textContent('#player-one');
  await expect(playerOne).toContain('Player One: Darth Vader');

  let secondTeam = teamButtons[1];
  await secondTeam.click();
  await page.waitForSelector('.player-list button');
  playerButtons = await page.$$('.player-list button');
  let sixthButton = playerButtons[5];
  await sixthButton.click();
  await page.waitForSelector('#player-two');
  let playerTwo = await page.textContent('#player-two');
  await expect(playerTwo).toContain('Player Two: Luke Skywalker');
});

test('ComparePlayersAndCheckIfHighlighted', async ({ page }) => {
  await page.reload();
  await page.goto('http://192.168.1.191:5500/index.html');
  let teamButtons = await page.$$('.team-list button');
  let firstTeam = teamButtons[7];
  await firstTeam.click();
  await page.waitForSelector('.player-list button');
  let playerButtons = await page.$$('.player-list button');
  let sixthButton = playerButtons[5];
  await sixthButton.click();

  let secondTeam = teamButtons [8];
  await secondTeam.click();
  await page.waitForSelector('.player-list button');
  playerButtons = await page.$$('.player-list button');
  let fourthButton = playerButtons[4];
  await fourthButton.click();
  await page.waitForSelector('#player-one');
  await page.waitForSelector('#player-two');
  let playerOne = await page.textContent('#player-one');
  await expect(playerOne).toContain('Player One: Harry Potter');
  let playerTwo = await page.textContent('#player-two');
  await expect(playerTwo).toContain('Player Two: Lord Voldemort');

  let compareButton = await page.$('#compare');
  if (compareButton) {
    await compareButton.click();
  }

  let playerOneGoals = await page.textContent('#player-one-goals');
  await expect(playerOneGoals).toContain('5');
  let playerTwoGoals = await page.textContent('#player-two-goals');
  await expect(playerTwoGoals).toContain('3');

  let playerOneGoalCell = await page.$('.player-one td:nth-child(3)');
  if (playerOneGoalCell) {
  let playerOneGoalCellClass = await playerOneGoalCell.getAttribute('class');
  if (playerOneGoalCellClass) {
  let isGoalHighlighted = playerOneGoalCellClass.includes('highlight');
  expect(isGoalHighlighted).toBeTruthy();
  }
  }
});
