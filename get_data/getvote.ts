import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.elexium.finance/vote', { waitUntil: 'networkidle' });


  await page.waitForSelector('[class*="grid"]');


  const cards = await page.locator('[class*="grid"] > div').all();

  for (const card of cards) {
    const text = await card.innerText();

    const pairMatch = text.match(/^(.+?)\n/);
    const totalVotingPowerMatch = text.match(/Total Voting Power\n([^\n]+)/);
    const votesMatch = text.match(/Votes\n([^\n]+)/);
    const totalRewardMatch = text.match(/Total Reward\n([^\n]+)/);
    const vaprMatch = text.match(/vAPR\n([^\n]+)/);

    const result = {
      pair: pairMatch?.[1]?.trim(),
      totalVotingPower: totalVotingPowerMatch?.[1]?.trim(),
      votes: votesMatch?.[1]?.trim(),
      totalReward: totalRewardMatch?.[1]?.trim(),
      vAPR: vaprMatch?.[1]?.trim(),
    };

    console.log(result);
  }

  await browser.close();
})();