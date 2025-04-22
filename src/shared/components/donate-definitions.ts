import { donation_stats } from "../donation_stats";

interface FundingPlatform {
  supporterCount: number;
  monthlyEUR: number;
}

// Monthly counts in EUR
const liberapay: FundingPlatform = {
  supporterCount: donation_stats[0].patrons,
  monthlyEUR: donation_stats[0].amount,
};

const openCollective: FundingPlatform = {
  supporterCount: donation_stats[1].patrons,
  monthlyEUR: donation_stats[1].amount,
};

const patreon: FundingPlatform = {
  supporterCount: donation_stats[2].patrons,
  monthlyEUR: donation_stats[2].amount,
};

const fundingPlatforms = [liberapay, patreon, openCollective];

export const TOTAL_RECURRING_MONTHLY_EUR = fundingPlatforms
  .map(f => f.monthlyEUR)
  .reduce((a, b) => a + b, 0);

export const TOTAL_SUPPORTERS = fundingPlatforms
  .map(f => f.supporterCount)
  .reduce((a, b) => a + b, 0);

// From https://www.developersalary.com
export const MEDIAN_DEV_SALARY = 50_000;
export const MEDIAN_DEV_MONTHLY_EUR = MEDIAN_DEV_SALARY / 12;

// Number of devs funded off of recurring
export const FUNDED_DEVS = TOTAL_RECURRING_MONTHLY_EUR / MEDIAN_DEV_MONTHLY_EUR;

//  Goal
export const FUNDED_DEV_GOAL = 2;
