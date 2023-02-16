export interface Milestone{
 date:string | null;
 description:string | null;
}

export interface Product{
 name:string | null;
 industry:string | null;
 yearAvailable:string | null;
 description:string | null;
 numberCustomers:number | null;
 distribution:Array<string> | null;
 features:Array<string> | null;
}

export interface Manager{
 title:string | null;
 fullName:string | null;
 bio:string | null;
 linkedIn:string | null;
}

export interface Management{
 managers:Array<Manager> | null;
}

export interface FundingAllocation{
 amount:number | null;
 areaOfUse:string | null;
 forGoal:string | null;
}

export interface Ownership{
 name:string | null;
 type:string | null;
 equityPercent:string | null;
}

export interface Capitalization{
 fundingGoal:number | null;
 fundingType:string | null;
 fundingAllocation:Array<FundingAllocation> | null;
 ownership:Array<Ownership> | null;
 estimateBusinessValue:number | null;
}

export interface AssociatedProduct{
 name:string | null;
 year:string | null;
 marketShare:string | null;
}

export interface Market{
 name:string | null;
 description:string | null;
 driversForAdoption:string | null;
 barriersToAdoption:string | null;
 marketEstimateSources:Array<string> | null;
 annualMarketSize:number | null;
 annualGrowthRate:string | null;
 associatedProducts:Array<AssociatedProduct> | null;
}

export interface MarketAssessment{
 marketingPlan:string | null;
 salesPlan:string | null;
 markets:Array<Market> | null;
}

export interface CompetitiveMarket{
 name:string | null;
 marketShare:string | null;
}

export interface Competitor{
 name:string | null;
 product:string | null;
 description:string | null;
 competitiveMarkets:Array<CompetitiveMarket> | null;
}

export interface CompetitiveAssessment{
 competitors:Array<Competitor> | null;
 competitiveEdge:string | null;
}

export interface FinancialSummary{
 lastYearRevenue:number | null;
 thisYearRevenue:number | null;
 projectedRevenue:number | null;
 lastYearExpense:number | null;
 thisYearExpense:number | null;
 projectedExpense:number | null;
}

export interface Business{
 id:string | null;
 name:string | null;
 address:string | null;
 city:string | null;
 state:string | null;
 zip:string | null;
 country:string | null;
 phone:string | null;
 email:string | null;
 website:string | null;
 linkedIn:string | null;
 blog:string | null;
 twitter:string | null;
 ein:string | null;
 description:string | null;
 formation:string | null;
 industry:string | null;
 subIndustry:string | null;
 created:string | null;
 updated:string | null;
 founded:string | null;
 numberEmployees:number | null;
 mission:string | null;
 milestones:Array<Milestone> | null;
 products:Array<Product> | null;
 management:Management | null;
 capitalization:Capitalization | null;
 marketAssessment:MarketAssessment | null;
 competitiveAssessment:CompetitiveAssessment | null;
 financialSummary:FinancialSummary | null;
}

